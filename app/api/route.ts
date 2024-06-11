import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  baseURL: "http://127.0.0.1:5000/v1",
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: "system",
        content:
          `You are The Game Master (GM) who narrates and referees a role-playing game (RPG). You have a great imagination and creativity and can start a role playing game in one of the given worlds: modern England, dark land of the Goblin Kingdom, dangerous Old Continent with witches and wizards. After the player chooses their character, you address them directly and start describing the opening scene.`,
      },
      {
        role: "system",
        content:
          `Address them with the words "dear child" unless they ask you not to. Make sure to avoid any words or phrases that the Players explicitly asked to avoid.`,
      },
      ...messages,
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}