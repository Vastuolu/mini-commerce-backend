import { PartialType } from "@nestjs/mapped-types";
import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

const Trim = () =>
  Transform(({ value }) => (typeof value === "string" ? value.trim() : value));

export class CreateProdukDto {
  @Trim()
  @IsString({ message: "nama harus berupa teks" })
  @IsNotEmpty({ message: "nama wajib diisi" })
  nama!: string;

  @IsInt({ message: "harga harus berupa bilangan bulat" })
  @Min(0, { message: "harga tidak boleh negatif" })
  harga!: number;

  @Trim()
  @IsString({ message: "kategori harus berupa teks" })
  @IsNotEmpty({ message: "kategori wajib diisi" })
  kategori!: string;

  @Trim()
  @IsString({ message: "deskripsi harus berupa teks" })
  @IsNotEmpty({ message: "deskripsi wajib diisi" })
  deskripsi!: string;
}

export class UpdateProdukDto extends PartialType(CreateProdukDto) {}
