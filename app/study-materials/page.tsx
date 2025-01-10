import { Sidebar } from "@/components/sidebar";
import { StudyMaterials } from "@/components/study-materials";

export default function StudyMaterialsPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-800">
          Study Materials
        </h1>
        <StudyMaterials />
      </main>
    </div>
  );
}
