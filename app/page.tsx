"use client";

import { useState } from "react";
import { generateTextAction } from "@/app/actions/aiAction";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const handleSendPrompt = async () => {
    try {
      const response = await generateTextAction(prompt);
      setOutput(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="flex w-screen h-screen flex-col items-center justify-between p-24">
      
      {output && (
        <div className="w-full max-w-3xl p-6 bg-white border border-gray-300 rounded-lg shadow-md">
          <h1 className="text-xl font-bold mb-2 text-gray-900">
            AI Response
          </h1>

          <p className="text-gray-800">
            <ReactMarkdown>{output}</ReactMarkdown> 
          </p>
        </div>
      )}

      <div className="input-area fixed bottom-6 px-24 py-2 flex items-center justify-between w-full bg-white border border-gray-300 rounded-lg shadow-md">
        
        <input
          className="border border-gray-400 bg-gray-100 text-gray-900 placeholder-gray-500 p-2 rounded-md w-[80%] outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-400"
          placeholder="Type your message here...."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          onClick={handleSendPrompt}
          className="bg-neutral-700 text-white p-2 rounded-md ml-4 w-[18%]"
        >
          Send
        </button>

      </div>
    </main>
  );
}