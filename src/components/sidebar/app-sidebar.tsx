import { BookImage, SquarePen } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Separator } from "../ui/separator";
import Link from "next/link";

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
        <span className="text-3xl">&nbsp;</span>
        <Separator />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {sections.map((section) => (
            <SidebarMenuItem key={section.title}>
              <SidebarMenuButton asChild>
                <Link href={section.url}>
                  <section.icon />
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
