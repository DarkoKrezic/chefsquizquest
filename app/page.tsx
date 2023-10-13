"use client";
import { useState } from "react";
import DropdownComponent from "@/components/dropDownComponent";
import ChatComponent from "@/components/chatComponent";

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);
  const [topic, setTopic] = useState("");
  const backgroundImage = "url('/quizstarthintergrund.jpeg')";

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
        }}
      ></div>
      <h2
        className="text-4xl font-bold text-center py-10"
        style={{ backgroundColor: "rgba(50, 48, 48, 0.49)" }}
      >
        Willkomen zu unserem Quiz!
      </h2>
      <p
        className=" text-center text-2xl py-10"
        style={{ backgroundColor: "rgba(50, 48, 48, 0.49)" }}
      >
        Bitte wähle ein Themengebiet aus der Liste:
      </p>

      <DropdownComponent onSetSelected={handleSelected} />
      {selected && <ChatComponent selectedOption={selected} />}
    </div>
  );
}
