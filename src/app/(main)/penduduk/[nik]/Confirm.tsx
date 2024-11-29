// Confirm.tsx
"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

type ConfirmProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  nik: string;
  nama: string;
};

const Confirm: React.FC<ConfirmProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  nik,
  nama,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-[500px] bg-accent/20 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="bg-white/5 text-white p-4 flex items-center border-b border-white/20 relative">
          <h2 className="text-xl font-bold flex-grow text-center">
            Konfirmasi Penghapusan
          </h2>
        </div>

        <div className="flex justify-center py-6">
          <Icon icon="mdi:alert-circle" className="w-24 h-24 text-red-500" />
        </div>

        <div className="px-6 pb-6 text-center text-white">
          <p className="mb-4">
            Apakah Anda yakin ingin menghapus data penduduk dengan:
          </p>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">NIK:</span>{" "}
              <span className="text-white/80">{nik}</span>
            </p>
            <p>
              <span className="font-semibold">Nama:</span>{" "}
              <span className="text-white/80">{nama}</span>
            </p>
          </div>
        </div>

        <div className="flex justify-center space-x-4 pb-6">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-500/50 hover:bg-red-500/70 text-white rounded-xl transition-all"
          >
            Hapus
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Confirm;
