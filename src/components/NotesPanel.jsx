export default function NotesPanel() {
  return (
    <div className="mt-10 border-t pt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Notes
      </h2>

      <textarea
        placeholder="Write monthly notes..."
        className="w-full h-40 rounded-2xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
    </div>
  );
}