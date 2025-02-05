import { Sidebar } from "@/components/sidebar";
import { UploadDocument } from "@/components/UploadDocument";

export default function UploadDocumentPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-800">
          Upload Document
        </h1>
        <UploadDocument />
      </main>
    </div>
  );
}
