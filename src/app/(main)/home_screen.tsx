"use client";

import { Penduduk } from "@prisma/client";
import Card from "./card";
import { FormEvent, useState } from "react";
import actionTambahPenduduk from "./actions";
import Image from "next/image";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "./text";
import { FlipWords } from "./flip_word";
import { toast } from "sonner";
type Params = {
  penduduk_list: Penduduk[];
};

export default function HomeScreen({ penduduk_list }: Params) {
  const [loading, setLoading] = useState<boolean>();
  const [errors, setErrors] = useState<string[]>([]);

  async function handleTambahPenduduk(e: FormEvent<HTMLFormElement>) {
    setErrors([]);
    e.preventDefault();
    const resetForm = e.currentTarget;
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    let object: any = {};
    formData.forEach((value, key) => (object[key] = value));

    try {
      await actionTambahPenduduk(object);
      toast.success("Data Penduduk Berhasil Ditambahkan", {
        description: `NIK: ${object.nik} - Nama: ${object.nama}`,
        position: "bottom-right",
        duration: 3000,
      });
      resetForm.reset();
    } catch (err) {
      if (err instanceof Error) {
        setErrors([...errors, err.message]);
      }
    }

    setLoading(false);
  }
  const kata =
    "Input data dan melihat output data penduduk dengan mudah dan cepat";
  const judul = ["Input", "Output", "Update", "Delete"];
  return (
    <div className="w-full max-w-screen-xl mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-screen">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className=""
        >
          <div className="text-white mt-32 w-full max-w-screen-sm">
            <div className="text-left space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-bold text-5xl"
              >
                Website <FlipWords words={judul} />
                Data Penduduk
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-md font-neutral"
              >
                <TextGenerateEffect words={kata} />
              </motion.div>
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center justify-center justify-items-center mt-14"
            >
              <Image
                src={"/search.svg"}
                alt="hero png"
                width={500}
                height={500}
              />
            </motion.div>
          </div>
        </motion.div>
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
            onSubmit={handleTambahPenduduk}
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
              <p className="font-bold">NIK</p>
              <input
                type="text"
                id="nik"
                name="nik"
                placeholder="610201211004XXXX"
                min={16}
                max={16}
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
                <select
                  id="status_perkawinan"
                  name="status_perkawinan"
                  required
                >
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
                <p className="font-bold">Status Perkawinan</p>
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

      <hr className="my-5 border-4 border-white/25 rounded-xl" />

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="min-h-screen mt-5"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bold text-3xl text-white"
        >
          Daftar Data Penduduk
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white w-full max-w-screen-sm"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-5  rounded-xl"
        >
          {penduduk_list.map((penduduk) => (
            <motion.div
              key={penduduk.nik}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card penduduk={penduduk} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
