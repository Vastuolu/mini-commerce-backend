export interface CreateProdukDto {
  nama: string;
  harga: number;
  kategori: string;
  deskripsi: string;
}

export type UpdateProdukDto = Partial<CreateProdukDto>;
