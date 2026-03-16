import { createContext, useContext } from "react";

type User = {
    role: string;
};

const AuthContext = createContext<{ user: User | null }>({ user: null });

export const useAuth = () => {

    const userString = localStorage.getItem("user");

    let user: User | null = null;
    // console.log("User String from localStorage:", userString);

    if (userString) {
        try {
            user = JSON.parse(userString);
            // console.log("Parsed User:", user);
        } catch {
            user = null;
        }
    }

    return { user };
};

export default AuthContext;