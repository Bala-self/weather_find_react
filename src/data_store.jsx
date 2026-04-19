import { createContext, useState, useContext } from "react";

export const DataStoreContext = createContext();

export function DataStoreProvider({ children }) {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [signupMessage, setSignupMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  function signupUser(name, email, password) {
    return new Promise((resolve) => {
      const exists = registeredUsers.some((u) => u.email === email);
      if (exists) {
        setSignupMessage("An account with this email already exists.");
        return resolve(false);
      }
      setTimeout(() => {
        setRegisteredUsers((prev) => [...prev, { name, email, password }]);
        setSignupMessage("Signup successful. You can now log in.");
        resolve(true);
      }, 600);
    });
  }

  function loginUser(email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const match = registeredUsers.find(
          (u) => u.email === email && u.password === password
        );
        if (match) {
          setUser({ name: match.name, email: match.email });
          setLoginMessage("Login successful.");
          resolve(true);
        } else {
          setLoginMessage("Invalid email or password.");
          resolve(false);
        }
      }, 400);
    });
  }

  function logoutUser() {
    setUser(null);
    setLoginMessage("");
  }

  function clearSignupMessage() {
    setSignupMessage("");
  }

  function clearLoginMessage() {
    setLoginMessage("");
  }

  return (
    <DataStoreContext.Provider
      value={{
        user,
        signupMessage,
        loginMessage,
        signupUser,
        loginUser,
        logoutUser,
        clearSignupMessage,
        clearLoginMessage,
      }}
    >
      {children}
    </DataStoreContext.Provider>
  );
}

// Custom hook for cleaner imports
export function useDataStore() {
  const context = useContext(DataStoreContext);
  if (!context)
    throw new Error("useDataStore must be used within a DataStoreProvider");
  return context;
}