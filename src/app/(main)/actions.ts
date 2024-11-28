"use server";

import { Penduduk, Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

export default async function actionTambahPenduduk(penduduk: Penduduk) {
  penduduk.tanggal_lahir = new Date(penduduk.tanggal_lahir);

  try {
    const result = await prisma.penduduk.create({
      data: penduduk,
    });

    revalidatePath("/");

    return result;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(err.message);
    } else {
      throw new Error("unknown error");
    }
  }
}
