"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Main() {
    const router = useRouter();
    const [sheets, setSheets] = useState([
        { id: "1", name: "Sheet 1", createdAt: "Feb 26, 2025" },
        { id: "2", name: "Sheet 2", createdAt: "Feb 25, 2025" },
    ]);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (isAuthenticated !== "true") {
            router.push("/auth/login");
        }
    }, []);

    const createNewSheet = () => router.push("/sheet/new");
    const openSheet = (id: string) => router.push(`/sheet/${id}`);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-1/4 bg-white shadow-md p-6">
                <button onClick={createNewSheet} className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-left">
                    + Create New Blank Sheet
                </button>
            </aside>
            <main className="flex-1 p-6">
                <h1 className="text-3xl font-bold text-black mb-6">Recent Sheets</h1>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    {sheets.length === 0 ? (
                        <p className="text-gray-600">No sheets available. Create one!</p>
                    ) : (
                        sheets.map(sheet => (
                            <div key={sheet.id} className="p-3 border rounded hover:bg-gray-100 cursor-pointer" onClick={() => openSheet(sheet.id)}>
                                {sheet.name} - Created on {sheet.createdAt}
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
