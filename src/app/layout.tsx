"use client";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    // Function to check authentication status
    const checkAuthStatus = () => {
        const authStatus = localStorage.getItem("isAuthenticated");
        setIsAuthenticated(authStatus === "true");
    };

    useEffect(() => {
        // Check authentication on mount
        checkAuthStatus();

        // Listen for storage changes (for login/logout updates)
        const handleStorageChange = () => checkAuthStatus();
        window.addEventListener("storage", handleStorageChange);

        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("currentUser");

        // Update state and force navbar re-render
        setIsAuthenticated(false);

        // Notify other tabs (optional)
        localStorage.setItem("logout-event", Date.now().toString());

        router.push("/auth/login");
    };

    return (
        <html lang="en">
            <head>
                <title>Google Sheets Clone Layout</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>
                <nav className="p-4 flex justify-between bg-black">
                    <Link href="/" className="font-bold text-lg text-white">Home</Link>
                    <div>
                        {isAuthenticated ? (
                            <button onClick={handleLogout} className="text-red-500">Logout</button>
                        ) : (
                            <>
                                <Link href="/auth/login" className="mr-4 text-blue-500">Login</Link>
                                <Link href="/auth/register" className="text-blue-500">Register</Link>
                            </>
                        )}
                    </div>
                </nav>
                <main>{children}</main>
            </body>
        </html>
    );
}
