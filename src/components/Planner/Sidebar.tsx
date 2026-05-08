"use client";
import React from "react";
import { Square, Bed } from "lucide-react";

// Określamy, jakich propsów oczekuje ten komponent
interface SidebarProps {
  onAddElement: (type: string, color: string) => void;
}

export default function Sidebar({ onAddElement }: SidebarProps) {
  return (
    <div className="z-10 flex w-64 flex-col gap-4 bg-white p-4 shadow-lg">
      <h2 className="mb-4 text-lg font-bold">Biblioteka 2D</h2>

      <button
        onClick={() => onAddElement("Szafa", "#3b82f6")}
        className="flex items-center gap-2 rounded border p-2 transition-colors hover:bg-blue-50"
      >
        <Square size={20} /> Dodaj Szafę
      </button>

      <button
        onClick={() => onAddElement("Łóżko", "#ef4444")}
        className="flex items-center gap-2 rounded border p-2 transition-colors hover:bg-red-50"
      >
        <Bed size={20} /> Dodaj Łóżko
      </button>
    </div>
  );
}
