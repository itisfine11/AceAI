"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";

export function UploadDocument() {
  const [course, setCourse] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !course) {
      setUploadMessage("Please select a course and a file to upload.");
      return;
    }

    setIsProcessing(true);
    setUploadMessage("");

    try {
      // Create a FormData instance and append the file and course name
      const formData = new FormData();
      formData.append("file", file);
      formData.append("index_name", course);

      // Send the form data to your API endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/documents/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error processing file");
      }

      setUploadMessage(data.message);
    } catch (error: any) {
      setUploadMessage(`Error: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-16 h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-800 text-center mb-6">
          Upload Document
        </h2>
        <div className="mb-4">
          <Select value={course} onValueChange={setCourse}>
            <SelectTrigger className="w-full bg-gray-50 border border-gray-300 rounded-md">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="math">Math</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="history">History</SelectItem>
              <SelectItem value="programming">Programming</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <Input
            type="file"
            accept=".pdf,.txt,.docx,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full bg-gray-50 border border-gray-300 rounded-md"
          />
        </div>
        <Button
          onClick={handleUpload}
          className="w-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center"
          disabled={isProcessing}
        >
          <Upload className="h-4 w-4 mr-2" />
          {isProcessing ? "Processing..." : "Upload"}
        </Button>
        {uploadMessage && (
          <div
            className={`mt-4 text-center ${
              uploadMessage.startsWith("Success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {uploadMessage}
          </div>
        )}
      </div>
    </div>
  );
}
