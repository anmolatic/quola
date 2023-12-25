"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useRouter } from "next/router";

type NavItem = {
  name: string;
  link: string;
  icon?: JSX.Element;
};

export type PathOptions = "HOME" | "ABOUT" | "UPLOAD" | "STATUS";

export const Header = ({
  navItems,
  className,
}: {
  navItems: Array<NavItem>;
  className?: string;
}) => {
  const [page, setPage] = useState<PathOptions>("HOME");

  const router = useRouter();

  useEffect(() => {
    const pathObj: Record<string, PathOptions> = {
      "/": "HOME",
      "/about": "ABOUT",
      "/upload": "UPLOAD",
      "/status": "STATUS",
    };

    const path = pathObj[router.pathname];

    if (path) {
      setPage(path);
    }
  }, [router.pathname]);

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-10 z-[5000]  mx-auto flex max-w-fit flex-1 items-center justify-center space-x-4 rounded-full border border-transparent bg-white py-2 pl-8 pr-8  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-white/[0.2] dark:bg-black",
        className,
      )}
    >
      {navItems.map((navItem: NavItem, idx: number) => (
        <Link
          key={`link=${idx}`}
          href={navItem.link}
          className={cn(
            "relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300",
            page === navItem.name && "text-black dark:text-white",
          )}
        >
          <span className="block sm:hidden">{navItem.icon}</span>
          <span className="hidden text-sm sm:block">{navItem.name}</span>
        </Link>
      ))}
    </div>
  );
};
