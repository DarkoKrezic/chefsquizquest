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
    "sport",
    "musik",
    "Filme",
    "Geschichte",
    "geographie",
    "Politik",
    "Physik",
  ];

  return (
    <div
      className="flex items-center justify-center w-fit"
      style={{
        backgroundColor: "rgba(50, 48, 48, 0.352)",
        borderRadius: "20px",
      }}
    >
      <select
        className=" aligh-items-center text-center text-xl"
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
