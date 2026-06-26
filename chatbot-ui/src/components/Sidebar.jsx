import { useState } from "react";

export default function Sidebar({
  conversations,
  activeConvId,
  onSelect,
  onNew,
  onDelete,
  onRename,
  onExport,
  onImport,
  onSettings,
  isOpen,
  onClose,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const importRef = useState(null)[1];
  const importInputRef = useState(null);

  function formatDate(ts) {
    const d = new Date(ts);
    const now = new Date();
    const diff = now - d;
    if (diff < 86400000 && d.getDate() === now.getDate()) return "Hari ini";
    if (diff < 172800000 && d.getDate() === now.getDate() - 1) return "Kemarin";
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  }

  function startRename(conv) {
    setEditingId(conv.id);
    setEditTitle(conv.title);
  }

  function submitRename(id) {
    onRename(id, editTitle.trim() || "Percakapan baru");
    setEditingId(null);
  }

  const filtered = conversations.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleExport() {
    onExport?.();
  }

  function handleImport(file) {
    onImport?.(file);
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-[260px] bg-stone-900/95 backdrop-blur-sm border-r border-stone-800 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 px-4 h-14 border-b border-stone-800 shrink-0">
          <button
            onClick={onClose}
            className="lg:hidden text-stone-500 hover:text-stone-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <img src="/logo.png" alt="Coders Minix" className="w-6 h-6 rounded-full shrink-0" />
            <span className="text-sm font-medium text-stone-200 truncate">Coders Minix</span>
          </div>
        </div>

        <div className="px-3 pt-3">
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              className="w-full bg-stone-800 text-stone-300 text-[13px] pl-8 pr-3 py-1.5 rounded-lg outline-none placeholder:text-stone-600 border border-stone-700 focus:border-stone-500 transition-colors"
              placeholder="Cari percakapan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={onNew}
          className="mx-3 mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Percakapan baru
        </button>

        <div className="flex-1 overflow-y-auto mt-2 px-2 space-y-0.5">
          {filtered.length === 0 && (
            <p className="text-xs text-stone-600 text-center px-3 py-8">
              {searchTerm ? "Tidak ditemukan" : "Belum ada percakapan"}
            </p>
          )}

          {filtered.map((conv) => (
            <div
              key={conv.id}
              onClick={() => { onSelect(conv.id); }}
              className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                conv.id === activeConvId
                  ? "bg-stone-800/80 text-stone-200"
                  : "text-stone-400 hover:bg-stone-800/50 hover:text-stone-300"
              }`}
            >
              <div className="flex-1 min-w-0">
                {editingId === conv.id ? (
                  <input
                    className="w-full bg-stone-700 text-sm text-stone-200 px-1.5 py-0.5 rounded outline-none border border-stone-600"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") submitRename(conv.id);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    onBlur={() => submitRename(conv.id)}
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <>
                    <p className="text-sm truncate">{conv.title}</p>
                    <p className="text-[11px] text-stone-600">{formatDate(conv.updatedAt)}</p>
                  </>
                )}
              </div>

              <div className="hidden group-hover:flex items-center gap-0.5 shrink-0">
                <button
                  onClick={(e) => { e.stopPropagation(); startRename(conv); }}
                  className="p-1 rounded text-stone-500 hover:text-stone-300 hover:bg-stone-700 transition-colors"
                  title="Ubah nama"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(conv.id); }}
                  className="p-1 rounded text-stone-500 hover:text-red-400 hover:bg-stone-700 transition-colors"
                  title="Hapus"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="shrink-0 border-t border-stone-800 p-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={handleExport}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-300 hover:bg-stone-800 transition-colors"
              title="Export chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </button>
            <button
              onClick={() => document.getElementById("import-file-input")?.click()}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-300 hover:bg-stone-800 transition-colors"
              title="Import chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </button>
            <input
              id="import-file-input"
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImport(file);
                e.target.value = "";
              }}
            />
          </div>
          <button
            onClick={onSettings}
            className="p-2 rounded-lg text-stone-500 hover:text-stone-300 hover:bg-stone-800 transition-colors"
            title="Pengaturan"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
        </div>
      </aside>
    </>
  );
}
