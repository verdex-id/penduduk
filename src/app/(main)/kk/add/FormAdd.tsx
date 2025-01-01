"use client";

import { KartuKeluarga } from "@prisma/client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { generateNIK } from "../../actions";

type Params = {
  kartuKeluargaList: KartuKeluarga[];
};

export default function FormTambahAnggota({ kartuKeluargaList }: Params) {
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
            Input Data Penduduk
          </motion.h1>
          <motion.label
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            htmlFor="nik"
            className="block px-5 py-2 border-2 border-white/25 rounded-xl"
          >
            <p className="font-bold">Pilih KK</p>
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
          <motion.label
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            htmlFor="nik"
            className="block px-5 py-2 border-2 border-white/25 rounded-xl"
          >
            <p className="font-bold">NIK (Auto Generate)</p>
            <input
              type="text"
              id="nik"
              name="nik"
              placeholder="610201211004XXXX"
              min={16}
              max={16}
              minLength={16}
              maxLength={16}
              disabled
              value={nik}
              required
            />
          </motion.label>
          <motion.label
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            htmlFor="nama"
            className="block px-5 py-2 border-2 border-white/25 rounded-xl"
          >
            <p className="font-bold">Nama</p>
            <input
              type="text"
              id="nama"
              name="nama"
              placeholder="Agustus Julianti"
              required
            />
          </motion.label>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-2 w-full"
          >
            <label
              htmlFor="tempat_lahir"
              className="block px-5 py-2 border-2 border-white/25 rounded-xl w-full"
            >
              <p className="font-bold">Tempat Lahir</p>
              <input
                type="text"
                id="tempat_lahir"
                name="tempat_lahir"
                placeholder="Boyolali"
                required
              />
            </label>
            <label
              htmlFor="tanggal_lahir"
              className="block px-5 py-2 border-2 border-white/25 rounded-xl w-full"
            >
              <p className="font-bold">Tanggal Lahir</p>
              <input
                type="date"
                id="tanggal_lahir"
                name="tanggal_lahir"
                onChange={(e) => {
                  setTanggalLahir(new Date(e.currentTarget.value));
                }}
                required
              />
            </label>
          </motion.div>
          <motion.label
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            htmlFor="jenis_kelamin"
            className="block px-5 py-2 border-2 border-white/25 rounded-xl w-full"
          >
            <p className="font-bold">Jenis Kelamin</p>
            <select
              id="jenis_kelamin"
              name="jenis_kelamin"
              className="w-full bg-transparent transation duration-300 ease text-white  rounded-xl p-2 "
              required
            >
              <option value="laki_laki">Laki Laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
          </motion.label>
          <motion.label
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            htmlFor="alamat"
            className="block px-5 py-2 border-2 border-white/25 rounded-xl w-full"
          >
            <p className="font-bold">Alamat</p>
            <textarea
              id="alamat"
              name="alamat"
              rows={3}
              placeholder="Masukkan alamat tempat tinggal saat ini"
              required
            ></textarea>
          </motion.label>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center gap-2 w-full"
          >
            <label
              htmlFor="agama"
              className="block px-5 py-2 border-2 border-white/25 rounded-xl w-full"
            >
              <p className="font-bold">Agama</p>
              <select id="agama" name="agama" required>
                <option value="islam">Islam</option>
                <option value="kristen">Kristen</option>
                <option value="buddha">Buddha</option>
                <option value="hindu">Hindu</option>
                <option value="konghucu">Konghucu</option>
              </select>
            </label>
            <label
              htmlFor="status_perkawinan"
              className="block px-5 py-2 border-2 border-white/25 rounded-xl w-full"
            >
              <p className="font-bold">Status Perkawinan</p>
              <select id="status_perkawinan" name="status_perkawinan" required>
                <option value="menikah">Menikah</option>
                <option value="belum_menikah">Belum Menikah</option>
              </select>
            </label>
          </motion.div>
          <motion.label
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            htmlFor="pekerjaan"
            className="block px-5 py-2 border-2 border-white/25 rounded-xl w-full"
          >
            <p className="font-bold">Pekerjaan</p>
            <input
              type="text"
              id="pekerjaan"
              name="pekerjaan"
              placeholder="Contoh: Pelajar, Pegawai Swasta, dll"
              required
            />
          </motion.label>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex items-center w-full gap-2"
          >
            <label
              htmlFor="kewarganegaraan"
              className="block px-5 py-2 border-2 border-white/25 rounded-xl w-full"
            >
              <p className="font-bold">Kewarganegaraan</p>
              <select id="kewarganegaraan" name="kewarganegaraan" required>
                <option value="wni">Warga Negara Indonesia (WNI)</option>
                <option value="wna">Warga Negara Asing (WNA)</option>
              </select>
            </label>
            <label
              htmlFor="golongan_darah"
              className="block px-5 py-2 border-2 border-white/25 rounded-xl w-full"
            >
              <p className="font-bold">Golongan Darah</p>
              <select id="golongan_darah" name="golongan_darah" required>
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="ab">AB</option>
                <option value="o">O</option>
              </select>
            </label>
          </motion.div>
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
