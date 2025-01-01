export type WilayahResponse<T> = {
  data: T;
  meta: WilayahMeta;
};

export type WilayahData = {
  code: string;
  name: string;
};

export type WilayahMeta = {
  administrative_area_level: number;
  updated_at: Date;
};

export type WilayahDataKelurahan = {
  code: string;
  name: string;
  postal_code: string;
};
