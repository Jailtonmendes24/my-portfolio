import { BlogPost } from "@/app/page";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

export default function Blog({ post }: { post: BlogPost }) {
  return (
    <Card className="rounded-lg max-h-[250px]">
      <CardHeader className="border border-amber-400">
        <CardTitle className="text-xl">{post.title}</CardTitle>
      </CardHeader>
      <CardDescription className="flex flex-1  border h-full text-lg line-clamp-2">
        {post.description}
      </CardDescription>
      <CardFooter className="flex justify-between h-fit border">
        {post.tags.map((tag) => {
          return (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          );
        })}
        <a
          target="_blank"
          href={post.slug}
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          Ver mais →
        </a>
      </CardFooter>
    </Card>
  );
}
