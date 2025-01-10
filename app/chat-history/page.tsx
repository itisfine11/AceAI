import { Sidebar } from "@/components/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const chatHistory = [
  { id: 1, title: "Quantum Mechanics Discussion", date: "2023-05-15" },
  { id: 2, title: "Linear Algebra Problem Solving", date: "2023-05-14" },
  { id: 3, title: "History of Ancient Rome", date: "2023-05-13" },
  // Add more chat history items as needed
];

export default function ChatHistoryPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-800">
          Chat History
        </h1>
        <ScrollArea className="h-[calc(100vh-120px)]">
          {chatHistory.map((chat) => (
            <Card
              key={chat.id}
              className="mb-4 hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader>
                <CardTitle>{chat.title}</CardTitle>
                <CardDescription>{chat.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Click to view the full conversation</p>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </main>
    </div>
  );
}
