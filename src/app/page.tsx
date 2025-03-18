"use client";

import { useChat } from "ai/react";
import { useEffect, useState } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      setMessages([
        {
          id: "welcome-message",
          role: "assistant",
          content:
            "Hi! I'm your AI shop assistant. I'll help you find the best products and answer your questions. How can I help? 😊",
        },
      ]);
      setInitialized(true);
    }
  }, [initialized, setMessages]);

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto space-y-4">
      <div className="space-y-2 overflow-y-auto max-h-[500px] px-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-3 rounded-lg ${
              m.role === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 text-black self-start"
            }`}
          >
            <span className="font-bold">
              {m.role === "user" ? "User" : "AI"}:
            </span>{" "}
            <span
              dangerouslySetInnerHTML={{
                __html: m.content.replace(
                  /\bhttps?:\/\/[^\s)]+/g,
                  '<a href="$&" class="text-blue-600 underline" target="_blank" rel="noopener noreferrer">$&</a>'
                ),
              }}
            />
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-4 w-full max-w-md px-4"
      >
        <input
          className="w-full p-3 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          placeholder="Type your message..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
