"use client";

import { Penduduk, Prisma } from "@prisma/client";
import { Icon } from "@iconify/react";

type Params = {
  kartuKeluarga: Prisma.KartuKeluargaGetPayload<{
    include: {
      anggota: true;
    };
  }>;
  kepalaKeluarga: Penduduk;
};

export default function KartuKeluargaDetailScreen({
  kartuKeluarga,
  kepalaKeluarga,
}: Params) {
  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 to-primary/20">
        <div className="w-full max-w-screen-sm bg-white/25 p-5 rounded-xl text-white space-y-4">
          <div>
            <h1 className="font-bold text-xl">Kartu Keluarga</h1>
            <h1 className="font-bold">No. KK {kartuKeluarga.nomor}</h1>
            <hr />
            <p>Kepala Keluarga: {kepalaKeluarga.nama}</p>
            <p>Alamat: {kepalaKeluarga.alamat}</p>
            <p>Kode Pos: {kartuKeluarga.kode_pos}</p>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h1 className="font-bold">Anggota Keluarga</h1>
              <div>
                <Icon icon="mdi:add" width="24" height="24" />
              </div>
            </div>
            <div className="mt-2">
              {kartuKeluarga.anggota.map((anggota) => (
                <div className="bg-white/10 px-5 py-2 rounded-xl">
                  <div className="flex items-center justify-between">
                    <p className="font-bold">{anggota.nama}</p>
                    <p>{anggota.nik}</p>
                  </div>
                  <p>
                    {anggota.tanggal_lahir.toLocaleDateString("id-ID", {
                      dateStyle: "medium",
                    })}
                  </p>
                  <p>{anggota.role.replaceAll("_", " ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
