"use client";
import { useState } from "react";
import DropdownComponent from "@/components/dropDownComponent";
import ChatComponent from "@/components/chatComponent";
import Image from "next/image";

export default function Home() {
  const [page, setPage] = useState<string | null>("home");
  const [selected, setSelected] = useState<string | null>(null);
  const [customSubject, setCustomSubject] = useState("");
  const backgroundImage = "url('/kviskhoch.jpeg')";

  const handleSelected = (value: string) => {
    setSelected(value);
    setPage("chat");
  };
  const handleRestart = () => {
    setSelected(null);
    setPage("home");
  };
  const handleCustomSubmit = () => {
    setSelected(customSubject);
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
            className="text-6xl font-bold text-center py-6"
            style={{
              // backgroundColor: "rgba(0, 0, 0, 0.49)",
              textShadow: "3px 5px 10px rgb(8, 8, 9)",
            }}
          >
            Hi, ich bin Quizzko!
          </h2>
          <p
            className="text-center text-2xl px-2 py-4"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.221)",
              textShadow: "3px 5px 10px rgb(8, 8, 9)",
            }}
          >
            Bitte wähle ein Themengebiet aus der Liste:
          </p>
          <DropdownComponent onSetSelected={handleSelected} />
          <div className="relative flex flex-col justify-center ">
            <label
              htmlFor="customSubjectInput"
              className=" text-center text-xl px-2 py-4 rounded-lg"
              style={{
                boxShadow: "3px 5px 10px rgb(8, 8, 9)",
                backgroundColor: "rgba(0, 0, 0, 0.223)",
                textShadow: "3px 5px 10px rgb(8, 8, 9)",
              }}
            >
              ...oder Schreib welches Quiz-Thema Du Dir wünscht ⬇️
            </label>
            <input
              id="customSubjectInput"
              type="text"
              placeholder="...Dein eigenes QuizThema..."
              className=" text-center relative rounded-md  p-4 mt-2 text-sm"
              style={{
                boxShadow: "3px 5px 10px rgb(8, 8, 9)",
                backgroundColor: "rgba(0, 0, 0, 0.741)",
              }}
              onChange={(e) => setCustomSubject(e.target.value)}
            />
            <button
              className=" text-3xl absolute bottom-0 right-0 mb-2 mr-2 rounded-md px-3  "
              style={{
                boxShadow: "3px 5px 10px rgb(8, 8, 9)",
                marginTop: "20px",
                backgroundColor: "rgba(125, 223, 243, 0.741)",
              }}
              onClick={handleCustomSubmit}
            >
              <Image
                src="/icons8-paper-plane-64.png"
                alt="Send"
                width={32}
                height={32}
              />
            </button>
          </div>
        </>
      )}
      {page === "chat" && selected && (
        <ChatComponent
          selectedOption={selected === customSubject ? customSubject : selected}
          handleRestart={handleRestart}
        />
      )}
    </div>
  );
}
