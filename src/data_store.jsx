import { createContext, useState } from "react";

 const DataStoreContext = createContext();

export function DataStoreProvider({ children }) {
  const [signup_user, setSignup_user] = useState("");
  const [log_user, setLog_user] = useState("");
  const [user, setUser] = useState(null);

  function signupUser(name, email, password) {
    setTimeout(() => {
      setUser({ name, email ,password });
      setSignup_user("Signup successful. You can now login.");
    }, 600);
  }

  function loginUser(email, password) {
    setTimeout(() => {
      if (email && password) {
        setUser({ name: "User", email });
        setLog_user("Login successful.");
      } else {
        setLog_user("Invalid credentials.");
      }
    }, 400);
  }

  return (
    <DataStoreContext.Provider
      value={{
        signupUser,
        signup_user,
        setSignup_user,
        loginUser,
        log_user,
        setLog_user,
        user,
        setUser
      }}
    >
      {children}
    </DataStoreContext.Provider>
  );
}
export { DataStoreContext }