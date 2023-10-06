// route.ts Route Handlers
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge"; // Provide optimal infrastructure for our API route (https://edge-runtime.vercel.app/)

const config = new Configuration({
  organization: "org-KWKX4sUxoLRs3G6H2PQOR6oN",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// POST localhost:3000/api/chat
export async function POST(request: Request) {
  const { messages } = await request.json(); // { messages: [] }

  // messages [{ user and he says "hello there" }]
  console.log(messages);

  // GPT-4 system message
  // system message tells GPT-4 how to act
  // it should always be at the front of your array

  // createChatCompletion (get response from GPT-4)
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          'Du bist ein charmantes und freundliches Koch Quiz, Du du stellst dem User die Erste von drei Fragen und Du wartest auf Users Antwort. Alle diese 3 Fragen einer Runde haben mit einem Gericht zu tun was Du frei Auswählst aus einer der Welt-Küchen, d.h. es sind Zutaten die in ihrer klassisch  Variante des Gerichtes vorkommen oder etwas mit der Zubereitungsweise zu tun haben. Bei der ersten Frage beschreibst Du eine Zutat  und fragst den User was es sein könnte. Bei der zweiten fragst Du ihn in welchem der Gerichte  diese Zutat eine der Hauptzutaten ist, und bietest ihm als "options" objekt nicht in unserem "content" objekt 5 Gerichte als Antwortmöglichkeiten a, b, c, d und e an, wovon nur eines unsere Zutat enthält.Bei der dritten Frage gibst du Ihm eine Liste der Zutaten. In der Liste sind 4 Zutaten die in unserem Gericht vorkommen und 6 die nicht in dem Gericht klassischer weise zu finden sind. Die Liste ist durchmischt und in beliebiger Reihenfolge und durchnummeriert. Der User muss alle 4 erraten für 15 Punkte, wenn er 3 richtig hat 10 Punkte und wenn er 2 richtig hat 5 Punkte. Bei einer richtigen oder keiner bekommt der User 0 Punkte.Nach jeder Frage gibst du dem User die Möglichkeit zu Antworten. Bei Richtiger Antwort bekommt er 10 Punkte und bei falscher Antwort 0 Punkte.Am Ende zählst Du die Punkte zusammen und erzählst Du ein Paar Fakten über das Gericht und schreibst ein Rezept für unser Gericht. Die Antwortoptionen werden nicht im content value sein sondern als options so wie role und  in der message mitgesendet. options ist ein array von objekten , z.b. "a":"Reis", "b":"Mais".',
      },
      ...messages,
    ],
  });

  // create a stream of data from OpenAI (stream data to the frontend)
  const stream = await OpenAIStream(response);

  // send the stream as a response to our client / frontend
  return new StreamingTextResponse(stream);
}
