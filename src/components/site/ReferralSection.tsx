import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Gift,
  LoaderCircle,
  ShieldCheck,
  UserRoundPlus,
} from "lucide-react";

import celebratingMascot from "@/assets/mascote/v2/conversao-comemorando.png";

type ReferralForm = {
  referrerName: string;
  referrerPhone: string;
  referrerContract: string;
  referredName: string;
  referredPhone: string;
  referredCity: string;
  referredNeighborhood: string;
  consent: boolean;
  website: string;
};

type ReferralApiResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  fields?: Record<string, string>;
  referral_id?: number;
};

const initialForm: ReferralForm = {
  referrerName: "",
  referrerPhone: "",
  referrerContract: "",
  referredName: "",
  referredPhone: "",
  referredCity: "",
  referredNeighborhood: "",
  consent: false,
  website: "",
};

const inputClassName =
  "min-h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60";

function normalizePhone(value: string): string {
  return value.replace(/\D/g, "").slice(0, 13);
}

function formatPhone(value: string): string {
  const digits = normalizePhone(value);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

function getReferralEndpoint(): string {
  const basePath = import.meta.env.BASE_URL || "/";

  return `${basePath.replace(/\/?$/, "/")}api/referrals.php`;
}

export function ReferralSection() {
  const [form, setForm] = useState<ReferralForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const updateField = <K extends keyof ReferralForm>(
    field: K,
    value: ReferralForm[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setGeneralError("");
    setSuccessMessage("");

    setFieldErrors((current) => {
      if (!(field in current)) {
        return current;
      }

      const next = { ...current };
      delete next[field];

      return next;
    });
  };

  const validateBeforeSubmit = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    const referrerPhone = normalizePhone(form.referrerPhone);
    const referredPhone = normalizePhone(form.referredPhone);

    if (form.referrerName.trim().length < 3) {
      errors.referrer_name = "Informe seu nome completo.";
    }

    if (referrerPhone.length < 10) {
      errors.referrer_phone = "Informe um telefone válido.";
    }

    if (form.referredName.trim().length < 3) {
      errors.referred_name = "Informe o nome da pessoa indicada.";
    }

    if (referredPhone.length < 10) {
      errors.referred_phone = "Informe um telefone válido.";
    } else if (referrerPhone === referredPhone) {
      errors.referred_phone =
        "O telefone indicado deve ser diferente do seu telefone.";
    }

    if (form.referredCity.trim().length < 2) {
      errors.referred_city = "Informe a cidade.";
    }

    if (form.referredNeighborhood.trim().length < 2) {
      errors.referred_neighborhood = "Informe o bairro.";
    }

    if (!form.consent) {
      errors.consent =
        "Confirme que você possui autorização para enviar os dados da pessoa indicada.";
    }

    return errors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateBeforeSubmit();

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setGeneralError("Revise os campos destacados antes de enviar.");
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage("");
    setGeneralError("");
    setFieldErrors({});

    try {
      const response = await fetch(getReferralEndpoint(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          referrer_name: form.referrerName.trim(),
          referrer_phone: normalizePhone(form.referrerPhone),
          referrer_contract: form.referrerContract.trim(),
          referred_name: form.referredName.trim(),
          referred_phone: normalizePhone(form.referredPhone),
          referred_city: form.referredCity.trim(),
          referred_neighborhood: form.referredNeighborhood.trim(),
          consent: form.consent,
          website: form.website,
        }),
      });

      let payload: ReferralApiResponse = {};

      try {
        payload = (await response.json()) as ReferralApiResponse;
      } catch {
        payload = {};
      }

      if (!response.ok || payload.success !== true) {
        setFieldErrors(payload.fields ?? {});
        setGeneralError(
          payload.error ??
            "Não foi possível enviar a indicação. Tente novamente.",
        );
        return;
      }

      setSuccessMessage(
        payload.message ??
          "Indicação enviada com sucesso. A equipe fará a análise.",
      );
      setForm(initialForm);
    } catch {
      setGeneralError(
        "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderError = (field: string) =>
    fieldErrors[field] ? (
      <p className="mt-1 text-sm text-destructive">{fieldErrors[field]}</p>
    ) : null;

  return (
    <section
      id="indique"
      className="relative overflow-hidden border-y border-border bg-muted/35 py-20 sm:py-24"
    >
      <div
        className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-28"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Gift className="h-4 w-4" aria-hidden="true" />
              Indique e Ganhe
            </div>

            <h2 className="mt-5 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
              Indique alguém para conhecer a GNS Fibra
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Já é cliente? Envie os dados de uma pessoa interessada e nossa
              equipe verificará a cobertura e as condições comerciais
              disponíveis.
            </p>

            <div className="mt-7 space-y-4">
              <div className="flex gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <p className="text-sm leading-6 text-muted-foreground">
                  A indicação passa por análise de cobertura e viabilidade
                  técnica.
                </p>
              </div>

              <div className="flex gap-3">
                <ShieldCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <p className="text-sm leading-6 text-muted-foreground">
                  Os dados são utilizados somente para atendimento e
                  acompanhamento da indicação.
                </p>
              </div>

              <div className="flex gap-3">
                <UserRoundPlus
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <p className="text-sm leading-6 text-muted-foreground">
                  O benefício não é automático e depende das regras comerciais
                  vigentes e da instalação concluída.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center lg:justify-start">
              <img
                src={celebratingMascot}
                alt="Mascote da GNS Fibra comemorando uma indicação"
                className="h-auto max-h-[430px] w-auto max-w-full object-contain drop-shadow-2xl"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-3xl border border-border bg-card p-5 shadow-xl shadow-black/5 sm:p-8"
          >
            <div className="mb-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Formulário de indicação
              </p>
              <h3 className="mt-2 text-2xl font-bold">
                Preencha os dados para análise
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Campos marcados como obrigatórios precisam ser preenchidos.
              </p>
            </div>

            {successMessage ? (
              <div
                className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-300"
                role="status"
              >
                <div className="flex gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <strong className="block">Indicação recebida!</strong>
                    <span className="mt-1 block">{successMessage}</span>
                  </div>
                </div>
              </div>
            ) : null}

            {generalError ? (
              <div
                className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
                role="alert"
              >
                {generalError}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} noValidate>
              <fieldset disabled={isSubmitting} className="space-y-8">
                <div>
                  <legend className="mb-4 text-lg font-semibold">
                    Seus dados
                  </legend>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="referrer-name"
                        className="mb-2 block text-sm font-medium"
                      >
                        Seu nome completo *
                      </label>
                      <input
                        id="referrer-name"
                        type="text"
                        autoComplete="name"
                        maxLength={180}
                        value={form.referrerName}
                        onChange={(event) =>
                          updateField("referrerName", event.target.value)
                        }
                        className={inputClassName}
                        aria-invalid={Boolean(fieldErrors.referrer_name)}
                      />
                      {renderError("referrer_name")}
                    </div>

                    <div>
                      <label
                        htmlFor="referrer-phone"
                        className="mb-2 block text-sm font-medium"
                      >
                        Seu WhatsApp *
                      </label>
                      <input
                        id="referrer-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        maxLength={16}
                        placeholder="(51) 99999-9999"
                        value={formatPhone(form.referrerPhone)}
                        onChange={(event) =>
                          updateField(
                            "referrerPhone",
                            normalizePhone(event.target.value),
                          )
                        }
                        className={inputClassName}
                        aria-invalid={Boolean(fieldErrors.referrer_phone)}
                      />
                      {renderError("referrer_phone")}
                    </div>

                    <div>
                      <label
                        htmlFor="referrer-contract"
                        className="mb-2 block text-sm font-medium"
                      >
                        Número do contrato
                      </label>
                      <input
                        id="referrer-contract"
                        type="text"
                        maxLength={100}
                        placeholder="Opcional"
                        value={form.referrerContract}
                        onChange={(event) =>
                          updateField("referrerContract", event.target.value)
                        }
                        className={inputClassName}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-8">
                  <legend className="mb-4 text-lg font-semibold">
                    Dados da pessoa indicada
                  </legend>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="referred-name"
                        className="mb-2 block text-sm font-medium"
                      >
                        Nome completo *
                      </label>
                      <input
                        id="referred-name"
                        type="text"
                        maxLength={180}
                        value={form.referredName}
                        onChange={(event) =>
                          updateField("referredName", event.target.value)
                        }
                        className={inputClassName}
                        aria-invalid={Boolean(fieldErrors.referred_name)}
                      />
                      {renderError("referred_name")}
                    </div>

                    <div>
                      <label
                        htmlFor="referred-phone"
                        className="mb-2 block text-sm font-medium"
                      >
                        WhatsApp da pessoa indicada *
                      </label>
                      <input
                        id="referred-phone"
                        type="tel"
                        inputMode="tel"
                        maxLength={16}
                        placeholder="(51) 99999-9999"
                        value={formatPhone(form.referredPhone)}
                        onChange={(event) =>
                          updateField(
                            "referredPhone",
                            normalizePhone(event.target.value),
                          )
                        }
                        className={inputClassName}
                        aria-invalid={Boolean(fieldErrors.referred_phone)}
                      />
                      {renderError("referred_phone")}
                    </div>

                    <div>
                      <label
                        htmlFor="referred-city"
                        className="mb-2 block text-sm font-medium"
                      >
                        Cidade *
                      </label>
                      <input
                        id="referred-city"
                        type="text"
                        maxLength={120}
                        value={form.referredCity}
                        onChange={(event) =>
                          updateField("referredCity", event.target.value)
                        }
                        className={inputClassName}
                        aria-invalid={Boolean(fieldErrors.referred_city)}
                      />
                      {renderError("referred_city")}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="referred-neighborhood"
                        className="mb-2 block text-sm font-medium"
                      >
                        Bairro *
                      </label>
                      <input
                        id="referred-neighborhood"
                        type="text"
                        maxLength={150}
                        value={form.referredNeighborhood}
                        onChange={(event) =>
                          updateField(
                            "referredNeighborhood",
                            event.target.value,
                          )
                        }
                        className={inputClassName}
                        aria-invalid={Boolean(
                          fieldErrors.referred_neighborhood,
                        )}
                      />
                      {renderError("referred_neighborhood")}
                    </div>
                  </div>
                </div>

                <div className="hidden" aria-hidden="true">
                  <label htmlFor="referral-website">Website</label>
                  <input
                    id="referral-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(event) =>
                      updateField("website", event.target.value)
                    }
                  />
                </div>

                <div className="border-t border-border pt-7">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(event) =>
                        updateField("consent", event.target.checked)
                      }
                      className="mt-1 h-5 w-5 shrink-0 rounded border-border accent-primary"
                      aria-invalid={Boolean(fieldErrors.consent)}
                    />
                    <span className="text-sm leading-6 text-muted-foreground">
                      Confirmo que possuo autorização da pessoa indicada para
                      compartilhar estes dados com a GNS Fibra para contato,
                      análise de cobertura e atendimento. *
                    </span>
                  </label>
                  {renderError("consent")}
                </div>

                <button
                  type="submit"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:brightness-105 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-65"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle
                        className="h-5 w-5 animate-spin"
                        aria-hidden="true"
                      />
                      Enviando indicação...
                    </>
                  ) : (
                    <>
                      Enviar indicação
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs leading-5 text-muted-foreground">
                  O envio não garante contratação, instalação ou recompensa.
                  Todas as condições dependem de análise e das regras comerciais
                  vigentes.
                </p>
              </fieldset>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}