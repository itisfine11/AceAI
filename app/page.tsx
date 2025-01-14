"use client";
import { Sidebar } from "@/components/sidebar";
import { Chat } from "@/components/chat";
import { useEffect } from "react";

export default function Home() {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL as string;
  console.log(url);
  useEffect(() => {
    const testCORS = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_URL as string,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin" : "*"
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("CORS test successful:", data);
        } else {
          console.error(
            "CORS test failed:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error", error);
      }
    };

    testCORS();
  }, []);
  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <Chat />
      </main>
    </div>
  );
}
