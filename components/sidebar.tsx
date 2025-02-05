import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircle,
  FolderOpen,
  BookOpen,
  History,
  Settings,
} from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <h1 className="text-2xl font-bold text-indigo-600">ACE AI</h1>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <nav className="space-y-2 p-4">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start">
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat Assistant
            </Button>
          </Link>
          <Link href="/study-materials">
            <Button variant="ghost" className="w-full justify-start">
              <FolderOpen className="mr-2 h-4 w-4" />
              Study Materials
            </Button>
          </Link>
          <Link href="/upload">
            <Button variant="ghost" className="w-full justify-start">
              <BookOpen className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </Link>
          <Link href="/chat-history">
            <Button variant="ghost" className="w-full justify-start">
              <History className="mr-2 h-4 w-4" />
              Chat History
            </Button>
          </Link>
        </nav>
      </ScrollArea>
      <div className="p-4 border-t border-gray-200">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
}
