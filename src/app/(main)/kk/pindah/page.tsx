import { prisma } from "@/app/lib/prisma";
import FormTambahAnggota from "./FormPindah";

export default async function PindahAnggota() {
  const pendudukList = await prisma.penduduk.findMany();
  const kartuKeluargaList = await prisma.kartuKeluarga.findMany();
  return (
    <FormTambahAnggota
      kartuKeluargaList={kartuKeluargaList}
      pendudukList={pendudukList}
    />
  );
}
