import mascotPresenting from "@/assets/mascote/v2/hero-apresentando-apontando.png";

export function HeroMascot() {
  return (
    <div
      className="hero-mascot-stage"
      data-future-mascot-slot="hero"
      data-mascot-state="active"
    >
      <span className="hero-mascot-glow" aria-hidden="true" />
      <img
        src={mascotPresenting}
        alt="Mascote da GNS Fibra apontando para a mensagem principal"
        width={687}
        height={900}
        loading="eager"
        decoding="async"
        className="hero-mascot-image"
      />
    </div>
  );
}
