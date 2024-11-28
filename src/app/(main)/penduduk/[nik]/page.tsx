import { prisma } from "@/app/lib/prisma";
import PendudukDetailScreen from "./penduduk_detail_screen";

type Params = {
  params: {
    nik: string;
  };
};

export default async function PendudukDetail({ params }: Params) {
  const { nik } = await params;

  const penduduk = await prisma.penduduk.findFirstOrThrow({
    where: {
      nik: nik,
    },
  });

  return <PendudukDetailScreen penduduk={penduduk} />;
}
