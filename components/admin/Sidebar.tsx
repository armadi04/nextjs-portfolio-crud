"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User,
  Code,
  Briefcase,
  FolderOpen,
  GraduationCap,
  Trophy,
  Mail,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: Code, label: "Skills", href: "/dashboard/skills" },
  { icon: Briefcase, label: "Experience", href: "/dashboard/experience" },
  { icon: FolderOpen, label: "Projects", href: "/dashboard/projects" },
  { icon: GraduationCap, label: "Education", href: "/dashboard/education" },
  { icon: Trophy, label: "Achievements", href: "/dashboard/achievements" },
  { icon: Mail, label: "Contact", href: "/dashboard/contact" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen w-64 bg-card border-r border-border fixed left-0 top-0 hidden md:flex">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold text-gradient">Admin Panel</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
