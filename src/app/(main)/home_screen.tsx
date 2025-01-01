"use client";

import { Penduduk } from "@prisma/client";
import Card from "./card";
import { FormEvent, useState } from "react";
import { actionTambahPenduduk } from "./actions";
import Image from "next/image";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "./text";
import { FlipWords } from "./flip_word";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormKK from "./FormKK";
type Params = {
  penduduk_list: Penduduk[];
};

export default function HomeScreen({ penduduk_list }: Params) {
  const [loading, setLoading] = useState<boolean>();
  const [errors, setErrors] = useState<string[]>([]);

  const router = useRouter();

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

      // router.push("#list");
      document.getElementById("list")?.scrollIntoView();
    } catch (err) {
      if (err instanceof Error) {
        setErrors([...errors, "NIK tidak bisa digunakan, NIK sudah terdaftar"]);
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

        {/* Form KK */}
        <FormKK />
      </div>

      <hr className="my-5 border-4 border-white/25 rounded-xl" />

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="min-h-screen mt-5"
        id="list"
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
          Berikut merupakan daftar data penduduk.
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
