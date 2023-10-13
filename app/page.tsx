"use client";
import { useState } from "react";
import DropdownComponent from "@/components/dropDownComponent";
import ChatComponent from "@/components/chatComponent";

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);
  const [topic, setTopic] = useState("");
  const backgroundImage = "url('/kvisko.jpeg')";

  const handleSelected = (value: string) => {
    setSelected(value);
    setTopic(value);
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: backgroundImage,
          backgroundSize: "cover", // make it cover the whole div
          position: "absolute", // make it fill the whole screen
          width: "100%",
          height: "100%",
          zIndex: "-1",
          backgroundPosition: "center",
        }}
      ></div>
      <h2
        className="text-4xl font-bold text-center py-10"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.49)",
          borderRadius: "25px",
          textShadow: "3px 5px 10px rgb(8, 8, 9)",
        }}
      >
        Hi, ich bin Quizzko!
      </h2>
      <p
        className="text-center text-2xl px-2 py-4"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.49)",
          borderRadius: "25px",
        }}
      >
        Bitte wähle ein Themengebiet aus der Liste:
      </p>

      <DropdownComponent onSetSelected={handleSelected} />
      {selected && <ChatComponent selectedOption={selected} />}
    </div>
  );
}
