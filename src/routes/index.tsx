import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import heroBrasa from "@/assets/hero-brasa.jpg";
import espetinhosPrato from "@/assets/espetinhos-prato.jpg";
import lanchoneteFoto from "@/assets/lanchonete.jpg";
import ambienteCerveja from "@/assets/ambiente-cerveja.jpg";
import galeriaGrelha from "@/assets/galeria-grelha.jpg";
import porcoesFoto from "@/assets/porcoes.jpg";
import logoPitStop from "@/assets/logo-pit-stop.png";

export const Route = createFileRoute("/")({
  component: Index,
});

/* ------------------------------------------------------------------ *
 * Dados do negócio — troque aqui quando tiver os oficiais
 * ------------------------------------------------------------------ */
const ENDERECO = "Av. José Cobra, 82";
const INSTAGRAM = "https://www.instagram.com/pitstoppqindustrial";
const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Av. José Cobra, 82, Parque Industrial, São José dos Campos, SP",
)}`;
// Cadastre o número oficial (55 + DDD + número) para habilitar pedidos pelo WhatsApp.
const WHATSAPP = "5512981266855";
const WHATS_LINK = WHATSAPP
  ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Quero fazer um pedido no Pit Stop.")}`
  : INSTAGRAM;
const CONTATO_LABEL = WHATSAPP ? "Chamar no WhatsApp" : "Chamar no Instagram";
const PEDIDO_LABEL = WHATSAPP ? "Pedir no WhatsApp" : "Falar com o Pit Stop";

// Bloco de jogo: mude para true e preencha quando tiver jogo
const JOGO = {
  ativo: false,
  titulo: "Hoje tem jogo no Pit Stop",
  partida: "",
  quando: "",
};

const CATEGORIAS = [
  { emoji: "🔥", nome: "Espetinhos", href: "#espetinhos" },
  { emoji: "🍔", nome: "Lanches", href: "#lanchonete" },
  { emoji: "🍟", nome: "Porções", href: "#cardapio" },
  { emoji: "🥤", nome: "Bebidas", href: "#cardapio" },
  { emoji: "🍺", nome: "Cervejas", href: "#cardapio" },
];

const MENU = [
  { label: "Início", href: "#top" },
  { label: "Cardápio", href: "#cardapio" },
  { label: "Espetinhos", href: "#espetinhos" },
  { label: "Lanchonete", href: "#lanchonete" },
  { label: "Localização", href: "#localizacao" },
];

function Logo({ className = "", size = "sm" }: { className?: string; size?: "sm" | "lg" }) {
  return (
    <a
      href="#top"
      className={`inline-flex items-center ${className}`}
      aria-label="Pit Stop Espetinho e Lanchonete"
    >
      <img
        src={logoPitStop}
        alt="Pit Stop Espetinho e Lanchonete"
        width={156}
        height={152}
        className={
          size === "lg"
            ? "h-20 w-20 rounded-full object-contain"
            : "h-14 w-14 rounded-full object-contain"
        }
        draggable={false}
      />
    </a>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled || open ? "border-b border-border bg-surface/95 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          {MENU.map((m) => (
            <a
              key={m.label}
              href={m.href}
              className="font-display text-sm tracking-wide text-foreground/85 uppercase transition-colors hover:text-primary"
            >
              {m.label}
            </a>
          ))}
          <a href={WHATS_LINK} target="_blank" rel="noopener" className="btn-primary text-sm">
            {PEDIDO_LABEL}
          </a>
        </nav>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
          aria-expanded={open}
          className="grid size-10 place-items-center rounded-sm border border-border md:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-foreground" />
            <span className="block h-0.5 w-5 bg-foreground" />
            <span className="block h-0.5 w-5 bg-foreground" />
          </div>
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-surface px-4 pb-5 md:hidden">
          {MENU.map((m) => (
            <a
              key={m.label}
              href={m.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-3 font-display tracking-wide uppercase"
            >
              {m.label}
            </a>
          ))}
          <a
            href={WHATS_LINK}
            target="_blank"
            rel="noopener"
            className="btn-primary mt-4 w-full text-sm"
          >
            {PEDIDO_LABEL}
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative">
      <img
        src={heroBrasa}
        alt="Espetinhos na brasa do Pit Stop"
        width={1600}
        height={1104}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
      <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-12 sm:pt-36 sm:pb-16">
        <span className="section-label">Parque Industrial • {ENDERECO}</span>
        <h1 className="mt-3 max-w-xl text-4xl font-bold sm:text-6xl">
          Parada certa
          <br />
          <span className="text-primary">pra matar a fome.</span>
        </h1>
        <p className="mt-4 max-w-md text-base text-foreground/80">
          Espetinhos, lanches e aquele churrasquinho caprichado que combina com qualquer dia.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#cardapio" className="btn-primary">
            Ver cardápio
          </a>
          <a href={WHATS_LINK} target="_blank" rel="noopener" className="btn-ghost">
            {CONTATO_LABEL}
          </a>
        </div>
        <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground/80">
          <li>🔥 Espetinho feito na hora</li>
          <li>🍔 Lanchonete</li>
          <li>🍺 Ambiente descontraído</li>
          <li>📍 {ENDERECO}</li>
        </ul>
      </div>
    </section>
  );
}

function Horarios({ id }: { id?: string }) {
  const cards = [
    { titulo: "Espetinho", hora: "19h às 23h", dias: "Segunda a sexta", emoji: "🔥" },
    { titulo: "Lanchonete", hora: "08h às 16h", dias: "Segunda a sábado", emoji: "🍔" },
  ];
  return (
    <section id={id} className="mx-auto -mt-6 max-w-6xl px-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map((c) => (
          <div
            key={c.titulo}
            className="rounded-md border border-border bg-surface p-5 shadow-card"
          >
            <p className="font-display text-sm tracking-[0.18em] text-muted-foreground uppercase">
              {c.emoji} {c.titulo}
            </p>
            <p className="mt-1 font-display text-3xl font-bold text-accent">{c.hora}</p>
            <p className="text-sm text-foreground/75">{c.dias}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Atalhos() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="grill-lines grid grid-cols-2 gap-3 rounded-md border border-border bg-surface/60 p-3 sm:grid-cols-5">
        {CATEGORIAS.map((c) => (
          <a
            key={c.nome}
            href={c.href}
            className="flex flex-col items-center gap-1 rounded-sm bg-surface-2 px-3 py-4 text-center transition-colors hover:bg-primary/15"
          >
            <span className="text-2xl">{c.emoji}</span>
            <span className="font-display text-sm tracking-wide uppercase">{c.nome}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

type Item = { nome: string; desc: string; img: string; w: number; h: number };

function ItemCard({ item }: { item: Item }) {
  return (
    <article className="overflow-hidden rounded-md border border-border bg-surface shadow-card">
      <img
        src={item.img}
        alt={item.nome}
        width={item.w}
        height={item.h}
        loading="lazy"
        className="aspect-4/3 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{item.nome}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-display text-sm tracking-wide text-accent uppercase">
            Preço sob consulta
          </span>
          <a
            href={WHATS_LINK}
            target="_blank"
            rel="noopener"
            className="btn-primary px-3 py-2 text-xs"
          >
            Quero esse
          </a>
        </div>
      </div>
    </article>
  );
}

function Cardapio() {
  const itens: Item[] = [
    {
      nome: "Espetinhos na brasa",
      desc: "Feitos na hora, direto do carvão.",
      img: espetinhosPrato,
      w: 1200,
      h: 1200,
    },
    {
      nome: "Lanches",
      desc: "Pão, carne e recheio sem frescura.",
      img: lanchoneteFoto,
      w: 1200,
      h: 1200,
    },
    {
      nome: "Porções",
      desc: "Pra dividir na mesa com a cerveja.",
      img: porcoesFoto,
      w: 1008,
      h: 1008,
    },
  ];

  return (
    <section id="cardapio" className="mx-auto max-w-6xl px-4 py-12">
      <span className="section-label">Cardápio</span>
      <h2 className="mt-2 text-3xl font-bold sm:text-5xl">Bateu a fome?</h2>
      <p className="mt-2 text-muted-foreground">Escolhe o seu.</p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {itens.map((i) => (
          <ItemCard key={i.nome} item={i} />
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Consulte o cardápio atualizado pelo Instagram. Itens e preços devem ser confirmados com o
        estabelecimento.
      </p>
    </section>
  );
}

function Espetinhos() {
  const espetos = ["Espetinhos na brasa", "Acompanhamentos"];
  return (
    <section id="espetinhos" className="bg-surface py-12">
      <div className="mx-auto max-w-6xl px-4">
        <span className="section-label">O carro-chefe</span>
        <h2 className="mt-2 text-3xl font-bold sm:text-5xl">Qual vai pra brasa?</h2>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <img
            src={galeriaGrelha}
            alt="Espetinhos na grelha"
            width={1008}
            height={1008}
            loading="lazy"
            className="aspect-4/3 w-full rounded-md object-cover"
          />
          <ul className="grid grid-cols-2 gap-3 self-start">
            {espetos.map((e) => (
              <li
                key={e}
                className="rounded-md border border-border bg-surface-2 p-4 transition-colors hover:border-primary"
              >
                <p className="font-display text-lg font-semibold">{e}</p>
                <p className="mt-1 text-xs text-muted-foreground">Preço a confirmar</p>
              </li>
            ))}
          </ul>
        </div>
        <a
          href={WHATS_LINK}
          target="_blank"
          rel="noopener"
          className="btn-primary mt-7 w-full sm:w-auto"
        >
          Pedir espetinho
        </a>
      </div>
    </section>
  );
}

function Lanchonete() {
  return (
    <section id="lanchonete" className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid items-center gap-7 lg:grid-cols-2">
        <div>
          <span className="section-label">Durante o dia</span>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            E tem Pit Stop durante o dia também.
          </h2>
          <p className="mt-3 text-foreground/80">
            De manhã e à tarde a lanchonete fica aberta pro lanche rápido, o salgado e o café.
          </p>
          <div className="mt-5 inline-block rounded-md border border-border bg-surface px-5 py-4">
            <p className="font-display text-sm tracking-[0.18em] text-muted-foreground uppercase">
              Lanchonete
            </p>
            <p className="font-display text-2xl font-bold text-accent">08h às 16h</p>
            <p className="text-sm text-foreground/75">Segunda a sábado</p>
          </div>
        </div>
        <img
          src={lanchoneteFoto}
          alt="Lanche da lanchonete Pit Stop"
          width={1200}
          height={1200}
          loading="lazy"
          className="aspect-4/3 w-full rounded-md object-cover"
        />
      </div>
    </section>
  );
}

function Promocoes() {
  const cards = [
    {
      tag: "Promo",
      titulo: "Promoção da semana",
      texto: "Confira as novidades e ofertas atuais no Instagram.",
    },
    {
      tag: "Futebol",
      titulo: "Jogo na TV",
      texto: "Confira a programação de jogos no Instagram.",
    },
    {
      tag: "Combo",
      titulo: "Espetinho + bebida",
      texto: "Consulte os combos disponíveis diretamente com o Pit Stop.",
    },
  ];
  return (
    <section className="bg-surface py-12">
      <div className="mx-auto max-w-6xl px-4">
        <span className="section-label">Novidades</span>
        <h2 className="mt-2 text-3xl font-bold sm:text-5xl">Rolando no Pit Stop</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.titulo}
              className="rounded-md border border-border bg-background p-5 shadow-card"
            >
              <span className="inline-block rounded-sm bg-primary px-2 py-1 font-display text-xs tracking-widest text-primary-foreground uppercase">
                {c.tag}
              </span>
              <h3 className="mt-3 text-xl font-semibold">{c.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.texto}</p>
            </div>
          ))}
        </div>

        {JOGO.ativo && (
          <div className="mt-5 flex flex-wrap items-center gap-4 rounded-md border border-primary bg-background p-5">
            <span className="text-2xl">⚽</span>
            <div>
              <h3 className="text-xl font-semibold">{JOGO.titulo}</h3>
              <p className="text-sm text-foreground/80">
                {JOGO.partida} • {JOGO.quando}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Churrasco, cerveja gelada e jogo na TV.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Galeria() {
  const fotos = [
    { src: heroBrasa, alt: "Brasa e espetinhos", w: 1600, h: 1104 },
    { src: espetinhosPrato, alt: "Prato de espetinhos", w: 1200, h: 1200 },
    { src: galeriaGrelha, alt: "Espetinhos na grelha", w: 1008, h: 1008 },
    { src: porcoesFoto, alt: "Porções", w: 1008, h: 1008 },
    { src: lanchoneteFoto, alt: "Lanche e batata", w: 1200, h: 1200 },
    { src: ambienteCerveja, alt: "Cerveja gelada e futebol", w: 1200, h: 1200 },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <span className="section-label">Galeria</span>
      <h2 className="mt-2 text-3xl font-bold sm:text-5xl">Olha essa brasa 🔥</h2>
      <div className="mt-7 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
        {fotos.map((f) => (
          <img
            key={f.alt}
            src={f.src}
            alt={f.alt}
            width={f.w}
            height={f.h}
            loading="lazy"
            className="aspect-square w-full rounded-sm object-cover"
          />
        ))}
      </div>
      <a href={INSTAGRAM} target="_blank" rel="noopener" className="btn-ghost mt-5">
        Ver mais no Instagram
      </a>
    </section>
  );
}

function Sobre() {
  return (
    <section className="bg-surface py-12">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <span className="section-label">Sobre</span>
        <h2 className="mt-2 text-3xl font-bold sm:text-5xl">Pit Stop é simples.</h2>
        <p className="mt-4 text-lg text-foreground/80">
          Comida boa, churrasquinho saindo da brasa e aquele clima sem frescura. O Pit Stop é lugar
          de chegar, pedir o seu e aproveitar.
        </p>
      </div>
    </section>
  );
}

function Localizacao() {
  return (
    <section id="localizacao" className="mx-auto max-w-6xl px-4 py-12">
      <span className="section-label">Localização</span>
      <h2 className="mt-2 text-3xl font-bold sm:text-5xl">Chega aí.</h2>
      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-md border border-border">
          <iframe
            title="Mapa Pit Stop"
            src={`https://www.google.com/maps?q=${encodeURIComponent(ENDERECO)}&output=embed`}
            loading="lazy"
            className="h-72 w-full lg:h-full"
          />
        </div>
        <div className="space-y-5">
          <div className="rounded-md border border-border bg-surface p-5">
            <p className="font-display text-sm tracking-[0.18em] text-muted-foreground uppercase">
              Endereço
            </p>
            <p className="mt-1 text-xl font-semibold">{ENDERECO}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-border bg-surface p-5">
              <p className="font-display text-sm tracking-[0.18em] text-muted-foreground uppercase">
                🔥 Espetinho
              </p>
              <p className="font-display text-2xl font-bold text-accent">19h às 23h</p>
              <p className="text-sm text-foreground/75">Segunda a sexta</p>
            </div>
            <div className="rounded-md border border-border bg-surface p-5">
              <p className="font-display text-sm tracking-[0.18em] text-muted-foreground uppercase">
                🍔 Lanchonete
              </p>
              <p className="font-display text-2xl font-bold text-accent">08h às 16h</p>
              <p className="text-sm text-foreground/75">Segunda a sábado</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={MAPS} target="_blank" rel="noopener" className="btn-ghost flex-1">
              Abrir no Google Maps
            </a>
            <a href={WHATS_LINK} target="_blank" rel="noopener" className="btn-primary flex-1">
              {CONTATO_LABEL}
            </a>
          </div>
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener"
            className="inline-block text-sm text-muted-foreground underline hover:text-foreground"
          >
            @pitstoppqindustrial
          </a>
        </div>
      </div>
    </section>
  );
}

function CtaFinal() {
  return (
    <section className="bg-surface">
      <div className="mx-auto grid max-w-6xl items-center gap-0 lg:grid-cols-2">
        <div className="px-4 py-12">
          <h2 className="text-3xl font-bold sm:text-5xl">
            Bateu a <span className="text-primary">fome?</span>
          </h2>
          <p className="mt-3 text-lg text-foreground/80">Então já sabe onde fazer seu Pit Stop.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#cardapio" className="btn-ghost">
              Ver cardápio
            </a>
            <a href={WHATS_LINK} target="_blank" rel="noopener" className="btn-primary">
              {CONTATO_LABEL}
            </a>
          </div>
        </div>
        <img
          src={ambienteCerveja}
          alt="Mesa com cerveja gelada no Pit Stop"
          width={1200}
          height={1200}
          loading="lazy"
          className="h-64 w-full object-cover lg:h-full"
        />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background px-4 py-10 pb-24 md:pb-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Logo size="lg" />
        <div className="text-sm text-muted-foreground">
          <p>{ENDERECO}</p>
          <p>Espetinho 19h–23h (seg a sex) • Lanchonete 08h–16h (seg a sáb)</p>
          <a href={INSTAGRAM} target="_blank" rel="noopener" className="underline">
            @pitstoppqindustrial
          </a>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-6xl text-xs text-muted-foreground">
        © {new Date().getFullYear()} Pit Stop Espetinho e Lanchonete.
      </p>
    </footer>
  );
}

function WhatsFloat() {
  return (
    <>
      <a
        href={WHATS_LINK}
        target="_blank"
        rel="noopener"
        className="fixed right-5 bottom-5 z-50 hidden size-14 place-items-center rounded-full bg-whats text-white shadow-card md:grid"
        aria-label={CONTATO_LABEL}
      >
        <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className="size-8">
          <path d="M16 .8A15.1 15.1 0 0 0 2.9 23.5L.8 31.2l7.9-2.1A15.2 15.2 0 1 0 16 .8Zm0 27.6a12.3 12.3 0 0 1-6.3-1.7l-.5-.3-4.7 1.2 1.3-4.6-.3-.5A12.4 12.4 0 1 1 16 28.4Zm6.8-9.3c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.8.2-.2.3-.9 1.2-1.1 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.3-2.1-2.7-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.6.1-.2 0-.5 0-.7l-1.2-2.8c-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .5-.3.4-1.3 1.2-1.3 3s1.3 3.5 1.5 3.7c.2.2 2.6 4 6.3 5.6.9.4 1.6.6 2.2.7.9.3 1.7.2 2.3.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.2-.3-.3-.7-.5Z" />
        </svg>
      </a>
      <a
        href={WHATS_LINK}
        target="_blank"
        rel="noopener"
        className="btn-primary fixed inset-x-0 bottom-0 z-50 rounded-none py-4 md:hidden"
      >
        🔥 {PEDIDO_LABEL}
      </a>
    </>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Horarios />
        <Atalhos />
        <Cardapio />
        <Espetinhos />
        <Lanchonete />
        <Promocoes />
        <Galeria />
        <Sobre />
        <Localizacao />
        <CtaFinal />
      </main>
      <Footer />
      <WhatsFloat />
    </div>
  );
}
