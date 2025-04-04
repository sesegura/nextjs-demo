import { Lightbulb } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface Props {
  promptIdea?: string;
}

export function ImageGenerationForm(props: Props) {
  const { promptIdea } = props;

  return (
    <form>
      <Textarea
        autoFocus
        className="min-h-0 border-0 md:text-md shadow-none resize-none outline-none focus-visible:outline-none focus-visible:shadow-none focus-visible:ring-transparent"
        placeholder="Start prompting..."
        rows={1}
      />

      {promptIdea && (
        <>
          <Separator className="my-2" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="px-0 cursor-pointer text-sm text-muted-foreground font-extralight whitespace-normal text-left"
                  type="button"
                  variant="link"
                >
                  <Lightbulb /> {promptIdea}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Use this prompt for inspiration</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      )}
    </form>
  );
}
