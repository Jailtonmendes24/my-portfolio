import { GitRepository } from "@/app/page";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function Project({ repo }: { repo: GitRepository }) {
  const { name, description, html_url } = repo;
  return (
    <Card className="rounded-lg max-h-[250px]">
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription className="text-lg line-clamp-2">
          {description || "Sem descrição"}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <a href={html_url} target="_blank" rel="noopener noreferrer">
          Ver no github →
        </a>
      </CardFooter>
    </Card>
  );
}
