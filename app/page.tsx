"use client";
import { useState } from "react";
import DropdownComponent from "@/components/dropDownComponent";
import ChatComponent from "@/components/chatComponent";

export default function Home() {
  const [page, setPage] = useState<string | null>("home");
  const [selected, setSelected] = useState<string | null>(null);

  const backgroundImage = "url('/kvisko.jpeg')";

  const handleSelected = (value: string) => {
    setSelected(value);
    setPage("chat");
  };

  return (
    <div>
      {/* Hier auf der Grundlage der 'page'-Variable zu wechseln. */}
      {page === "home" && (
        <>
          <div
            style={{
              backgroundImage: backgroundImage,
              backgroundSize: "cover",
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: "-1",
              backgroundPosition: "center",
            }}
          ></div>
          <h2
            className="text-6xl font-bold text-center py-10"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.49)",
              textShadow: "3px 5px 10px rgb(8, 8, 9)",
            }}
          >
            Hi, ich bin Quizzko!
          </h2>
          <p
            className="text-center text-2xl px-2 py-4"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.49)",
            }}
          >
            Bitte wähle ein Themengebiet aus der Liste:
          </p>
          <DropdownComponent onSetSelected={handleSelected} />
        </>
      )}
      {page === "chat" && selected && (
        <ChatComponent selectedOption={selected} />
      )}
    </div>
  );
}
