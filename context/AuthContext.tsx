"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export type User = {
    name: string;
    surname: string;
    phoneNumber: string;
    address: string;
    password: string;
    email: string;
    orders: any;
    date: string;
};

interface AuthContextInterface {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<null | AuthContextInterface>(null);

export default function AuthContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        if (localStorage.getItem("userInfo")) {
            (async function () {
                const res = await fetch("/api/girisYap", {
                    method: "POST",
                    body: localStorage.getItem("userInfo"),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await res.json();
                if (res.status === 200) {
                    setUser(data.user);
                }
            })();
        } else {
            if (
                pathName === "/siparisler" ||
                pathName === "/sepetim" ||
                pathName === "/profil"
            ) {
                router.push("/");
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}
