import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UsersService } from './services/users.service';
import { AppController } from './app.controller';
import { BillingService } from './services/billing.service';
import { InvoicingService } from './services/invoicing.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [UsersService, PrismaService, BillingService, InvoicingService],
})
export class AppModule {}
