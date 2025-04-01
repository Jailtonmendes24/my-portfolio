"use client";
import Project from "@/components/project/project";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export interface BlogPost {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("frontend");
  const [repos, setRepos] = useState<GitRepository[]>([]);
  const [blogPosts] = useState<BlogPost[]>([
    {
      title: "O que é um Hook?",
      description: `
        <p><strong>Hooks</strong> são uma nova forma de manipular estado e efeitos colaterais no React.</p>
        <p>Com a introdução dos hooks, você pode usar o <span style="color: #e63946;"><strong>useState</strong></span> 
        e <span style="color: #457b9d;"><strong>useEffect</strong></span> sem precisar criar classes.</p>
        <h3 style="color: #1d3557;">Exemplo:</h3>
        <pre><code>const [count, setCount] = useState(0);</code></pre>
        <p>Os hooks tornam o código mais limpo e reutilizável! 🚀</p>
        <p><strong>Hooks</strong> são uma nova forma de manipular estado e efeitos colaterais no React.</p>
        <p>Com a introdução dos hooks, você pode usar o <span style="color: #e63946;"><strong>useState</strong></span> 
        e <span style="color: #457b9d;"><strong>useEffect</strong></span> sem precisar criar classes.</p>
        <h3 style="color: #1d3557;">Exemplo:</h3>
        <pre><code>const [count, setCount] = useState(0);</code></pre>
        <p>Os hooks tornam o código mais limpo e reutilizável! 🚀</p>
        <p><strong>Hooks</strong> são uma nova forma de manipular estado e efeitos colaterais no React.</p>
        <p>Com a introdução dos hooks, você pode usar o <span style="color: #e63946;"><strong>useState</strong></span> 
        e <span style="color: #457b9d;"><strong>useEffect</strong></span> sem precisar criar classes.</p>

      `,
      date: "2023-01-01",
      tags: ["React"],
      slug: "blog-post-1",
    },
    {
      title: "Blog post 2",
      description: "Description of blog post 2",
      date: "2023-02-01",
      tags: ["React"],
      slug: "blog-post-2",
    },
    {
      title: "Blog post 3",
      description: "Description of blog post 3",
      date: "2023-03-01",
      tags: ["Angular"],
      slug: "blog-post-3",
    },
  ]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

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
    <body className="grid h-screen grid-rows-[auto_1fr_auto]">
      <main className="grid h-screen grid-cols-1 md:grid-cols-[1fr_2fr] grid-rows-auto gap-2">
        <section className="grid h-sceen place-items-center bg-slate-100">
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

        <section className="grid h-screen min-h-[600px]  bg-slate-100 p-12 overflow-y-auto">
          <Tabs
            defaultValue="frontend"
            onValueChange={setActiveTab}
            className="border rounded-t-xl bg-slate-200 p-4 overflow-hidden"
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
              <div className="grid min-h-[150px] grid-cols-1 lg:grid-cols-3 sm:grid-cols-1 gap-4 h-[600px] overflow-y-auto">
                {filteredRepos.map((repo) => {
                  return <Project key={repo.id} repo={repo} />;
                })}
              </div>
            </TabsContent>
            <TabsContent value="backend">
              <div className="grid min-h-[150px] grid-cols-1 lg:grid-cols-3 sm:grid-cols-1 gap-4 h-[600px] overflow-y-auto">
                {filteredRepos.map((repo) => {
                  return <Project key={repo.id} repo={repo} />;
                })}
              </div>
            </TabsContent>
            <TabsContent value="blog">
              {selectedPost ? (
                // Se houver um post selecionado, exibe os detalhes
                <>
                  <div className="p-6 bg-white rounded-lg shadow overflow-y-auto">
                    <button
                      className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded"
                      onClick={() => setSelectedPost(null)}
                    >
                      Voltar
                    </button>
                    <div className="flex justify-center mb-8">
                      <h2 className="text-2xl text-center font-bold">
                        {selectedPost.title}
                      </h2>
                    </div>

                    <div
                      className="px-8"
                      dangerouslySetInnerHTML={{
                        __html: selectedPost.description,
                      }}
                    />
                    <div className="flex justify-end px-8">
                      <p className="text-gray-500">{selectedPost.date}</p>
                    </div>
                  </div>
                </>
              ) : (
                // Caso contrário, exibe a listagem dos posts
                <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-1 gap-4 w-full h-full overflow-y-auto">
                  {blogPosts.map((post) => (
                    <Card key={post.slug} className="rounded-lg max-h-[250px]">
                      <CardHeader className="border border-amber-400">
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                      </CardHeader>
                      <CardDescription className="flex flex-1  border h-full text-lg line-clamp-2">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: post.description,
                          }}
                        />
                      </CardDescription>
                      <CardFooter className="flex justify-between h-fit border">
                        {post.tags.map((tag) => {
                          return (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          );
                        })}
                        <button
                          onClick={() => setSelectedPost(post)}
                          className="cursor-pointer"
                        >
                          Ver mais →
                        </button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </body>
  );
}
