"use client";
import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
                        <Link href="/auth/login" className="mr-4 text-blue-500">Login</Link>
                        <Link href="/auth/register" className="text-blue-500">Register</Link>
                    </div>
                </nav>
                <main>{children}</main>
            </body>
        </html>
    );
}
