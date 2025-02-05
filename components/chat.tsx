"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Globe, Book } from "lucide-react";

export function Chat() {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [course, setCourse] = useState("");
  const [isWebSearch, setIsWebSearch] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { role: "user", content: input }]);
      setInput("");
      setIsStreaming(true);

      // Simulated streaming response
      const response = `This is a simulated ${
        isWebSearch ? "web search" : "RAG"
      } response to: "${input}"`;
      for (let i = 0; i < response.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        setMessages((prev) => {
          const newMessages = [...prev];
          if (newMessages[newMessages.length - 1].role === "assistant") {
            newMessages[newMessages.length - 1].content += response[i];
          } else {
            newMessages.push({ role: "assistant", content: response[i] });
          }
          return newMessages;
        });
      }

      setIsStreaming(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg m-4">
      <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
        <Select value={course} onValueChange={setCourse}>
          <SelectTrigger className="w-[180px] bg-white text-gray-900">
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Course 1</SelectItem>
            <SelectItem value="2">Course 2</SelectItem>
            <SelectItem value="3">Course 3</SelectItem>
            <SelectItem value="4">Course 4</SelectItem>
          </SelectContent>
        </Select>
        <h2 className="text-xl font-bold">BrainBoost Chat</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsWebSearch(false)}
            className={`rounded-full ${
              !isWebSearch ? "bg-white text-indigo-600" : "text-white"
            }`}
          >
            <Book className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsWebSearch(true)}
            className={`rounded-full ${
              isWebSearch ? "bg-white text-indigo-600" : "text-white"
            }`}
          >
            <Globe className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                message.role === "user"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isStreaming && (
          <div className="text-left">
            <div className="inline-block p-2 rounded-lg bg-gray-200 text-gray-800">
              <span className="animate-pulse">●</span>
              <span className="animate-pulse animation-delay-200">●</span>
              <span className="animate-pulse animation-delay-400">●</span>
            </div>
          </div>
        )}
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask a question using ${
              isWebSearch ? "web search" : "course materials"
            }...`}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-grow mb-5 border border-slate-600"
          />
          <Button
            onClick={handleSend}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
