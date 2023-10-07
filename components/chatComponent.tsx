"use client";
import { useChat, Message } from "ai/react";
import { useRef, useEffect } from "react";
export default function ChatComponent() {
  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  console.log(messages);
  console.log(input);

  return (
    <div className="flex flex-col">
      <div
        style={{
          maxHeight: "370px",
          color: "white",
          backgroundColor: "rgba(50, 48, 48, 0.7)",
        }}
        className="flex-grow mb-auto w-full overflow-auto"
      >
        {messages.map((message: Message) => {
          return (
            <div key={message.id}>
              {message.role === "assistant" ? (
                <h3 className="text-lg font-semibold mt-2">Chef:</h3>
              ) : (
                <h3 className="text-lg font-semibold mt-2">Du:</h3>
              )}

              {message.content
                .split("\n")
                .map((currentTextBlock: string, index: number) => {
                  if (currentTextBlock === "") {
                    return <p key={message.id + index}>&nbsp;</p>;
                  } else {
                    return <p key={message.id + index}>{currentTextBlock}</p>;
                  }
                })}

              {}
            </div>
          );
        })}
        <div ref={messagesEndRef} />{" "}
      </div>

      <form className="w-full" onSubmit={handleSubmit}>
        <p style={{ color: "black" }}>Du:</p>
        <textarea
          className="mt-2 w-full bg-slate-600 p-2"
          placeholder={"Los gehts!"}
          value={input}
          onChange={handleInputChange}
        />
        <button className="rounded-md bg-blue-600 p-2 mt-2">
          Send message
        </button>
      </form>
    </div>
  );
}
