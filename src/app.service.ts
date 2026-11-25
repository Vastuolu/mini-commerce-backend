import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Mini Commerce API berjalan. Endpoint produk tersedia di /produk";
  }
}
