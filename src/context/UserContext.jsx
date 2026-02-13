import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { getToken } from "../utils/auth";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = getToken();

                if (!token) {
                    setLoaded(true);
                    return;
                }

                const res = await api.get("/auth/profile");
                setUser(res.data);

            } catch (err) {
                console.warn("User load failed once — stopping retry loop");
            } finally {
                setLoaded(true);
            }
        };

        loadUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, loaded }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
