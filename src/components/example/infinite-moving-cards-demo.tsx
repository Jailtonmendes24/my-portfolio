"use client";

import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[10rem] -mt-20 rounded-md flex flex-col antialiased  dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="left"
        speed="normal"
      />
    </div>
  );
}

const testimonials = [
  {
    quote: "HTML",
    icone: "html",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote: "CSS",
    icone: "ionic",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "Javascript",
    icone: "js",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote: "Angular",
    icone: "angular",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote: "React",
    icone: "react",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
  {
    quote: "Typescript",
    icone: "typescript",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
  {
    quote: "Sass",
    icone: "sass",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
  {
    quote: "Ionic",
    icone: "ionic",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
  {
    quote: "Flutter",
    icone: "flutter",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
  {
    quote: "PHP",
    icone: "php",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
  {
    quote: "Node JS",
    icone: "node",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
  {
    quote: "Java",
    icone: "java",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
  {
    quote: "MySQL",
    icone: "mysql",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
  {
    quote: "Figma",
    icone: "figma",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
  {
    quote: "Photoshop",
    icone: "photoshop",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
  {
    quote: "Illustrator",
    icone: "illustrator",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
