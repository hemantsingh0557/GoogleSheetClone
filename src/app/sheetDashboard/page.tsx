"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid"; // Generates unique IDs

export default function SheetDashboard() {
    const router = useRouter();
    const [sheets, setSheets] = useState<{ id: string; name: string; createdAt: string }[]>([]);

    // Load sheets from localStorage when the component mounts
    useEffect(() => {
        const savedSheets = localStorage.getItem("sheets");
        if (savedSheets) {
            setSheets(JSON.parse(savedSheets));
        }
    }, []);

    // Create a new sheet with a unique ID
    const createNewSheet = () => {
        const newId = uuidv4(); // Generate unique ID
        const newSheet = {
            id: newId,
            name: `Sheet ${sheets.length + 1}`,
            createdAt: new Date().toLocaleDateString(),
        };

        const updatedSheets = [newSheet, ...sheets];
        setSheets(updatedSheets);
        localStorage.setItem("sheets", JSON.stringify(updatedSheets)); // Save to localStorage
        
        // Create a blank sheet and save it to localStorage
        const blankSheet = Array.from({ length: 100 }, () => Array(26).fill(""));
        localStorage.setItem(`sheet-${newId}`, JSON.stringify(blankSheet));
        
        // Make sure this path matches your file structure - fix the typo in sheetEditor -> sheetEditor
        router.push(`/sheetEditor/${newId}`);
    };

    const openSheet = (id: string) => router.push(`/sheetEditor/${id}`);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-1/4 bg-white shadow-md p-6">
                <button
                    onClick={createNewSheet}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-left"
                >
                    + Create New Blank Sheet
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <h1 className="text-3xl font-bold text-black mb-6">Recent Sheets</h1>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    {sheets.length === 0 ? (
                        <p className="text-gray-600">No sheets available. Create one!</p>
                    ) : (
                        sheets.map((sheet) => (
                            <div
                                key={sheet.id}
                                className="p-3 border rounded hover:bg-gray-100 cursor-pointer mb-2"
                                onClick={() => openSheet(sheet.id)}
                            >
                                {sheet.name} - Created on {sheet.createdAt}
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}