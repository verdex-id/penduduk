"use client";

import { Penduduk, Prisma } from "@prisma/client";
import Card from "./card";
import { FormEvent, useState } from "react";
import actionTambahPenduduk from "./actions";

type Params = {
  penduduk_list: Penduduk[];
};

export default function HomeScreen({ penduduk_list }: Params) {
  const [loading, setLoading] = useState<boolean>();
  const [errors, setErrors] = useState<string[]>([]);

  async function handleTambahPenduduk(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    var object: any = {};
    formData.forEach((value, key) => (object[key] = value));

    try {
      await actionTambahPenduduk(object);
    } catch (err: any) {
      setErrors([...errors, err.message]);
    }

    setLoading(false);
  }

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-screen">
        <div className="">
          <div className="text-white mt-48 w-full max-w-screen-sm">
            <h1 className="font-bold text-6xl">Selamat Datang</h1>
            <h2 className="text-xl font-medium">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos eos
              facilis esse ea harum, architecto enim amet. Sunt, beatae ab quo
              veniam illo laudantium quia, porro repudiandae, eos explicabo
              inventore!
            </h2>
          </div>
        </div>
        <div className="">
          <form
            method="post"
            className="bg-accent/25 backdrop-blur-xl shadow-lg p-5 rounded-xl mt-32 text-white space-y-2"
            onSubmit={handleTambahPenduduk}
          >
            <h1 className="font-bold text-2xl text-center pb-5">
              Input Data Penduduk
            </h1>
            <label
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
            </label>
            <label
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
            </label>
            <div className="flex items-center gap-2 w-full">
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
            </div>
            <label
              htmlFor="jenis_kelamin"
              className="block px-5 py-2 border-2 border-white/25 rounded-xl w-full"
            >
              <p className="font-bold">Jenis Kelamin</p>
              <select id="jenis_kelamin" name="jenis_kelamin" required>
                <option value="laki_laki">Laki Laki</option>
                <option value="perempuan">Perempuan</option>
              </select>
            </label>
            <label
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
            </label>
            <div className="flex items-center gap-2 w-full">
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
            </div>
            <label
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
            </label>
            <div className="flex items-center w-full gap-2">
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
            </div>
            {errors.length > 0 && (
              <div className="p-5 bg-red-500 rounded-xl">
                <h1 className="font-bold">Error!</h1>
                <ul>
                  {errors.map((err, i) => (
                    <li className="list-disc list-outside ml-4">{err}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="!mt-5">
              <button className="w-full px-5 py-2 rounded-xl bg-gradient-to-tr from-secondary to-white text-primary font-bold">
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <hr className="my-5 border-4 border-white/25 rounded-xl" />

      {/* Table */}
      <div className="min-h-screen mt-5">
        <h1 className="font-bold text-3xl text-white">Daftar Data Penduduk</h1>
        <p className="text-white w-full max-w-screen-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quas
          neque magni quidem quam sapiente voluptates soluta recusandae! Quos
          illum inventore, beatae repellendus pariatur rerum sequi sunt in earum
          itaque!
        </p>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-5 bg-white rounded-xl">
          {penduduk_list.map((penduduk) => (
            <Card key={penduduk.nik} penduduk={penduduk} />
          ))}
        </div>
      </div>
    </div>
  );
}
