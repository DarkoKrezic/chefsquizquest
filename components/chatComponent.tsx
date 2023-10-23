"use client";
import { useChat, Message } from "ai/react";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
export default function ChatComponent({
  selectedOption,
  handleRestart,
}: {
  selectedOption: string;
  handleRestart: () => void;
}) {
  const [lastScoredMessageId, setLastScoredMessageId] = useState<string | null>(
    null
  );
  const scoreUpdateSoundRef = useRef<HTMLAudioElement>(null);
  const [points, setPoints] = useState(0);
  const [isScoreUpdated, setIsScoreUpdated] = useState(false);
  const [restart, setRestart] = useState(false);
  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat({
      initialMessages: [
        {
          role: "assistant",
          id: "1",
          content: ` Das Thema ist: ${selectedOption}. Du bekommst 10 Fragen und für jede richtige Antwort bekommst Du 10 Punkte. Du kast ebenfalls ein ganz besonderes Thema in diesem Gebiet als Quiz-Thema aussuchen und es mir einfach schreiben. Bist Du bereit?`,
        },
      ],
    });
  const backgroundImage = `url(/${selectedOption}.jpeg)`;
  const triggerWord = "Quizzkolicious!";
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);
  useEffect(() => {
    // Get the last message from the assistant
    const lastMessage = messages[messages.length - 1];

    if (
      lastMessage &&
      lastMessage.role === "assistant" &&
      lastMessage.content.includes(triggerWord) &&
      lastMessage.id !== lastScoredMessageId
    ) {
      // Increase the points by 10
      setPoints((prevPoints) => prevPoints + 10);
      setLastScoredMessageId(lastMessage.id);
      setIsScoreUpdated(true);
      // Play the sound
      if (scoreUpdateSoundRef.current) {
        scoreUpdateSoundRef.current.play();
      }

      setTimeout(() => {
        setIsScoreUpdated(false);
      }, 500);
    }
  }, [messages, lastScoredMessageId]); // Add messages to the dependencies array
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-10"
      style={{
        backgroundImage,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <section className="flex flex-col">
        <div
          style={{
            maxHeight: "50vh",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.764)",
            borderRadius: "5px",
            boxShadow: "3px 5px 10px rgb(8, 8, 9)",
          }}
          className="flex-grow mb-auto w-full overflow-auto"
        >
          <span
            className={`absolute top-0 right-0 px-4 py-2 mt-2 mr-2 rounded-md bg-white opacity-60 text-black shadow-2xl ${
              isScoreUpdated ? "score-updated" : ""
            }`}
          >
            Punkte: {points}
          </span>
          {isScoreUpdated && (
            <audio
              ref={scoreUpdateSoundRef}
              src="/scoreUpdateSound.mp3"
              autoPlay={true}
            />
          )}
          {messages.map((message: Message) => {
            return (
              <div key={message.id}>
                {message.role === "assistant" ? (
                  <h3
                    className="text-lg px-2 font-semibold mt-2 text-gray-400"
                    style={{
                      textShadow: "1px 1px 3px rgba(0, 0, 0, 0.879)",
                    }}
                  >
                    Quizzko:
                  </h3>
                ) : (
                  <h3
                    className="text-lg font-semibold mt-2 px-2 text-gray-400"
                    style={{
                      textShadow: "1px 1px 3px rgba(0, 0, 0, 0.879)",
                    }}
                  >
                    Du:
                  </h3>
                )}

                {message.content
                  .split("\n")
                  .map((currentTextBlock: string, index: number) => {
                    if (currentTextBlock === "") {
                      return (
                        <p className="px-2" key={message.id + index}>
                          &nbsp;
                        </p>
                      );
                    } else {
                      return (
                        <p className="px-2" key={message.id + index}>
                          {currentTextBlock}
                        </p>
                      );
                    }
                  })}

                {}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <form
          className="relative flex flex-col items-center w-full"
          onSubmit={handleSubmit}
        >
          <p
            className="text-center font-semibold mt-2"
            style={{
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.724)",
              borderRadius: "5px",
              boxShadow: "3px 5px 10px rgb(8, 8, 9)",
            }}
          >
            Deine Antwort ⬇️ :
          </p>
          <div className="text-4xl mt-2 gap-4 flex ">
            <button
              className="m-2 p-2 rounded-lg border-2 border-black-400"
              style={{
                backgroundColor: "rgba(97, 176, 246, 0.735)",
                textShadow: "3px 5px 10px rgb(8, 8, 9)",
                boxShadow: "3px 5px 15px rgb(8, 8, 9)",
              }}
              onClick={() =>
                handleInputChange({
                  target: { value: "A)" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            >
              A
            </button>
            <button
              className="m-2 p-2 rounded-lg border-2 border-black-400"
              style={{
                backgroundColor: "rgba(97, 176, 246, 0.735)",
                textShadow: "3px 5px 10px rgb(8, 8, 9)",
                boxShadow: "3px 5px 15px rgb(8, 8, 9)",
              }}
              onClick={() =>
                handleInputChange({
                  target: { value: "B)" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            >
              B
            </button>
            <button
              className="m-2 p-2 rounded-lg border-2 border-black-400"
              style={{
                backgroundColor: "rgba(97, 176, 246, 0.735)",
                textShadow: "3px 5px 10px rgb(8, 8, 9)",
                boxShadow: "3px 5px 15px rgb(8, 8, 9)",
              }}
              onClick={() =>
                handleInputChange({
                  target: { value: "C)" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            >
              C
            </button>
            <button
              className="m-2 p-2 rounded-lg border-2 border-black-400"
              style={{
                backgroundColor: "rgba(97, 176, 246, 0.735)",
                textShadow: "3px 5px 10px rgb(8, 8, 9)",
                boxShadow: "3px 5px 15px rgb(8, 8, 9)",
              }}
              onClick={() =>
                handleInputChange({
                  target: { value: "D)" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            >
              D
            </button>
          </div>
          <textarea
            className=" relative mt-2 w-full p-2"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.762)",
              borderRadius: "5px",
              boxShadow: "3px 5px 10px rgb(8, 8, 9)",
            }}
            placeholder={"Los gehts!"}
            value={input}
            required
            onChange={handleInputChange}
          />
          <button
            className="absolute bottom-14 right-0 mb-2 mr-2 rounded-md  px-3"
            style={{
              backgroundColor: "rgba(125, 223, 243, 0.741)",
              boxShadow: "3px 5px 10px rgb(8, 8, 9)",
            }}
          >
            <Image
              src="/icons8-paper-plane-64.png"
              alt="Send"
              width={32}
              height={32}
            />
          </button>
          <button
            type="button"
            onClick={handleRestart}
            style={{
              marginTop: "20px",
              boxShadow: "3px 5px 10px rgb(8, 8, 9)",
            }} // Add some space from the previous button
            className=" rounded-md bg-blue-600 p-2  mt-2 "
          >
            🔄 Neue Runde Starten
          </button>
        </form>
      </section>
    </main>
  );
}
