import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Bill } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BillingService {
  constructor(private prisma: PrismaService) {}

  async getBillById(id): Promise<Bill> {
    try {
      const bill = this.prisma.invoice.findUnique({
        where: { id },
      });
      return bill;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getBills(req): Promise<Bill[]> {
    try {
      const bills = this.prisma.bill.findMany({
        where: { user_id: req.user.sub },
      });
      return bills;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
