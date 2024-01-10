import { Github } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <div className="text-lg text-center relative isolate px-6 py-24 lg:px-8">
      <div className="flex justify-center">
        <p className="font-medium text-sm flex items-center gap-x-4">
          Give it a ⭐ on
          <Button size={"icon"}>
            <a href="https://github.com/sohomofficial/image-searcher">
              <Github />
            </a>
          </Button>
        </p>
      </div>
      <p className="mt-3 font-medium text-sm">
        Created with ❤️ by{" "}
        <span className="font-bold">
          <a href="https://github.com/sohomofficial">Sohom Mondal</a>
        </span>
        .
      </p>
    </div>
  );
}
