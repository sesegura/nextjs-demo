import React, { forwardRef } from "react";
import { Textarea } from "../ui/textarea";

const PromptInput = forwardRef(
  (
    props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    ref: React.Ref<HTMLTextAreaElement>
  ) => {
    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const isModifierPressed = e.shiftKey || e.ctrlKey || e.metaKey;

      if (e.key === "Enter" && !isModifierPressed) {
        e.preventDefault();
        e.currentTarget.form?.requestSubmit();
      }
    };

    return (
      <Textarea
        {...props}
        autoFocus
        className="min-h-0 border-0 md:text-md shadow-none resize-none outline-none focus-visible:outline-none focus-visible:shadow-none focus-visible:ring-transparent"
        onKeyDown={onKeyDown}
        ref={ref}
      />
    );
  }
);

PromptInput.displayName = "PromptInput";

export { PromptInput };
