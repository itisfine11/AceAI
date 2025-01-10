import { Sidebar } from "@/components/sidebar";
import { Chat } from "@/components/chat";

export default function Home() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <Chat />
      </main>
    </div>
  );
}
