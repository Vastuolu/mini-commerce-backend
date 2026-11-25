import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import type { CreateProdukDto, UpdateProdukDto } from "./dto/produk.dto.js";

@Injectable()
export class ProdukService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(kategori?: string) {
    return this.prisma.produk.findMany({
      where: kategori ? { kategori } : undefined,
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: number) {
    const produk = await this.prisma.produk.findUnique({ where: { id } });

    if (!produk) {
      throw new NotFoundException(`Produk dengan id ${id} tidak ditemukan`);
    }

    return produk;
  }

  create(data: CreateProdukDto) {
    return this.prisma.produk.create({
      data: {
        nama: data.nama.trim(),
        harga: data.harga,
        kategori: data.kategori.trim(),
        deskripsi: data.deskripsi.trim(),
      },
    });
  }

  async update(id: number, data: UpdateProdukDto) {
    await this.findOne(id);

    return this.prisma.produk.update({
      where: { id },
      data: {
        nama: data.nama?.trim(),
        harga: data.harga,
        kategori: data.kategori?.trim(),
        deskripsi: data.deskripsi?.trim(),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.produk.delete({ where: { id } });
  }

  async statistik() {
    const [totalProduk, agregat, perKategori] = await Promise.all([
      this.prisma.produk.count(),
      this.prisma.produk.aggregate({
        _sum: { harga: true },
        _avg: { harga: true },
        _min: { harga: true },
        _max: { harga: true },
      }),
      this.prisma.produk.groupBy({
        by: ["kategori"],
        _count: { _all: true },
        _sum: { harga: true },
      }),
    ]);

    return {
      totalProduk,
      totalNilai: agregat._sum.harga ?? 0,
      rataRataHarga: Math.round(agregat._avg.harga ?? 0),
      hargaTermurah: agregat._min.harga ?? 0,
      hargaTermahal: agregat._max.harga ?? 0,
      perKategori: perKategori.map((item) => ({
        kategori: item.kategori,
        jumlahProduk: item._count._all,
        totalNilai: item._sum.harga ?? 0,
      })),
    };
  }
}
