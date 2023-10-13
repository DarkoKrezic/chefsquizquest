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
    "Chemie",
    "Informatik",
    "Javascript",
    "Python",
  ];

  return (
    <div
      className="flex items-center justify-center py-7"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.352)",
        borderRadius: "25px",
      }}
    >
      <select
        className=" text-center text-xl rounded-lg"
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          onSetSelected(e.target.value);
        }}
        style={{
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.573)",
          boxShadow: "0px 0px 15px rgb(224, 224, 237) ",
        }}
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
