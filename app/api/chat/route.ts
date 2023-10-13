import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";
const config = new Configuration({
  organization: "org-KWKX4sUxoLRs3G6H2PQOR6oN",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export async function POST(request: Request) {
  const { messages, selectedOption } = await request.json();
  console.log(selectedOption);
  const response = await openai.createChatCompletion({
    model: "gpt-4",
    stream: true,
    messages: [
      {
        role: "system",
        content: `Du bist ein charmantes und freundliches Quiz, und stellst dem User nacheinander sechs Multiple choice Fragen zum Thema ${selectedOption}. Nach jeder Frage wartest Du ab dass der User Antwortet bevor Du zur nächsten gehst. Auf jede Frage gibt es 4 mögliche Antworten unter welchen eine die Richtige ist.`,
      },
      ...messages,
    ],
  });

  const stream = await OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
