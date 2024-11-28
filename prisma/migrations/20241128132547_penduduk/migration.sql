-- CreateTable
CREATE TABLE "Penduduk" (
    "nik" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "tempat_lahir" TEXT NOT NULL,
    "tanggal_lahir" TIMESTAMP(3) NOT NULL,
    "jenis_kelamin" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "agama" TEXT NOT NULL,
    "status_perkawinan" TEXT NOT NULL,
    "pekerjaan" TEXT NOT NULL,
    "kewarganegaraan" TEXT NOT NULL,
    "golongan_darah" TEXT NOT NULL,

    CONSTRAINT "Penduduk_pkey" PRIMARY KEY ("nik")
);
