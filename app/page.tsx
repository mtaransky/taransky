"use client";

import { useRef } from "react";
import { useChat } from "ai/react";
import Textarea from "react-textarea-autosize";

const examples = [
  "When you tell this story about her, who do you imagine is listening—and what do you hope they’ll think of you?",
  "You say the culture is obsessed with efficiency. What, exactly, do you gain from positioning yourself as inefficient?",
  "You insist that slowness and waste are essential to art — but how do you tell the difference between principled resistance and simply refusing to adapt?",
];

export default function Chat() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, setInput, handleSubmit, isLoading } = useChat({
    onResponse: (response) => {
      if (response.status === 429) {
        window.alert("You have reached your request limit for the day.");
        return;
      }
    },
  });

  const disabled = isLoading || input.length === 0;

  return (
    <main className="min-h-screen bg-white text-black font-serif">
      {/* Header / Title */}
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-3xl tracking-widest">BRIEF INTERVIEWS</h1>
        <p className="mt-6 text-sm max-w-xl mx-auto leading-7">
          A computational imitation of confession, evasion,
          and rhetorical self-exoneration.
        </p>
      </div>

      {/* Transcript */}
      <div className="flex flex-col items-center">
        {messages.length > 0 &&
          messages.map((message, i) => (
            <div
              key={i}
              className="w-full max-w-2xl px-8 py-16 border-b border-black"
            >
              <div className="text-xs tracking-widest mb-8">
                {message.role === "assistant"
                  ? `INTERVIEWER [${i + 1}]`
                  : `SUBJECT [${i + 1}]`}
              </div>

              <div className="text-base leading-8 whitespace-
