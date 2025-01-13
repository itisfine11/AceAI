"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, FileText, Send } from "lucide-react";
import { Quiz } from "@/components/quiz";

function ChatInterface({ context }: { context: string }) {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }]);
      // Simulated response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `This is a simulated response about ${context} to: "${input}"`,
          },
        ]);
      }, 1000);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-[400px]">
      <ScrollArea className="flex-1 p-4 border border-neutral-200 rounded-lg mb-4 dark:border-neutral-800">
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
      </ScrollArea>
      <div className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask about ${context}...`}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function StudyMaterials() {
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  return (
    <Tabs defaultValue="upload" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="upload">File Upload</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="quiz">Quiz</TabsTrigger>
      </TabsList>
      <TabsContent value="upload">
        <Card>
          <CardHeader>
            <CardTitle>Upload Study Materials</CardTitle>
            <CardDescription>
              Upload PDFs, documents, or images related to your course.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
              <Label htmlFor="file-upload">File</Label>
              <Input id="file-upload" type="file" onChange={handleFileUpload} />
            </div>
            {file && (
              <p className="mt-2 text-sm text-gray-500 mb-4">
                Selected file: {file.name}
              </p>
            )}
            <Button className="mb-4">
              <Upload className="mr-2 h-4 w-4" /> Upload File
            </Button>
            <ChatInterface context="uploaded files" />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notes">
        <Card>
          <CardHeader>
            <CardTitle>Study Notes</CardTitle>
            <CardDescription>
              Create and manage your study notes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Type your notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[200px] mb-4"
            />
            <Button className="mb-4">
              <FileText className="mr-2 h-4 w-4" /> Save Notes
            </Button>
            <ChatInterface context="your notes" />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="quiz">
        <Quiz />
      </TabsContent>
    </Tabs>
  );
}
