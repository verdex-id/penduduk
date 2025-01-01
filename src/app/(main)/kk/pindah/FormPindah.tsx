"use client";

import { KartuKeluarga, Penduduk } from "@prisma/client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { generateNIK } from "../../actions";

type Params = {
  kartuKeluargaList: KartuKeluarga[];
  pendudukList: Penduduk[];
};

export default function FormPindahAnggota({
  kartuKeluargaList,
  pendudukList,
}: Params) {
  const [loading, setLoading] = useState<boolean>();
  const [errors, setErrors] = useState<string[]>([]);

  const [tanggalLahir, setTanggalLahir] = useState<Date>();
  const [selectedKK, setSelectedKK] = useState<KartuKeluarga>();
  const [nik, setNIK] = useState<string>();

  async function handleGenerateNIK() {
    if (tanggalLahir && selectedKK) {
      const noKk = selectedKK.nomor;
      const kodeProvinsi = noKk.slice(0, 2);
      const kodeKabupaten = noKk.slice(2, 4);
      const kodeKecamatan = noKk.slice(4, 6);
      const kodeWilayah = `${kodeProvinsi}.${kodeKabupaten}.${kodeKecamatan}`;

      const res = await generateNIK(kodeWilayah, tanggalLahir);
      setNIK(res);
    }
  }

  useEffect(() => {
    handleGenerateNIK();
  }, [tanggalLahir, selectedKK]);

  return (
    <div className="w-full max-w-screen-sm mx-auto px-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className=""
      >
        <motion.form
          method="post"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-accent/25 backdrop-blur-xl shadow-lg p-5 rounded-xl mt-32 text-white space-y-2"
          onSubmit={() => {}}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-2xl text-center pb-5"
          >
            Pindah Data Penduduk
          </motion.h1>

          <motion.label
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            htmlFor="nik"
            className="block px-5 py-2 border-2 border-white/25 rounded-xl"
          >
            <p className="font-bold">Pilih NIK</p>
            <select name="kk" id="kk">
              {pendudukList.map((penduduk) => (
                <option key={penduduk.nik} className="text-black">
                  {penduduk.nik} - {penduduk.nama}
                </option>
              ))}
            </select>
          </motion.label>

          <motion.label
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            htmlFor="nik"
            className="block px-5 py-2 border-2 border-white/25 rounded-xl"
          >
            <p className="font-bold">Pilih KK tujuan</p>
            <select name="kk" id="kk">
              {kartuKeluargaList.map((kk) => (
                <option
                  key={kk.nomor}
                  onClick={() => setSelectedKK(kk)}
                  className="text-black"
                >
                  {kk.nomor}
                </option>
              ))}
            </select>
          </motion.label>

          {errors.length > 0 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-5 bg-red-500 rounded-xl"
            >
              <h1 className="font-bold">Error!</h1>
              <ul>
                {errors.map((err, i) => (
                  <li key={i} className="list-disc list-outside ml-4">
                    {err}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="!mt-5"
          >
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
      w-full px-5 py-3 rounded-xl 
      bg-white/10 backdrop-blur-xl 
      border-2 border-white/20
      text-white font-bold 
      transition-all duration-300
      hover:bg-white/20 
      hover:border-white/30
      flex items-center justify-center
      ${loading ? "opacity-50 cursor-not-allowed" : ""}
    `}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </div>
              ) : (
                "Submit"
              )}
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}
