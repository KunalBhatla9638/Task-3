import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [str, setStr] = useState("");

  return (
    <UserContext.Provider value={{ str, setStr }}>
      {children}
    </UserContext.Provider>
  );
}
