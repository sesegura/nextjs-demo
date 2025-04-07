import { BookImage, SquarePen } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "../ui/sidebar";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const sections = [
  {
    title: "Image Generation",
    url: "/",
    icon: SquarePen,
  },
  {
    title: "Gallery",
    url: "/gallery",
    icon: BookImage,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center -ml-[6px]">
          <span className="text-3xl w-0">&nbsp;</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger className="cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>Toggle sidebar</TooltipContent>
          </Tooltip>
        </div>
        <Separator />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {sections.map((section) => (
            <SidebarMenuItem key={section.title}>
              <SidebarMenuButton asChild>
                <Link className="whitespace-nowrap" href={section.url}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <section.icon />
                    </TooltipTrigger>
                    <TooltipContent>{section.title}</TooltipContent>
                  </Tooltip>
                  {section.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
