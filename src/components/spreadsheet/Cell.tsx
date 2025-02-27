"use client";

"use client";

import { useState } from "react";

interface CellProps {
    value: string;
    onChange: (value: string) => void;
}

export default function Cell({ value, onChange }: CellProps) {
    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const handleBlur = () => {
        setEditing(false);
        onChange(inputValue);
    };

    // Update input value when the cell's value changes
    if (value !== inputValue && !editing) {
        setInputValue(value);
    }

    return (
        <div
            className="w-[100px] h-10 border border-gray-300 flex items-center justify-center cursor-text bg-white hover:bg-gray-100"
            onClick={() => setEditing(true)}
        >
            {editing ? (
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleBlur();
                        }
                    }}
                    autoFocus
                    className="w-full h-full border-none outline-none text-center bg-white"
                />
            ) : (
                <span className="text-gray-800">{value}</span>
            )}
        </div>
    );
}