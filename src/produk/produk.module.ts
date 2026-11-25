import { Module } from "@nestjs/common";
import { ProdukController } from "./produk.controller.js";
import { ProdukService } from "./produk.service.js";
import { PrismaModule } from "../prisma/prisma.module.js";

@Module({
  imports: [PrismaModule],
  controllers: [ProdukController],
  providers: [ProdukService],
})
export class ProdukModule {}
