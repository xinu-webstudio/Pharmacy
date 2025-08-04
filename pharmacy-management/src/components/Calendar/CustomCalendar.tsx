"use client"

import { Calendar, dateFnsLocalizer, Components } from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
import { enUS } from "date-fns/locale"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useState } from "react"
import "./calendar-css.css"
import { Icon } from "@iconify/react/dist/iconify.js"

interface EventPropType {
  title: string
  start: Date
  end: Date
  type: string
}

interface CalendarProps {
  events: EventPropType[]
  initialDate?: Date
}

const locales = { "en-US": enUS }

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

// Custom toolbar component
const CustomToolbar = (toolbar: any) => {
  const goToBack = () => {
    toolbar.onNavigate("PREV")
  }

  const goToNext = () => {
      toolbar.onNavigate("NEXT")
    }
    
    const goToday = () => {
        toolbar.onNavigate("TODAY")
    }

  const label = () => {
    const date = toolbar.date
    return <span className="text-xl font-medium text-teal-600">{format(date, "MMMM yyyy").toUpperCase()}</span>
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex-1"></div>
      <div className="flex-1 text-center">{label()}</div>
      <div className="flex-1 flex justify-end gap-2">
              <button onClick={goToBack} className="p-2 w-10 h-10 rounded-full bg-teal-500 text-white hover:bg-teal-600 flex place-items-center justify-center">
                  <Icon icon="icon-park-outline:left" fontSize={20}  />
              </button>
              
                            <button onClick={goToday} className="p-2 rounded-full  text-black ">
                  Today
        </button>
              <button onClick={goToNext} className="p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600 w-10 h-10 flex place-items-center justify-center">
                  <Icon icon="icon-park-outline:right" fontSize={20}/>
                  
        </button>
      </div>
    </div>
  )
}

// Custom event component
const CustomEvent = ({ event }: { event: EventPropType }) => {
  let bgColor = "bg-blue-100 text-blue-600 "

  if (event.type === "Day Shift") {
    bgColor = "bg-orange-100 text-orange-600 "
  } else if (event.type === "Night Shift") {
    bgColor = "bg-red-100 text-red-600 "
  } else if (event.type === "Evening Shift") {
    bgColor = "bg-blue-100 text-blue-600"
  }

  return (
    <div className={`text-xs px-2 py-1 rounded  ${bgColor} mt-1`}>
      {event.type}
    </div>
  )
}

// Custom day cell component
const CustomDayCell = (props: any) => {
  const { date, isHighlighted } = props
  const day = format(date, "d")

  return (
    <div className={`h-full w-full ${isHighlighted ? "bg-teal-500" : ""}`}>
      <div className={`text-lg font-medium ${isHighlighted ? "text-white" : ""}`}>
        {day}
      </div>
    </div>
  )
}

// Main Calendar Component
export const CustomCalendar = ({ events, initialDate = new Date() }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(initialDate)
  
  // Transform events to include type if not already present
  const transformedEvents = events.map((event) => ({
    ...event,
    type: event.type || event.title, // Use type if available, otherwise use title
  }))

  // Custom components for react-big-calendar
  const components: Components<EventPropType, object> = {
    toolbar: CustomToolbar,
    event: CustomEvent,
    month: {
      dateHeader: (props) => {
        const isHighlighted = format(props.date, "yyyy-MM-dd") === "2025-10-02"
        return <CustomDayCell date={props.date} isHighlighted={isHighlighted} />
      },
    },
  }

  // Custom styles for events
  const eventPropGetter = (event: EventPropType) => {
    return {
      style: {
            backgroundColor: event?.title?.toLowerCase().includes('evening') ? "#E6F3FF" :
                event?.title?.toLowerCase().includes('night')?"#FFECEC":
                "#FFF5E9",
        borderRadius: 0,
        color:event?.title?.toLowerCase()?.includes('evening')? "#0085FF":event?.title?.toLowerCase().includes('night')?"red":"#FF9F2D",
        border: "none",
        boxShadow: "none",
        margin: 0,
        padding: 0,
      },
    }
  }

  // Custom styles for date cells
  const dayPropGetter = (date: Date) => {
    const isHighlighted = format(date, "yyyy-MM-dd") === "2025-10-02"
    return {
      style: {
        backgroundColor: isHighlighted ? "#14b8a6" : "transparent",
        borderRadius: 0,
      },
    }
  }

  const onNavigate = (newDate: Date) => {
    setCurrentDate(newDate)
  }

  return (
    <div className="h-screen p-6">
      <div className="bg-white rounded-lg shadow-lg h-full overflow-hidden">
        <div className="p-4">
          <Calendar
            localizer={localizer}
            events={transformedEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "calc(100vh - 100px)" }}
            views={["month"]}
            defaultView="month"
            date={currentDate}
            onNavigate={onNavigate}
            components={components}
            eventPropGetter={eventPropGetter}
            dayPropGetter={dayPropGetter}
            popup={false}
            showMultiDayTimes={false}
            formats={{
              monthHeaderFormat: (date) => format(date, "MMMM yyyy").toUpperCase(),
              dayHeaderFormat: (date) => format(date, "EEE").toUpperCase(),
              dayFormat: (date) => format(date, "d"),
            }}
          />
        </div>
      </div>
    </div>
  )
}
