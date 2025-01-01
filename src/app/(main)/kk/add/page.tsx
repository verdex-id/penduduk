import { prisma } from "@/app/lib/prisma";
import FormTambahAnggota from "./FormAdd";

export default async function TambahAnggota() {
  const kartuKeluargaList = await prisma.kartuKeluarga.findMany();
  return <FormTambahAnggota kartuKeluargaList={kartuKeluargaList} />;
}
