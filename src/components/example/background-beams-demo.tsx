"use client";
import { BackgroundBeams } from "../ui/background-beams";

export default function BackgroundBeamsDemo() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-[#1C2638] relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-4xl mx-auto p-4 flex-1 flex flex-col items-center justify-center ">
        <h1 className="relative z-10 text-5xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-barlow  text-center tracking-wide font-bold">
          Jailton Mendes
        </h1>

        <div>
        <p className="text-neutral-500 max-w-5xl mx-auto my-2 text-2xl text-center relative z-10 font-barlow">
        Sou um desenvolvedor de software dedicado e apaixonado por criar soluções inovadoras para web e aplicativos. Com  experiência no desenvolvimento de sistemas, meu foco principal está no frontend, onde transformo ideias em interfaces intuitivas e envolventes. No entanto, também possuo conhecimento em backend, o que me permite trabalhar de forma integrada em todo o ciclo de desenvolvimento de uma aplicação. Estou sempre em busca de novos desafios para expandir minhas habilidades.
        </p>
        <div className="w-full flex items-end justify-center">
          <img className="w-10" src="/assets/code-solid.svg" alt="Imagem de Código" />
        </div>
        </div>
      </div>
      <div className="h-[100px] flex">
        <p className="text-[#D9D9D9] text-3xl font-semibold font-barlow">
          Conhecimentos / Habilidades
        </p>
      </div>
      <BackgroundBeams />

      {/* <h2 className="text-xl text-neutral-300">Em construção...</h2> */}
    </div>
  );
}
