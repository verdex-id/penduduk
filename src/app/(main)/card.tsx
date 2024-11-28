import { Penduduk } from "@prisma/client";
import Link from "next/link";

type Params = {
  penduduk: Penduduk;
};

export default function Card({ penduduk }: Params) {
  return (
    <div className="bg-gradient-to-tr from-primary/80 to-primary/50 backdrop-blur-xl shadow-lg rounded-xl p-5 text-white">
      <span className="text-white/50">{penduduk.nik}</span>
      <h1 className="font-bold text-xl">{penduduk.nama}</h1>
      <p>{penduduk.alamat}</p>
      <Link href={"/penduduk/" + penduduk.nik} className="block mt-2 underline">
        Lihat detail
      </Link>
    </div>
  );
}
