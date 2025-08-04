import { createContext, useState, ReactNode } from "react";

export interface Event {
  title: string;
  start: Date;
  end: Date;
  description: string;
}

// Define the context's default value type
interface AppContextType {
  event: Event[] | undefined;
  setEvent: React.Dispatch<React.SetStateAction<Event[] | undefined>>;
}

// Create the context with a default value of `null` (you can also provide a default state).
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [event, setEvent] = useState<Event[] | undefined>(undefined);

  return (
    <AppContext.Provider value={{ event, setEvent }}>
      {children}
    </AppContext.Provider>
  );
};
