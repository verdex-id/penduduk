import { prisma } from "@/app/lib/prisma";
import KartuKeluargaDetailScreen from "./kk_detail_screen";

type Params = {
  params: {
    no_kk: string;
  };
};

export default async function PendudukDetail({ params }: Params) {
  const { no_kk } = params;

  const kartuKeluarga = await prisma.kartuKeluarga.findFirstOrThrow({
    where: {
      nomor: no_kk,
    },
    include: {
      anggota: true,
    },
  });

  const kepalaKeluarga = await prisma.penduduk.findFirstOrThrow({
    where: {
      nik: kartuKeluarga.nik_kepala_keluarga,
    },
  });

  return (
    <KartuKeluargaDetailScreen
      kartuKeluarga={kartuKeluarga}
      kepalaKeluarga={kepalaKeluarga}
    />
  );
}
