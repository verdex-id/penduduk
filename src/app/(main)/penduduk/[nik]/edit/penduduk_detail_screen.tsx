"use client";

import { Penduduk } from "@prisma/client";
import { useState, FormEvent } from "react";
import { actionUpdatePenduduk } from "../actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
type Params = {
  penduduk: Penduduk;
};

export default function PendudukDetailScreen({ penduduk }: Params) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  async function handleUpdatePenduduk(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    const formData = new FormData(e.currentTarget);
    const object: Partial<Penduduk> = {};

    formData.forEach((value, key) => {
      const stringValue = value.toString().trim();

      if (key === "tanggal_lahir") {
        object[key as keyof Penduduk] = new Date(stringValue) as any;
      } else if (key !== "nik") {
        object[key as keyof Penduduk] = stringValue as any;
      }
    });

    try {
      await actionUpdatePenduduk(penduduk.nik, object as Penduduk);
      toast.success("Data penduduk berhasil diperbarui", {
        description: `Data untuk NIK ${penduduk.nik} telah diupdate`,
        position: "bottom-right",
      });
      router.push(`/penduduk/${penduduk.nik}`);
    } catch (err: any) {
      toast.error("Gagal memperbarui data", {
        description: err.message || "Silakan coba lagi",
        position: "bottom-right",
      });
      setErrors([err.message || "Gagal memperbarui data. Silakan coba lagi."]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-screen-md mx-auto px-8 min-h-screen">
      <div>
        <form
          onSubmit={handleUpdatePenduduk}
          className="bg-accent/25 backdrop-blur-xl shadow-lg p-5 rounded-xl mt-32 text-white space-y-2"
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
              minLength={16}
              maxLength={16}
              defaultValue={penduduk.nik}
              required
              readOnly
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
              defaultValue={penduduk.nama}
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
                defaultValue={penduduk.tempat_lahir}
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
                defaultValue={
                  penduduk.tanggal_lahir.toISOString().split("T")[0]
                }
                required
              />
            </label>
          </div>
          <label
            htmlFor="jenis_kelamin"
            className="block px-5 py-2 border-2 border-white/25 rounded-xl w-full"
          >
            <p className="font-bold">Jenis Kelamin</p>
            <select
              id="jenis_kelamin"
              name="jenis_kelamin"
              defaultValue={penduduk.jenis_kelamin}
              required
            >
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
              defaultValue={penduduk.alamat}
              required
            ></textarea>
          </label>
          <div className="flex items-center gap-2 w-full">
            <label
              htmlFor="agama"
              className="block px-5 py-2 border-2 border-white/25 rounded-xl w-full"
            >
              <p className="font-bold">Agama</p>
              <select
                id="agama"
                name="agama"
                defaultValue={penduduk.agama}
                required
              >
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
                defaultValue={penduduk.status_perkawinan}
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
              defaultValue={penduduk.pekerjaan}
              required
            />
          </label>
          <div className="flex items-center w-full gap-2">
            <label
              htmlFor="kewarganegaraan"
              className="block px-5 py-2 border-2 border-white/25 rounded-xl w-full"
            >
              <p className="font-bold">Kewarganegaraan</p>
              <select
                id="kewarganegaraan"
                name="kewarganegaraan"
                defaultValue={penduduk.kewarganegaraan}
                required
              >
                <option value="wni">Warga Negara Indonesia (WNI)</option>
                <option value="wna">Warga Negara Asing (WNA)</option>
              </select>
            </label>
            <label
              htmlFor="golongan_darah"
              className="block px-5 py-2 border-2 border-white/25 rounded-xl w-full"
            >
              <p className="font-bold">Golongan Darah</p>
              <select
                id="golongan_darah"
                name="golongan_darah"
                defaultValue={penduduk.golongan_darah}
                required
              >
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
                  <li key={i} className="list-disc list-outside ml-4">
                    {err}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="!mt-5">
            <button
              type="submit"
              className="w-full px-5 py-2 rounded-xl bg-gradient-to-tr from-secondary to-white text-primary font-bold"
              disabled={loading}
            >
              {loading ? "Loading..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
