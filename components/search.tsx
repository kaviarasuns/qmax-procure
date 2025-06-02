"use client";

import { useState } from "react";
import { SearchIcon } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function Search() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <SearchIcon className="mr-2 h-4 w-4" />
        Search components...
        <kbd className="ml-2 pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search components..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Components">
            <CommandItem>10K Resistor - 1/4W</CommandItem>
            <CommandItem>1uF Ceramic Capacitor</CommandItem>
            <CommandItem>2N2222 Transistor</CommandItem>
            <CommandItem>IRF540N MOSFET</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Categories">
            <CommandItem>Resistors</CommandItem>
            <CommandItem>Capacitors</CommandItem>
            <CommandItem>Transistors</CommandItem>
            <CommandItem>MOSFETs</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
