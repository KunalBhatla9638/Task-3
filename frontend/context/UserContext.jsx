import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [str, setStr] = useState("");
  const [filter, setFilter] = useState("");

  return (
    <UserContext.Provider value={{ str, setStr, filter, setFilter }}>
      {children}
    </UserContext.Provider>
  );
}
