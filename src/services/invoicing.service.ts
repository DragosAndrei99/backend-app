import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Bill } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InvoicingService {
  constructor(private prisma: PrismaService) {}

  async getInvoiceById(id): Promise<Bill> {
    try {
      const invoice = this.prisma.invoice.findUnique({
        where: { id },
      });
      return invoice;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getInvoices(req): Promise<Bill[]> {
    try {
      const invoices = this.prisma.invoice.findMany({
        where: { user_id: req.user.sub },
      });
      return invoices;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
