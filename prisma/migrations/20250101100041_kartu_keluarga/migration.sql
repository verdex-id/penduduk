/*
  Warnings:

  - Added the required column `nomor_kk` to the `Penduduk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Penduduk" ADD COLUMN     "nomor_kk" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'ANGGOTA';

-- CreateTable
CREATE TABLE "KartuKeluarga" (
    "nomor" TEXT NOT NULL,
    "nik_kepala_keluarga" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "rt" INTEGER NOT NULL,
    "rw" INTEGER NOT NULL,
    "kode_pos" INTEGER NOT NULL,
    "kelurahan_desa" TEXT NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "kabupaten_kota" TEXT NOT NULL,
    "provinsi" TEXT NOT NULL,

    CONSTRAINT "KartuKeluarga_pkey" PRIMARY KEY ("nomor")
);

-- AddForeignKey
ALTER TABLE "Penduduk" ADD CONSTRAINT "Penduduk_nomor_kk_fkey" FOREIGN KEY ("nomor_kk") REFERENCES "KartuKeluarga"("nomor") ON DELETE RESTRICT ON UPDATE CASCADE;
