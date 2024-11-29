"use client";

import { Penduduk } from "@prisma/client";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { toast } from "sonner";
import { actionDeletePenduduk } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Confirm from "./Confirm"; // Pastikan path ini sesuai

type Params = {
  penduduk: Penduduk;
};

export default function PendudukDetailScreen({ penduduk }: Params) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    setShowConfirmation(false); // Menyembunyikan modal konfirmasi

    try {
      await actionDeletePenduduk(penduduk.nik);
      toast.success("Data penduduk berhasil dihapus", {
        position: "bottom-right",
      });
      router.push("/");
    } catch (error) {
      console.error("Gagal menghapus penduduk:", error);
      toast.error("Gagal menghapus data penduduk", {
        description:
          error instanceof Error ? error.message : "Terjadi kesalahan",
        position: "bottom-right",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowConfirmation(false);
  };

  const ktpDetails = [
    { label: "NIK", value: penduduk.nik },
    { label: "Nama", value: penduduk.nama },
    {
      label: "Tempat, Tanggal Lahir",
      value: `${penduduk.tempat_lahir}, ${formatDate(penduduk.tanggal_lahir)}`,
    },
    {
      label: "Jenis Kelamin",
      value: penduduk.jenis_kelamin === "laki_laki" ? "Laki-laki" : "Perempuan",
    },
    {
      label: "Alamat",
      value: penduduk.alamat,
      longText: true,
    },
    {
      label: "Agama",
      value: penduduk.agama.charAt(0).toUpperCase() + penduduk.agama.slice(1),
    },
    {
      label: "Status Perkawinan",
      value:
        penduduk.status_perkawinan === "menikah" ? "Menikah" : "Belum Menikah",
    },
    { label: "Pekerjaan", value: penduduk.pekerjaan },
    {
      label: "Kewarganegaraan",
      value:
        penduduk.kewarganegaraan === "wni"
          ? "Warga Negara Indonesia"
          : "Warga Negara Asing",
    },
    {
      label: "Golongan Darah",
      value: penduduk.golongan_darah.toUpperCase(),
    },
  ];

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 to-primary/20">
        <motion.div
          className="w-full max-w-[500px] bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white/5 text-white p-4 flex items-center border-b border-white/20 relative">
            <h1 className="text-xl font-bold flex-grow">
              Kartu Tanda Penduduk
            </h1>
            <div className="absolute top-4 right-4 flex space-x-2">
              <Link
                href={`/penduduk/${penduduk.nik}/edit`}
                className="bg-white/10 hover:bg-green-500/20 rounded-full p-1 transition-all"
              >
                <Icon
                  icon="mdi:pencil"
                  className="w-5 h-5 text-white/70 hover:text-green-400"
                />
              </Link>
              <button
                onClick={() => setShowConfirmation(true)}
                disabled={isDeleting}
                className={`
                  bg-white/10 hover:bg-red-500/20 rounded-full p-1 transition-all
                  ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                {isDeleting ? (
                  <Icon
                    icon="mdi:loading"
                    className="w-5 h-5 text-white/70 animate-spin"
                  />
                ) : (
                  <Icon
                    icon="mdi:delete"
                    className="w-5 h-5 text-white/70 hover:text-red-400"
                  />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-center py-4 border-b border-white/20">
            <div className="w-32 h-40 bg-white/5 flex items-center justify-center border border-white/20">
              <Icon icon="mdi:account" className="w-20 h-20 text-white/50" />
            </div>
          </div>

          <div className="p-6 space-y-3">
            {ktpDetails.map((detail, index) => (
              <motion.div
                key={index}
                className="flex justify-between border-b border-white/10 pb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              >
                <span className="text-white/60 text-sm mr-4">
                  {detail.label}
                </span>
                <span
                  className={`
                    font-semibold text-sm text-white 
                    ${
                      detail.longText
                        ? "text -right break-words max-w-[200px]"
                        : ""
                    }
                  `}
                >
                  {detail.value}
                </span>
              </motion.div>
            ))}

            <motion.div
              className="text-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm text-white/70">
                Berlaku Hingga: Seumur Hidup
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Confirm
        isOpen={showConfirmation}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        nik={penduduk.nik}
        nama={penduduk.nama}
      />
    </>
  );
}
