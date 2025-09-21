"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function YearPicker() {
  const [open, setOpen] = React.useState(false)
  const [year, setYear] = React.useState<number | undefined>(undefined)

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)

  return (
    <div className="flex flex-col gap-3">
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="year"
            className="w-48 justify-between font-normal"
          >
            {year ?? "Select year"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-2">
          <div className="max-h-60 overflow-y-auto">
            {years.map((y) => (
              <div
                key={y}
                className="cursor-pointer rounded-md px-2 py-1 hover:bg-accent"
                onClick={() => {
                  setYear(y)
                  setOpen(false)
                }}
              >
                {y}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
