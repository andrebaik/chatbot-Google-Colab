import { useState } from "react";

const ACCENT_COLORS = [
  { name: "Orange", value: "#ff8c00" },
  { name: "Biru", value: "#60a5fa" },
  { name: "Hijau", value: "#4ade80" },
  { name: "Ungu", value: "#c084fc" },
  { name: "Merah", value: "#f87171" },
  { name: "Teal", value: "#2dd4bf" },
];

export default function SettingsModal({
  isOpen,
  onClose,
  gridScanEnabled,
  onToggleGridScan,
  accentColor,
  onChangeAccent,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-sm bg-stone-900 border border-stone-800 rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-medium text-stone-200">Pengaturan</h2>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-200">GridScan Background</p>
              <p className="text-[12px] text-stone-500">Animasi 3D grid di latar belakang</p>
            </div>
            <button
              onClick={onToggleGridScan}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                gridScanEnabled ? "bg-orange-600" : "bg-stone-700"
              }`}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  gridScanEnabled ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          <div>
            <p className="text-sm text-stone-200 mb-2.5">Warna Aksen</p>
            <div className="flex gap-2.5">
              {ACCENT_COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => onChangeAccent(c.value)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${
                    accentColor === c.value ? "ring-2 ring-white ring-offset-2 ring-offset-stone-900 scale-110" : ""
                  }`}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                >
                  {accentColor === c.value && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
