"use client";
import Project from "@/components/project/project";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export interface GitRepository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("frontend");
  const [repos, setRepos] = useState<GitRepository[]>([]);

  const fetchRepos = useCallback(async () => {
    try {
      const response = await fetch(
        "https://api.github.com/users/jailtonmendes24/repos"
      );
      const data = await response.json();

      if (data) {
        setRepos(data);
      }
    } catch (error) {
      console.log("🚀 ~ fetchRepos ~ error:", error);
    }
  }, []);

  const filteredRepos = repos.filter((repo) => {
    if (activeTab === "frontend") {
      return repo.topics.includes("frontend");
    } else {
      return repo.topics.includes("backend");
    }
  });

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return (
    <body className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <main className="grid min-h-screen grid-cols-1 md:grid-cols-[1fr_2fr] grid-rows-auto gap-2">
        <section className="grid min-h-[300px] place-items-center bg-slate-100">
          <div className="gap-4 flex flex-col place-items-center">
            <Image
              aria-hidden
              src="/avatar.svg"
              alt="File icon"
              width={250}
              height={250}
            />
            <h1 className="text-6xl font-bold barlow-condensed ">
              Jailton Mendes
            </h1>
            <h1 className="text-5xl font-semibold barlow-condensed text-cyan-600">
              Dev Frontend
            </h1>
            <div className="flex flex-row gap-4 mt-4">
              <a
                className=" gap-2 hover:underline hover:underline-offset-4"
                href="https://www.linkedin.com/in/jailton-mendes/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  aria-hidden
                  src="/linkedin.svg"
                  alt="icone linkedin"
                  width={48}
                  height={48}
                />
              </a>
              <a
                className=" gap-2 hover:underline hover:underline-offset-4"
                href="https://github.com/Jailtonmendes24"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  aria-hidden
                  src="/github.svg"
                  alt="Icone de github"
                  width={48}
                  height={48}
                />
              </a>
              <a
                className=" gap-2 hover:underline hover:underline-offset-4"
                href="+55 81 9 8854-4790"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  aria-hidden
                  src="/phone.svg"
                  alt="Icone de telefone"
                  width={48}
                  height={48}
                />
              </a>
            </div>
          </div>
        </section>
        <section className="grid min-h-[300px]  bg-slate-100 p-12">
          <Tabs
            defaultValue="frontend"
            onValueChange={setActiveTab}
            className="border rounded-t-xl bg-slate-200 p-4"
          >
            <TabsList className="w-full py-6 px-2 bg-cyan-600 mb-4">
              <TabsTrigger
                value="frontend"
                className={`px-8 py-4 cursor-pointer text-xl font-bold ${
                  activeTab === "frontend" ? "text-cyan-600" : "text-black"
                }`}
              >
                Frontend
              </TabsTrigger>
              <TabsTrigger
                value="backend"
                className={`px-8 py-4 cursor-pointer text-xl font-bold ${
                  activeTab === "backend" ? "text-cyan-600" : "text-black"
                }`}
              >
                Backend
              </TabsTrigger>
              <TabsTrigger
                value="blog"
                className={`px-8 py-4 cursor-pointer text-xl font-bold ${
                  activeTab === "blog"
                    ? "text-cyan-600 font-bold"
                    : "text-black"
                }`}
              >
                blog
              </TabsTrigger>
            </TabsList>
            <TabsContent value="frontend">
              <div className="grid min-h-[150px] grid-cols-1 lg:grid-cols-3 sm:grid-cols-1 gap-4">
                {filteredRepos.map((repo) => {
                  return <Project key={repo.id} repo={repo} />;
                })}
              </div>
            </TabsContent>
            <TabsContent value="backend">
              <div className="grid min-h-[150px] grid-cols-3 gap-4">
                {filteredRepos.map((repo) => {
                  return <Project key={repo.id} repo={repo} />;
                })}
              </div>
            </TabsContent>
            <TabsContent value="blog">
              <div className="h-full w-full flex items-center justify-center">
                <h3 className="text-4xl text-cyan-600 font-bold">
                  Página em construção
                </h3>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </body>
  );
  {
    /* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        aria-hidden
        src="/file.svg"
        alt="File icon"
        width={16}
        height={16}
      />
      Learn
    </a>
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        aria-hidden
        src="/window.svg"
        alt="Window icon"
        width={16}
        height={16}
      />
      Examples
    </a>
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        aria-hidden
        src="/globe.svg"
        alt="Globe icon"
        width={16}
        height={16}
      />
      Go to nextjs.org →
    </a>
  </footer> */
  }
}
