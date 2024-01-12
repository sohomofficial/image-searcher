import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  SearchIcon,
  Loader2,
  ChevronRight,
  ChevronLeft,
  ArrowDown,
} from "lucide-react";
import Footer from "./components/Footer";
import { Badge } from "./components/ui/badge";
import { Switch } from "./components/ui/switch";

const formSchema = z.object({
  imageSearch: z.string().min(2).max(50),
});

const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 20;

interface Image {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
  links: {
    download: string;
  };
  color: string;
  height: number;
  width: number;
}

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [contentFilter, setContentFilter] = useState("low");
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageSearch: "",
    },
  });

  const fetchImages = useCallback(async () => {
    try {
      if (userInput) {
        setLoading(true);
        const { data } = await axios.get(
          `${API_URL}?query=${userInput}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${
            import.meta.env.VITE_ACCESS_KEY
          }&content_filter=${contentFilter}`
        );
        setImages(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [contentFilter, page, userInput]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setUserInput(values.imageSearch);
    setPage(1);
    fetchImages();
  }

  return (
    <>
      <div className="px-6 lg:px-8 pt-32 sm:pt-48 lg:pt-56">
        <h1 className="text-4xl text-center font-bold tracking-tight sm:text-5xl">
          Image Searcher
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-6"
          >
            <FormField
              control={form.control}
              name="imageSearch"
              render={({ field }) => (
                <FormItem className="mx-auto max-w-2xl">
                  <FormLabel>Type something to search</FormLabel>
                  <FormControl>
                    <Input type="search" placeholder="A cat" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col justify-center items-center gap-4">
              <Button type="submit">
                Search <SearchIcon className="ml-2 h-4 w-4" />
              </Button>
              <p className="flex items-center gap-x-2 text-sm font-medium">
                <Switch
                  onCheckedChange={(checked) =>
                    setContentFilter(checked ? "high" : "low")
                  }
                />
                <HoverCard>
                  <HoverCardTrigger>Safe Search</HoverCardTrigger>
                  <HoverCardContent>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">Safe Search</h4>
                      <p className="text-sm font-normal">
                        Turn on to further remove content that may be unsuitable
                        for younger audiences. Note that we can&apos;t guarantee
                        that all potentially unsuitable content is removed.
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </p>
            </div>
          </form>
        </Form>
        {loading ? (
          <div className="mt-6 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group relative shadow-2xl rounded-lg"
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden lg:aspect-none group-hover:brightness-75 duration-200 delay-75 lg:h-80">
                    <img
                      src={image.urls.small}
                      alt={image.alt_description}
                      className="h-full w-full object-cover object-center rounded-t-lg lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between p-4">
                    <div>
                      <p>
                        <Badge variant={"outline"}>{image.color}</Badge>
                      </p>
                      <p className="mt-1">
                        <Badge variant={"outline"}>
                          {image.width} x {image.height}
                        </Badge>
                      </p>
                    </div>
                    <Button variant={"outline"} className="z-50" size={"icon"}>
                      <a href={image.links.download}>
                        <ArrowDown />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              {page > 1 && (
                <Button onClick={() => setPage(page - 1)}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              )}
              {page < totalPages && (
                <Button onClick={() => setPage(page + 1)}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
