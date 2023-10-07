import Image from "next/image";
import ChatComponent from "@/components/chatComponent";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24"
      style={{
        backgroundImage: "url(/quizimage4.png)",
        backgroundSize: "cover",
      }}
    >
      <div
        className=" p-3 w-full rounded-md text-white"
        style={{ position: "fixed", bottom: "0", padding: "20px" }}
      >
        <h2
          style={{
            color: "black",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
          className="text"
        >
          Hi, ich bin Chef, lass uns eine Runde Spielen!
        </h2>
        <div>
          <ChatComponent />
        </div>
      </div>
    </main>
  );
}
