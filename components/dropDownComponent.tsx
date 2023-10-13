"use client";
import { useChat, Message, CreateMessage } from "ai/react";

import { useState } from "react";
interface DropdownComponentProps {
  onSetSelected: (value: string) => void;
}
export default function DropdownComponent({
  onSetSelected,
}: DropdownComponentProps) {
  const [selected, setSelected] = useState("");
  const options = [
    "Sport",
    "Musik",
    "Filme",
    "Geschichte",
    "Geographie",
    "Politik",
    "Physik",
  ];

  return (
    <div className="dropdown">
      <select
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          onSetSelected(e.target.value);
        }}
        style={{ color: "black" }}
      >
        <option>Auswählen...</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
