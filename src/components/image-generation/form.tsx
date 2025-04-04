"use client";

import { useRef, useState } from "react";
import { Lightbulb } from "lucide-react";
import { Button } from "../ui/button";
import { PromptInput } from "./prompt-input";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export interface Props {
  formAction: (payload: FormData) => void;
  promptIdea?: string;
}

export function ImageGenerationForm({ formAction, promptIdea }: Props) {
  const [prompt, setPrompt] = useState("");

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const onInspirationClicked = () => {
    setPrompt(promptIdea || "");
    inputRef.current?.focus();
  };

  return (
    <form action={formAction}>
      <PromptInput
        ref={inputRef}
        name="prompt"
        onChange={onChange}
        placeholder="Start prompting..."
        rows={1}
        value={prompt}
      />

      {promptIdea && (
        <>
          <Separator className="my-2" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="px-0 cursor-pointer text-sm text-muted-foreground font-extralight whitespace-normal text-left h-auto"
                  onClick={onInspirationClicked}
                  type="button"
                  variant="link"
                >
                  <Lightbulb /> {promptIdea}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Use this prompt as inspiration</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      )}
    </form>
  );
}
