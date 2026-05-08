"use client";
import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, Text, Group } from "react-konva";
import Sidebar from "./Sidebar"; // Importujemy nowy Sidebar

interface FurnitureItem {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export default function Planner2D() {
  const [furniture, setFurniture] = useState<FurnitureItem[]>([]);

  // Bezpieczne pobieranie rozmiaru okna w Next.js
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  useEffect(() => {
    setStageSize({
      width: window.innerWidth - 256, // Odejmujemy szerokość Sidebara
      height: window.innerHeight,
    });
  }, []);

  // Funkcja, którą przekazujemy do Sidebara
  const handleAddElement = (type: string, color: string) => {
    const newElement: FurnitureItem = {
      id: Math.random().toString(),
      type: type,
      x: 100, // Zmienione na 100, żeby pojawiały się nieco dalej od rogu
      y: 100,
      width: 100,
      height: 100,
      color: color,
    };
    setFurniture([...furniture, newElement]);
  };

  return (
    <div className="flex h-[calc(100vh-100px)] max-w-7xl translate-y-12 bg-gray-100 md:translate-x-42 md:translate-y-14">
      {/* Wstawiamy Sidebar i przekazujemy funkcję przez prop */}
      <Sidebar onAddElement={handleAddElement} />

      {/* OBSZAR PROJEKTOWY */}
      <div className="flex-1 overflow-hidden">
        <Stage width={stageSize.width} height={stageSize.height}>
          <Layer>
            <Text text="Obszar projektowy 2D" x={20} y={20} fill="#ccc" />

            {furniture.map((item) => (
              <Group
                key={item.id}
                x={item.x}
                y={item.y}
                draggable
                onDragEnd={(e) => {
                  const updated = furniture.map((f) =>
                    f.id === item.id
                      ? { ...f, x: e.target.x(), y: e.target.y() }
                      : f,
                  );
                  setFurniture(updated);
                }}
              >
                <Rect
                  width={item.width}
                  height={item.height}
                  fill={item.color}
                  stroke="#1e293b"
                  strokeWidth={2}
                  cornerRadius={4}
                />
                <Text
                  text={item.type}
                  width={item.width}
                  align="center"
                  y={item.height / 2 - 6}
                  fill="white"
                  fontStyle="bold"
                />
              </Group>
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
