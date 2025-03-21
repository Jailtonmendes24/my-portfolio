"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Phone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

// Types for GitHub repositories
interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}

// Types for Blog articles
interface BlogArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: number;
  tags: string[];
  coverImage: string;
}

// Sample blog articles
const sampleBlogArticles: BlogArticle[] = [
  {
    id: 1,
    title: "Getting Started with React Server Components",
    excerpt:
      "React Server Components represent a paradigm shift in how we build React applications. In this article, we'll explore the basics and benefits of this new approach.",
    content:
      "React Server Components represent a paradigm shift in how we build React applications. They allow components to render on the server, reducing the JavaScript bundle size sent to the client and improving performance.\n\nServer Components can access server-side resources directly, like databases or file systems, without the need for an API layer. This simplifies the architecture and reduces the amount of code you need to write.\n\nOne of the key benefits of Server Components is that they don't increase your JavaScript bundle size. The rendered result is sent to the client, not the component code itself. This leads to faster page loads and improved performance, especially on slower devices and networks.\n\nIn Next.js 13 and later, Server Components are the default. This means that every component in your app is a Server Component unless you explicitly mark it as a Client Component using the 'use client' directive.\n\nTo get started with Server Components, you need to understand the distinction between Server and Client Components. Server Components run only on the server and can access server-side resources directly. Client Components run on both the server (for the initial render) and the client, and can use React hooks and browser APIs.\n\nIn conclusion, React Server Components offer a powerful new way to build React applications with improved performance and simplified data fetching. As this pattern becomes more widely adopted, it's worth investing time to understand how to leverage it effectively in your projects.",
    date: "2023-11-15",
    readTime: 8,
    tags: ["React", "Server Components", "Web Development"],
    coverImage: "/placeholder.svg?height=400&width=800",
  },
  {
    id: 2,
    title: "Building Accessible Web Applications",
    excerpt:
      "Accessibility is not just a nice-to-have feature—it's essential. Learn how to make your web applications more accessible to all users.",
    content:
      "Web accessibility ensures that people with disabilities can perceive, understand, navigate, and interact with websites and tools. It's not just a moral imperative but often a legal requirement in many countries.\n\nBuilding accessible applications starts with semantic HTML. Using the right HTML elements for their intended purpose provides a solid foundation. For example, using <button> for buttons rather than <div> with click handlers ensures keyboard accessibility and proper screen reader announcements.\n\nARIA (Accessible Rich Internet Applications) attributes can enhance accessibility when HTML alone isn't sufficient. However, it's important to remember the first rule of ARIA: don't use ARIA if a native HTML element or attribute can do the job.\n\nColor contrast is another crucial aspect of accessibility. Text should have sufficient contrast with its background to be readable by people with visual impairments. The Web Content Accessibility Guidelines (WCAG) recommend a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.\n\nKeyboard accessibility is essential for users who can't use a mouse. All interactive elements should be focusable and operable with a keyboard. This includes ensuring a visible focus indicator and logical tab order.\n\nScreen reader compatibility involves providing text alternatives for non-text content and ensuring that all information conveyed through color is also available in text. Additionally, form inputs should have associated labels, and error messages should be clear and programmatically associated with the relevant inputs.\n\nTesting is a critical part of ensuring accessibility. Automated tools like axe, WAVE, or Lighthouse can catch many issues, but manual testing with keyboard navigation and screen readers is also necessary.\n\nRemember that accessibility benefits everyone, not just users with disabilities. Features like keyboard navigation, good contrast, and clear focus indicators improve the user experience for all users, including those using mobile devices or working in challenging environments.",
    date: "2023-10-22",
    readTime: 10,
    tags: ["Accessibility", "Web Development", "UX"],
    coverImage: "/placeholder.svg?height=400&width=800",
  },
  {
    id: 3,
    title: "The Future of CSS: What's Coming in 2024",
    excerpt:
      "CSS is evolving rapidly with new features that make complex layouts and effects easier than ever. Let's explore what's on the horizon for CSS in 2024.",
    content:
      "CSS continues to evolve at a rapid pace, with browser vendors implementing new features that make web development more powerful and intuitive. Here's what we can expect in 2024 and beyond.\n\nContainer Queries are perhaps the most anticipated feature coming to CSS. Unlike media queries that respond to the viewport size, container queries allow elements to respond to the size of their container. This enables truly modular components that adapt to their context rather than the overall page size.\n\nThe :has() pseudo-class, sometimes called the \"parent selector,\" allows selecting elements based on their children. This has been a long-requested feature that finally gives developers the ability to style parents based on their contents.\n\nCascade Layers provide a new way to manage specificity in CSS. With the @layer rule, developers can define explicit layers of specificity, making it easier to organize styles and avoid specificity conflicts.\n\nNesting is coming to native CSS, allowing developers to write nested selectors similar to what preprocessors like Sass offer. This will make CSS more maintainable and reduce repetition.\n\nColor functions are getting more powerful with relative color syntax. This allows defining colors relative to other colors, making it easier to create cohesive color schemes and implement features like dark mode.\n\nScroll-driven animations will enable animations triggered by scroll position, similar to libraries like GSAP ScrollTrigger but native to the browser. This opens up new possibilities for engaging scroll experiences without JavaScript.\n\nSubgrid allows grid items to align to the parent grid, solving many complex layout challenges. This feature is already available in Firefox and is coming to other browsers.\n\nView transitions provide a native way to animate between different states or pages, similar to what was previously only possible with JavaScript libraries.\n\nAs these features gain broader browser support, they'll transform how we approach web design and development, making complex layouts and interactions more accessible to developers of all skill levels.",
    date: "2023-12-05",
    readTime: 7,
    tags: ["CSS", "Web Development", "Frontend"],
    coverImage: "/placeholder.svg?height=400&width=800",
  },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("frontend");
  const [repos, setRepos] = useState<Repository[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const [blogArticles] = useState<BlogArticle[]>(sampleBlogArticles);
  const [currentArticle, setCurrentArticle] = useState<BlogArticle | null>(
    null
  );
  const [isArticleOpen, setIsArticleOpen] = useState(false);

  const openArticle = (article: BlogArticle) => {
    setCurrentArticle(article);
    setIsArticleOpen(true);
  };

  const closeArticle = () => {
    setIsArticleOpen(false);
  };

  // Function to fetch GitHub repositories
  const fetchRepos = useCallback(
    async (pageNum: number) => {
      if (loading) return;

      setLoading(true);
      try {
        // Note: In a real implementation, you would use your own GitHub username
        const response = await fetch(
          `https://api.github.com/users/jailtonmendes24/repos?per_page=5&page=${pageNum}&sort=updated`
        );
        const data = await response.json();
        console.log("🚀 ~ data:", data);

        if (data.length === 0) {
          setHasMore(false);
        } else {
          setRepos((prevRepos) => [...prevRepos, ...data]);
          setPage((prevPage) => prevPage + 1);
        }
      } catch (error) {
        console.error("Error fetching repositories:", error);
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  // Filter repositories based on active tab
  const filteredRepos = repos.filter((repo) => {
    if (activeTab === "frontend") {
      return (
        repo.topics.includes("frontend") ||
        [
          "javascript",
          "typescript",
          "react",
          "vue",
          "angular",
          "html",
          "css",
        ].includes(repo.language?.toLowerCase() || "")
      );
    } else {
      return (
        repo.topics.includes("backend") ||
        ["python", "java", "node", "php", "ruby", "go", "c#"].includes(
          repo.language?.toLowerCase() || ""
        )
      );
    }
  });

  // Set up intersection observer for infinite scroll
  const lastRepoElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchRepos(page);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchRepos, page]
  );

  // Initial fetch of repositories
  useEffect(() => {
    fetchRepos(1);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  // Reset repositories when tab changes
  useEffect(() => {
    setRepos([]);
    setPage(1);
    setHasMore(true);
    fetchRepos(1);
  }, [activeTab]);

  return (
    <main className="flex flex-wrap h-screen w-full overflow-hidden bg-background">
      {/* Left Section */}
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-8 border-r border-border">
        <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-primary">
          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="Jailton"
            fill
            className="object-cover"
          />
        </div>

        <h1 className="text-3xl font-bold mb-2">Jailton Mendes</h1>
        <h2 className="text-2xl text-muted-foreground mb-8">Dev Frontend</h2>

        <div className="flex space-x-6">
          <Link
            href="https://linkedin.com"
            target="_blank"
            className="text-foreground hover:text-primary transition-colors"
          >
            <Linkedin size={28} />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            className="text-foreground hover:text-primary transition-colors"
          >
            <Github size={28} />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="tel:81988544790"
            className="text-foreground hover:text-primary transition-colors"
          >
            <Phone size={28} />
            <span className="sr-only">Phone</span>
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-2/3 h-full flex flex-col bg-slate-100 p-8">
        <Tabs
          defaultValue="frontend"
          className="w-full h-full flex flex-col"
          onValueChange={setActiveTab}
        >
          <div className="border-b border-border">
            <TabsList className="w-full justify-start p-0 bg-transparent">
              <TabsTrigger
                value="frontend"
                className="py-4 px-8 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Frontend
              </TabsTrigger>
              <TabsTrigger
                value="backend"
                className="py-4 px-8 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Backend
              </TabsTrigger>
              <TabsTrigger
                value="blog"
                className="py-4 px-8 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Blog
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="frontend"
            className="flex-1 overflow-y-auto p-6 mt-0"
          >
            <div className="grid grid-cols-2 gap-4">
              {filteredRepos.length > 0 ? (
                filteredRepos.map((repo, index) => {
                  if (filteredRepos.length === index + 1) {
                    return (
                      <div ref={lastRepoElementRef} key={repo.id}>
                        <ProjectCard repo={repo} />
                      </div>
                    );
                  } else {
                    return <ProjectCard key={repo.id} repo={repo} />;
                  }
                })
              ) : (
                <p className="text-center py-8 text-muted-foreground">
                  {loading
                    ? "Loading projects..."
                    : "No frontend projects found"}
                </p>
              )}
              {loading && (
                <p className="text-center py-4 text-muted-foreground">
                  Loading more projects...
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent
            value="backend"
            className="flex-1 overflow-y-auto p-6 mt-0"
          >
            <div className="grid grid-cols-2 gap-4">
              {filteredRepos.length > 0 ? (
                filteredRepos.map((repo, index) => {
                  if (filteredRepos.length === index + 1) {
                    return (
                      <div ref={lastRepoElementRef} key={repo.id}>
                        <ProjectCard repo={repo} />
                      </div>
                    );
                  } else {
                    return <ProjectCard key={repo.id} repo={repo} />;
                  }
                })
              ) : (
                <p className="text-center py-8 text-muted-foreground">
                  {loading
                    ? "Buscando projetos..."
                    : "Nenhum projeto de backend encontrado"}
                </p>
              )}
              {loading && (
                <p className="text-center py-4 text-muted-foreground">
                  Loading more projects...
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent
            value="blog"
            className="flex-1 overflow-y-auto p-6 mt-0 "
          >
            <div className="grid grid-cols-2 gap-6">
              {blogArticles.map((article) => (
                <BlogArticleCard
                  key={article.id}
                  article={article}
                  onReadMore={() => openArticle(article)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Article Dialog */}
      {isArticleOpen && currentArticle && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{currentArticle.title}</h2>
                <button
                  onClick={closeArticle}
                  className="p-2 rounded-full hover:bg-muted"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                  <span className="sr-only">Close</span>
                </button>
              </div>
              <div className="mb-4 text-sm text-muted-foreground">
                {new Date(currentArticle.date).toLocaleDateString()} •{" "}
                {currentArticle.readTime} min read
              </div>
              {currentArticle.coverImage && (
                <div className="w-full h-64 relative mb-6">
                  <Image
                    src={currentArticle.coverImage || "/placeholder.svg"}
                    alt={currentArticle.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="prose max-w-none">
                {currentArticle.content.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {currentArticle.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// Project Card Component
function ProjectCard({ repo }: { repo: Repository }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{repo.name}</h3>
          {/* <div className="flex items-center text-sm text-muted-foreground">
            <span className="mr-2">⭐ {repo.stargazers_count}</span>
            {repo.language && <span>{repo.language}</span>}
          </div> */}
        </div>

        <p className="text-muted-foreground mb-4">
          {repo.description || "No description available"}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {repo.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
            >
              {topic}
            </span>
          ))}
        </div>

        <Link
          href={repo.html_url}
          target="_blank"
          className="text-sm text-primary hover:underline"
        >
          Ver no GitHub →
        </Link>
      </CardContent>
    </Card>
  );
}

// Blog Article Card Component
function BlogArticleCard({
  article,
  onReadMore,
}: {
  article: BlogArticle;
  onReadMore: () => void;
}) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      {article.coverImage && (
        <div className="w-full h-48 relative">
          <Image
            src={article.coverImage || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <CardContent className="p-6">
        <div className="mb-2">
          <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
          <div className="text-sm text-muted-foreground mb-4">
            {new Date(article.date).toLocaleDateString()} • {article.readTime}{" "}
            min read
          </div>
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={onReadMore}
          className="text-sm font-medium text-primary hover:underline"
        >
          Read More →
        </button>
      </CardContent>
    </Card>
  );
}
