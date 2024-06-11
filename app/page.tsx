"use client";

import { useState } from "react";
import { useChat } from "ai/react";

export default function Chat() {

  const { messages, append, isLoading } = useChat();

  const world = [
    { emoji: "👩‍🎤", value: "Modern England" },
    { emoji: "👨‍💼", value: "Goblin Kingdom" },
    { emoji: "🧕", value: "Old Continent" },
  ];
  const character = [
    { emoji: "🤦", value: "Human" },
    { emoji: "🧚", value: "Mage" },
    { emoji: "🤡", value: "Elf" },
  ];
  const vocabulary = [
    { emoji: "🙃", value: "child" },
    { emoji: "🙄", value: "dwarf" },
    { emoji: "🤔", value: "elf" },
    { emoji: "😶", value: "human" },
  ];

  const [state, setState] = useState({
    world: "",
    character: "",
    vocabulary: "",
  }); 
  
  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">RPG Playing App</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Customize the RPG story by selecting the world, character and vocabulary to avoid.
            </p>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">World</h3>

            <div className="flex flex-wrap justify-center">
              {world.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="world"
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Character</h3>

            <div className="flex flex-wrap justify-center">
              {character.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="character"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Vocabulary</h3>

            <div className="flex flex-wrap justify-center">
              {vocabulary.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="vocabulary"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={isLoading || !state.world || !state.vocabulary || !state.character}
            onClick={() =>
              append({
                role: "user",
                content: `Generate a beginning of a Role Playing Game (RPG) places in ${state.world}. The player's character is a ${state.character}, and the words to avoid at all costs are: ${state.vocabulary}.`,
              })
            }
          >
            Generate Joke
          </button>

          <div
            hidden={
              messages.length === 0 ||
              messages[messages.length - 1]?.content.startsWith("Generate")
            }
            className="bg-opacity-25 bg-gray-700 rounded-lg p-4"
          >
            {messages[messages.length - 1]?.content}
          </div>
        </div>
      </div>
    </main>
  );
}