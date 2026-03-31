export default function TodoForm({
  title,
  label,
  editData,
  handleEditChange,
  handleUpdate,
  setModalOpen,
}) {
  return (
    <div>
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="px-8 pt-8 pb-5">
          <h2 className="text-[1.35rem] font-bold text-[#111827] tracking-tight">
            {title || "Title"}
          </h2>
          <p className="text-sm text-[#6b7280] mt-1">{label || ""}</p>
        </div>

        <div className="h-px bg-[#f0f1f5] mx-8" />

        <div className="px-8 py-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#374151] mb-1.5">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={(e) => handleEditChange("title", e.target.value)}
              placeholder="Enter todo title"
              className="w-full px-4 py-2.5 text-sm text-[#111827] placeholder-[#9ca3af] bg-white border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111827]/10 focus:border-[#111827] transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#374151] mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={editData.description}
              onChange={(e) => handleEditChange("description", e.target.value)}
              placeholder="Add a short description…"
              rows={3}
              className="w-full px-4 py-2.5 text-sm text-[#111827] placeholder-[#9ca3af] bg-white border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111827]/10 focus:border-[#111827] transition-all resize-none"
            />
          </div>
        </div>

        {/* Footer / Actions */}
        <div className="px-8 pb-8 flex items-center justify-end gap-3">
          <button
            onClick={() => setModalOpen(false)}
            className="px-5 py-2.5 text-sm font-medium text-[#374151] bg-white border border-[#e5e7eb] rounded-lg hover:bg-[#f9fafb] active:bg-[#f3f4f6] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-[#111827] rounded-lg hover:bg-[#1f2937] active:bg-[#374151] transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
