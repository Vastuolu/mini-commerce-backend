import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ProdukService } from "./produk.service.js";
import type { CreateProdukDto, UpdateProdukDto } from "./dto/produk.dto.js";

@Controller("produk")
export class ProdukController {
  constructor(private readonly produkService: ProdukService) {}

  @Get()
  findAll(@Query("kategori") kategori?: string) {
    return this.produkService.findAll(kategori);
  }

  @Get("statistik")
  statistik() {
    return this.produkService.statistik();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.produkService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateProdukDto) {
    return this.produkService.create(data);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateProdukDto) {
    return this.produkService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.produkService.remove(id);
  }
}
