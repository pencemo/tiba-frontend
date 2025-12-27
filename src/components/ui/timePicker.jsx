import { format } from "date-fns"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { useState, useEffect } from "react"

export function TimePicker({ className, date, setDate }) {
  // Derive hours, minutes, and period directly from date.from to avoid sync issues
  const getTimeValues = (dateObj) => {
    if (!dateObj) return { hours: "12", minutes: "00", period: "AM" }
    
    let hours12 = dateObj.getHours()
    const period = hours12 >= 12 ? "PM" : "AM"
    
    hours12 = hours12 % 12
    hours12 = hours12 || 12 // Convert 0 to 12 for 12-hour format
    
    return {
      hours: hours12.toString(),
      minutes: dateObj.getMinutes().toString().padStart(2, "0"),
      period
    }
  }

  const { hours, minutes, period } = getTimeValues(date?.from)

  const updateDateTime = (baseDate) => {
    if (!baseDate) return null
    
    const newDate = new Date(baseDate)
    let hourValue = Number.parseInt(hours, 10)

    // Convert 12-hour format to 24-hour format
    if (period === "PM" && hourValue < 12) {
      hourValue += 12
    } else if (period === "AM" && hourValue === 12) {
      hourValue = 0
    }

    newDate.setHours(hourValue)
    newDate.setMinutes(Number.parseInt(minutes, 10))
    return newDate
  }

  const handleTimeChange = (type, value) => {
    // Create new time values based on the change
    const newHours = type === "hours" ? value : hours
    const newMinutes = type === "minutes" ? value : minutes

    // Calculate the new date immediately
    if (date) {
      const newFrom = date.from ? updateDateTime(date.from) : new Date()
      const newTo = date.to ? updateDateTime(date.to) : new Date()
      
      // For immediate update, we need to adjust the date objects first
      let hourValue = Number.parseInt(newHours, 10)
      if (period === "PM" && hourValue < 12) {
        hourValue += 12
      } else if (period === "AM" && hourValue === 12) {
        hourValue = 0
      }

      newFrom.setHours(hourValue)
      newFrom.setMinutes(Number.parseInt(newMinutes, 10))
      newTo.setHours(hourValue)
      newTo.setMinutes(Number.parseInt(newMinutes, 10))

      setDate({
        ...date,
        from: new Date(newFrom),
        to: new Date(newTo)
      })
    }
  }

  const handlePeriodChange = (newPeriod) => {
    if (!date) return
    
    const newFrom = new Date(date.from || new Date())
    const newTo = new Date(date.to || new Date())
    
    let hourValue = Number.parseInt(hours, 10)
    
    // Convert to 24-hour format based on new period
    if (newPeriod === "PM" && hourValue < 12) {
      hourValue += 12
    } else if (newPeriod === "AM" && hourValue === 12) {
      hourValue = 0
    }

    newFrom.setHours(hourValue)
    newFrom.setMinutes(Number.parseInt(minutes, 10))
    newTo.setHours(hourValue)
    newTo.setMinutes(Number.parseInt(minutes, 10))

    setDate({
      ...date,
      from: newFrom,
      to: newTo
    })
  }

  const formatDisplayDate = () => {
    if (!date?.from) return "Pick a time"
    
    try {
      return format(date.from, "hh:mm a")
    } catch (e) {
      console.error("Date formatting error:", e)
      return "Invalid time"
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="time"
            variant={"outline"}
            className={cn("w-full justify-start text-left font-normal", !date?.from && "text-muted-foreground")}
          >
            <Clock className=" h-4 w-4" />
            {formatDisplayDate()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full  p-4" align="center">
          <div className="grid grid-cols-3 gap-2">
            <Select 
              value={hours} 
              onValueChange={(value) => handleTimeChange("hours", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Hour" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                  <SelectItem key={hour} value={hour.toString()}>
                    {hour.toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select 
              value={minutes} 
              onValueChange={(value) => handleTimeChange("minutes", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Min" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                  <SelectItem key={minute} value={minute.toString().padStart(2, "0")}>
                    {minute.toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              variant='outline' 
              onClick={() => handlePeriodChange(period === "AM" ? "PM" : "AM")}
            >
              {period}
            </Button>

            <div className="mt-2 col-span-3 space-y-1">
                  {["24 hrs per day (based on start time).",
                    "3-hr grace period — no extra charge",
                  ].map((text, index) =>{
                    return <p key={index} className="text-xs text-muted-foreground">{text}</p>
                  })
                  }
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}