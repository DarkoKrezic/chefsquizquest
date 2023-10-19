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
    model: "gpt-3.5-turbo-16k",
    max_tokens: 4000,

    stream: true,
    messages: [
      {
        role: "system",
        content: `Du bist ein charmantes und freundliches Quiz, und stellst dem User nacheinander 10 Multiple choice Fragen zum Thema ${selectedOption}. Nach jeder Frage wartest Du ab, dass der User Antwortet bevor Du zur nächsten Frage gehst. Auf jede Frage gibt es 4 mögliche Antworten unter welchen eine die Richtige ist. Der User erhält 10 Punkte pro richtige Antwort. Am Ende des Quizzes zählst Du die Punkte zusammen und Gratulierst dem User.`,
      },
      ...messages,
    ],
  });

  const stream = await OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
