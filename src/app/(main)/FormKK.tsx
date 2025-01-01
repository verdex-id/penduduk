import { motion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";
import {
  WilayahData,
  WilayahDataKelurahan,
  WilayahResponse,
} from "../lib/model";
import {
  actionTambahKartuKeluarga,
  actionTambahPenduduk,
  generateNIK,
  generateNoKK,
  loadDistricts,
  loadProvinces,
  loadRegencies,
  loadVillages,
} from "./actions";
import { toast } from "sonner";

export default function FormKK() {
  const [loading, setLoading] = useState<boolean>();
  const [errors, setErrors] = useState<string[]>([]);

  const [provinces, setProvinces] = useState<WilayahResponse<WilayahData[]>>();
  const [regencies, setRegencies] = useState<WilayahResponse<WilayahData[]>>();
  const [districts, setDisctricts] = useState<WilayahResponse<WilayahData[]>>();
  const [villages, setVillages] =
    useState<WilayahResponse<WilayahDataKelurahan[]>>();

  const [kodeWilayah, setKodeWilayah] = useState<string>();
  const [kodePos, setKodePos] = useState<string>();
  const [tanggalLahir, setTanggalLahir] = useState<Date>();
  const [nik, setNik] = useState<string>();
  const [noKK, setNoKK] = useState<string>();

  useEffect(() => {
    async function fetchProvinces() {
      const res = await loadProvinces();
      setProvinces(res);
    }
    fetchProvinces();
  }, []);

  async function handleLoadRegencies(code: string) {
    const res = await loadRegencies(code);
    setRegencies(res);
  }

  async function handleLoadDistricts(code: string) {
    const res = await loadDistricts(code);
    setDisctricts(res);
  }

  async function handleLoadVillages(code: string) {
    setKodeWilayah(code);
    const res = await loadVillages(code);
    setVillages(res);
  }

  useEffect(() => {
    async function createNIK() {
      if (kodeWilayah && tanggalLahir) {
        const res = await generateNIK(kodeWilayah, tanggalLahir);
        setNik(res);
      }
    }
    createNIK();

    async function createNoKK() {
      if (kodeWilayah) {
        const res = await generateNoKK(kodeWilayah);
        setNoKK(res);
      }
    }
    createNoKK();
  }, [kodeWilayah, tanggalLahir]);

  async function handleTambahKartuKeluarga(e: FormEvent<HTMLFormElement>) {
    setErrors([]);
    e.preventDefault();
    const resetForm = e.currentTarget;
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const provinsi = formData.get("provinsi")?.toString() || "";
      const kabupaten = formData.get("kabupaten")?.toString() || "";
      const kecamatan = formData.get("kecamatan")?.toString() || "";
      const kelurahan = formData.get("kelurahan")?.toString() || "";

      const res = await actionTambahKartuKeluarga({
        alamat: kecamatan,
        kabupaten_kota: kabupaten,
        kecamatan: kecamatan,
        kelurahan_desa: kelurahan,
        kode_pos: Number.parseInt(kodePos!),
        nik_kepala_keluarga: nik!,
        nomor: noKK!,
        provinsi: provinsi,
      });

      await actionTambahPenduduk({
        agama: formData.get("agama")?.toString() || "",
        alamat: formData.get("kecamatan")?.toString() || "",
        golongan_darah: "O",
        jenis_kelamin: formData.get("jenis_kelamin")?.toString() || "",
        kewarganegaraan: "wni",
        nama: formData.get("name")?.toString() || "",
        nik: nik!,
        nomor_kk: noKK!,
        pekerjaan: "-",
        role: "KEPALA_KELUARGA",
        status_perkawinan: formData.get("status_perkawinan")?.toString() || "",
        tanggal_lahir: new Date(
          formData.get("tanggal_lahir")?.toString() || ""
        ),
        tempat_lahir: formData.get("kecamatan")?.toString() || "",
      });

      toast.success("Data Kartu Keluarga Berhasil Ditambahkan", {
        description: `No KK: ${res.nomor}`,
        position: "bottom-right",
        duration: 3000,
      });
      resetForm.reset();

      // router.push("#list");
      document.getElementById("list")?.scrollIntoView();
    } catch (err) {
      if (err instanceof Error) {
        setErrors([...errors, err.message]);
      }
    }

    setLoading(false);
  }

  return (
    <>
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
          onSubmit={handleTambahKartuKeluarga}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-2xl text-center pb-5"
          >
            Input Data KK
          </motion.h1>

          {/* Provinsi */}
          <motion.label
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            htmlFor="nik"
            className="block px-5 py-2 border-2 border-white/25 rounded-xl"
          >
            <p className="font-bold">Provinsi</p>
            <select name="provinsi" id="provinsi">
              {provinces?.data.map((provinsi) => (
                <option
                  key={provinsi.code}
                  value={provinsi.name}
                  onClick={() => handleLoadRegencies(provinsi.code)}
                >
                  {provinsi.name}
                </option>
              ))}
            </select>
          </motion.label>

          {/* Kabupaten */}
          <motion.label
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            htmlFor="nik"
            className="block px-5 py-2 border-2 border-white/25 rounded-xl"
          >
            <p className="font-bold">Kabupaten</p>
            <select name="kabupaten" id="kabupaten">
              {regencies?.data.map((regency) => (
                <option
                  key={regency.code}
                  value={regency.name}
                  onClick={() => handleLoadDistricts(regency.code)}
                >
                  {regency.name}
                </option>
              ))}
            </select>
          </motion.label>

          {/* Kecamatan */}
          <motion.label
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            htmlFor="nik"
            className="block px-5 py-2 border-2 border-white/25 rounded-xl"
          >
            <p className="font-bold">Kecamatan</p>
            <select name="kecamatan" id="kecamatan">
              {districts?.data.map((district) => (
                <option
                  key={district.code}
                  value={district.name}
                  onClick={() => handleLoadVillages(district.code)}
                >
                  {district.name}
                </option>
              ))}
            </select>
          </motion.label>

          {/* Kelurahan */}
          <motion.label
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            htmlFor="nik"
            className="block px-5 py-2 border-2 border-white/25 rounded-xl"
          >
            <p className="font-bold">Kelurahan</p>
            <select name="kelurahan" id="kelurahan">
              {villages?.data.map((village) => (
                <option
                  key={village.code}
                  value={village.name}
                  onClick={() => {
                    setKodePos(village.postal_code);
                  }}
                >
                  {village.name} ({village.postal_code})
                </option>
              ))}
            </select>
          </motion.label>

          <hr />
          {/* Section Data Kepala Keluarga */}

          {/* Nama */}
          <motion.label
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            htmlFor="name"
            className="block px-5 py-2 border-2 border-white/25 rounded-xl"
          >
            <p className="font-bold">Nama Lengkap</p>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Masukkan Nama Lengkap"
              required
            />
          </motion.label>

          {/* Tanggal Lahir */}
          <motion.label
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            htmlFor="tanggal_lahir"
            className="block px-5 py-2 border-2 border-white/25 rounded-xl"
          >
            <p className="font-bold">Tanggal Lahir</p>
            <input
              type="date"
              id="tanggal_lahir"
              name="tanggal_lahir"
              onChange={(e) => setTanggalLahir(new Date(e.currentTarget.value))}
              required
            />
          </motion.label>

          {/* Jenis Kelamin */}
          <motion.label
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            htmlFor="nik"
            className="block px-5 py-2 border-2 border-white/25 rounded-xl"
          >
            <p className="font-bold">Jenis Kelamin</p>
            <select name="kelurahan" id="kelurahan">
              <option value={"laki_laki"}>Laki Laki</option>
              <option value={"perempuan"}>Perempuan</option>
            </select>
          </motion.label>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center gap-2 w-full"
          >
            {/* Agama */}
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

            {/* Status Perkawinan */}
            <label
              htmlFor="status_perkawinan"
              className="block px-5 py-2 border-2 border-white/25 rounded-xl w-full"
            >
              <p className="font-bold">Status Perkawinan</p>
              <select
                id="status_perkawinan"
                name="status_perkawinan"
                required
                defaultValue={"menikah"}
              >
                <option value="menikah">Menikah</option>
              </select>
            </label>
          </motion.div>

          {/* NIK (Auto) */}
          <motion.label
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            htmlFor="nik"
            className="block px-5 py-2 border-2 border-white/25 rounded-xl"
          >
            <p className="font-bold">NIK (Dibuat otomatis)</p>
            <input
              type="text"
              id="nik"
              name="nik"
              defaultValue={nik}
              disabled
              required
            />
          </motion.label>

          {/* No KK (Auto) */}
          <motion.label
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            htmlFor="no_kk"
            className="block px-5 py-2 border-2 border-white/25 rounded-xl"
          >
            <p className="font-bold">Nomor KK (Dibuat otomatis)</p>
            <input
              type="text"
              id="no_kk"
              name="no_kk"
              defaultValue={noKK}
              disabled
              required
            />
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
    </>
  );
}
