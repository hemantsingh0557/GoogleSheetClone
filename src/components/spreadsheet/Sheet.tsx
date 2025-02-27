"use client";

"use client";

import Cell from "./Cell";

interface SheetProps {
    data: string[][];
    setData: (newData: string[][]) => void;
}

export default function Sheet({ data, setData }: SheetProps) {
    const columns = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); // A-Z column headers

    const updateCell = (row: number, col: number, value: string) => {
        const newData = [...data];
        newData[row][col] = value;
        setData(newData);
    };

    return (
        <div className="w-full h-full overflow-hidden">
            {/* Column Headers */}
            <div className="grid" style={{ gridTemplateColumns: "50px repeat(26, 100px)" }}>
                <div className="w-12 h-10 flex items-center justify-center font-bold text-gray-700 bg-gray-200 border-r border-gray-400"></div>
                {columns.map((col, index) => (
                    <div key={index} className="h-10 flex items-center justify-center font-bold border-r border-gray-400 bg-gray-200 text-gray-700">
                        {col}
                    </div>
                ))}
            </div>

            {/* Rows & Cells */}
            <div className="max-h-[75vh] overflow-auto">
                {data.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid" style={{ gridTemplateColumns: "50px repeat(26, 100px)" }}>
                        {/* Row Header */}
                        <div className="w-12 h-10 flex items-center justify-center font-bold border-r border-gray-400 bg-gray-200 text-gray-700">
                            {rowIndex + 1}
                        </div>
                        {/* Cells */}
                        {row.map((cell, colIndex) => (
                            <Cell key={`${rowIndex}-${colIndex}`} value={cell} onChange={(value) => updateCell(rowIndex, colIndex, value)} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}