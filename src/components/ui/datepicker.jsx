"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { lazy, Suspense, useEffect } from "react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function DatePicker({filterRef, ...props}) {
  const [date, setDate] = React.useState(filterRef.current.date)
  const handleSelect = (selectedDate) => {
    setDate(selectedDate);
    filterRef.current.date = selectedDate
  }

  return (
    <Popover >
      <PopoverTrigger asChild >
        <Button
          variant={"outline"}
          className={cn(
            "w-[220px] bg-slate-100 justify-start text-left font-semibold rounded-full",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-4 h-6 w-6" />
          <span>{date ? format(date, "dd/MM/yyyy") : <span > Pick a date </span>} </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto bg-white flex-col space-y-2 p-2"
      >

        <Calendar mode="single" selected={date} onSelect={handleSelect}/>
      </PopoverContent>
    </Popover>
  )
}