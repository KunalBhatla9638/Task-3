import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [str, setStr] = useState("");
  const [filter, setFilter] = useState("");
  const [allCategory, setAllCategory] = useState([]);

  return (
    <UserContext.Provider
      value={{ str, setStr, filter, setFilter, allCategory, setAllCategory }}
    >
      {children}
    </UserContext.Provider>
  );
}
