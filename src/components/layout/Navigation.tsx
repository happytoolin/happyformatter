import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import * as React from "react";

export function Navigation() {
  return (
    <div className="hidden lg:flex lg:gap-x-4 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-1">
            Formatters <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem asChild>
            <a href="/html">HTML Formatter</a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="/javascript">JavaScript Formatter</a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="/typescript">TypeScript Formatter</a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="/">JSON Formatter</a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="/sql">SQL Formatter</a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="/xml">XML Formatter</a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="/yaml">YAML Formatter</a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-1">
            More Languages <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem asChild>
            <a href="/go">Go Formatter</a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="/dart">Dart Formatter</a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="/lua">Lua Formatter</a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="ghost" asChild>
        <a href="/css">CSS Minifier</a>
      </Button>

      <Button variant="ghost" asChild>
        <a href="#more-tools">More Tools</a>
      </Button>
    </div>
  );
}
