"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Sheet } from "../../../components/spreadsheet";

export default function SheetEditor() {
    const { id } = useParams() as { id: string }; // Ensure id is a string
    const router = useRouter();
    const [sheetData, setSheetData] = useState<string[][] | null>(null); // Start with null to avoid flickering
    const [sheetName, setSheetName] = useState<string>("New Sheet");

    useEffect(() => {
        if (!id) return; // Prevent running on undefined ID

        // Load existing sheet from localStorage
        const savedSheet = localStorage.getItem(`sheet-${id}`);
        
        if (savedSheet) {
            setSheetData(JSON.parse(savedSheet));
            
            // Get sheet name
            const sheets = JSON.parse(localStorage.getItem("sheets") || "[]");
            const currentSheet = sheets.find((s: any) => s.id === id);
            if (currentSheet) {
                setSheetName(currentSheet.name);
            }
        } else {
            // Initialize a new blank sheet (26 columns, 100 rows)
            const newSheet = Array.from({ length: 100 }, () => Array(26).fill(""));
            setSheetData(newSheet);
            localStorage.setItem(`sheet-${id}`, JSON.stringify(newSheet));
        }
    }, [id]);

    // Save sheet data to localStorage whenever it changes
    useEffect(() => {
        if (sheetData && id) {
            localStorage.setItem(`sheet-${id}`, JSON.stringify(sheetData));
        }
    }, [sheetData, id]);

    // Prevent rendering until sheetData is loaded
    if (!sheetData) return <div className="p-4 text-center">Loading...</div>;

    return (
        <div className="w-screen h-screen flex flex-col overflow-hidden">

            <div className="flex justify-between items-center p-4">
                <h1 className="text-2xl font-bold">{sheetName}</h1>
                <button 
                    onClick={() => router.push('/sheetdashboard')}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Back to Dashboard
                </button>
            </div>
            <div className="flex-1 overflow-auto">
                <Sheet data={sheetData} setData={setSheetData} />
            </div>
        </div>
    );
    
}