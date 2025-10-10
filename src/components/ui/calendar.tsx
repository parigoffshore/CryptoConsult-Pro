"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState<Date | undefined>(
    props.defaultMonth || new Date()
  )

  const handlePrevious = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev || new Date())
      newDate.setMonth(newDate.getMonth() - 1)
      return newDate
    })
  }

  const handleNext = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev || new Date())
      newDate.setMonth(newDate.getMonth() + 1)
      return newDate
    })
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-center mb-4">
        <button
          className={cn(
            buttonVariants({ variant: "outline" }),
            "absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          )}
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-medium">
          {currentMonth?.toLocaleString("default", { month: "long", year: "numeric" })}
        </span>
        <button
          className={cn(
            buttonVariants({ variant: "outline" }),
            "absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          )}
          onClick={handleNext}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center hidden", // Cacher la caption par défaut
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center hidden", // Cacher la nav par défaut
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside:
            "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        month={currentMonth}
        onMonthChange={setCurrentMonth}
        {...props}
      />
    </div>
  )
}

export { Calendar }