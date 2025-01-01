"use server";

import { KartuKeluarga, Penduduk, Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { WILAYAH_BASE_URL } from "../lib/config";
import {
  WilayahData,
  WilayahDataKelurahan,
  WilayahResponse,
} from "../lib/model";

export async function actionTambahPenduduk(penduduk: Penduduk) {
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

export async function actionTambahKartuKeluarga(kartuKeluarga: KartuKeluarga) {
  try {
    const result = await prisma.kartuKeluarga.create({
      data: kartuKeluarga,
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

export async function loadProvinces() {
  const res: WilayahResponse<WilayahData[]> = await fetch(
    WILAYAH_BASE_URL + "/provinces.json"
  ).then((r) => r.json());
  return res;
}

export async function loadRegencies(code: string) {
  const res: WilayahResponse<WilayahData[]> = await fetch(
    WILAYAH_BASE_URL + `/regencies/${code}.json`
  ).then((r) => r.json());
  return res;
}

export async function loadDistricts(code: string) {
  const res: WilayahResponse<WilayahData[]> = await fetch(
    WILAYAH_BASE_URL + `/districts/${code}.json`
  ).then((r) => r.json());
  return res;
}

export async function loadVillages(code: string) {
  const res: WilayahResponse<WilayahDataKelurahan[]> = await fetch(
    WILAYAH_BASE_URL + `/villages/${code}.json`
  ).then((r) => r.json());
  return res;
}

export async function generateNIK(kode_wilayah: string, tanggal_lahir: Date) {
  const kodeWilayah = kode_wilayah.replaceAll(".", "");
  const tanggalLahir = tanggal_lahir
    .toLocaleDateString("id-ID", { dateStyle: "short" })
    .replaceAll("/", "");

  let counter = 1;
  while (true) {
    const nik =
      kodeWilayah + tanggalLahir + counter.toString().padStart(4, "0");

    const count = await prisma.penduduk.count({
      where: {
        nik: nik,
      },
    });

    if (count == 0) {
      return nik;
    } else {
      counter++;
    }
  }
}

export async function generateNoKK(kode_wilayah: string) {
  const kodeWilayah = kode_wilayah.replaceAll(".", "");
  const tanggalLahir = new Date()
    .toLocaleDateString("id-ID", { dateStyle: "short" })
    .replaceAll("/", "");

  let counter = 1;
  while (true) {
    const nomor =
      kodeWilayah + tanggalLahir + counter.toString().padStart(4, "0");

    const count = await prisma.kartuKeluarga.count({
      where: {
        nomor: nomor,
      },
    });

    if (count == 0) {
      return nomor;
    } else {
      counter++;
    }
  }
}
