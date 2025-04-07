import React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "./separator";
import { SidebarTrigger } from "./sidebar";

export function Page({ children }: React.PropsWithChildren) {
  return <div className="h-full flex flex-col">{children}</div>;
}

export function PageHeader({ children }: React.PropsWithChildren) {
  return (
    <div className="mx-2">
      <h1 className="text-3xl font-semibold p-2">
        <SidebarTrigger className="cursor-pointer mr-2 md:hidden" />
        {children}
      </h1>
      <Separator />
    </div>
  );
}

type Props = React.PropsWithChildren<{
  centered?: boolean;
}>;

export function PageContent({ centered = false, children }: Props) {
  return (
    <div
      className={cn(
        "flex-1 flex flex-col m-4",
        centered && "items-center justify-center"
      )}
    >
      {children}
    </div>
  );
}
