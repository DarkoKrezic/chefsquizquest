"use client";
import { useChat, Message } from "ai/react";
import { useRef, useEffect } from "react";

export default function ChatComponent({
  selectedOption,
}: {
  selectedOption: string;
}) {
  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat({
      initialMessages: [
        {
          role: "assistant",
          id: "1",
          content: ` Das Thema ist: ${selectedOption}. Bist Du bereit?`,
        },
      ],
    });
  const backgroundImage = `url(/${selectedOption}.jpeg)`;

  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

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
      <div className="flex flex-col">
        <div
          style={{
            maxHeight: "570px",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.764)",
            borderRadius: "5px",
            boxShadow: "3px 5px 10px rgb(8, 8, 9)",
          }}
          className="flex-grow mb-auto w-full overflow-auto"
        >
          {messages.map((message: Message) => {
            return (
              <div key={message.id}>
                {message.role === "assistant" ? (
                  <h3 className="text-lg px-2 font-semibold mt-2 text-gray-400">
                    QuizzMaster:
                  </h3>
                ) : (
                  <h3
                    className="text-lg font-semibold mt-2 px-2"
                    style={{ color: "gray" }}
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
          <div ref={messagesEndRef} />{" "}
        </div>

        <form
          className="flex flex-col items-center w-full"
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
          <textarea
            className="mt-2 w-full p-2"
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
            className=" rounded-md bg-blue-600 p-2  mt-2 "
            style={{ boxShadow: "3px 5px 10px rgb(8, 8, 9)" }}
          >
            Abschicken
          </button>
        </form>
      </div>
    </main>
  );
}
