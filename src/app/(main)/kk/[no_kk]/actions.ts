"use server";

import { prisma } from "@/app/lib/prisma";
import { Penduduk } from "@prisma/client";

export async function actionDeletePenduduk(nik: string) {
  const result = await prisma.penduduk.delete({
    where: {
      nik: nik,
    },
  });

  return result;
}

export async function actionUpdatePenduduk(nik: string, penduduk: Penduduk) {
  const result = await prisma.penduduk.update({
    where: {
      nik: nik,
    },
    data: penduduk,
  });

  return result;
}
