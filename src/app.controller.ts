import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { Bill, Invoice, User } from '@prisma/client';
import { BillingService } from './services/billing.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { InvoicingService } from './services/invoicing.service';
import { CreateUserDto } from './models/createUser.dto';
import { FindOneParams } from './models/findParam.dto';

@Controller('')
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private readonly billingService: BillingService,
    private readonly invoicingService: InvoicingService,
  ) {}

  @Post('signup')
  async signUpUser(@Body() userData: CreateUserDto): Promise<User> {
    return this.usersService.createUser(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('bills')
  async getAllBills(@Request() req): Promise<Bill[]> {
    return this.billingService.getBills(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('bills/:id')
  async getBill(@Param() params: FindOneParams): Promise<Bill> {
    return this.billingService.getBillById(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('invoices')
  async getAllInvoices(@Request() req): Promise<Invoice[]> {
    return this.invoicingService.getInvoices(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('invoices/:id')
  async getInvoice(@Param() params: FindOneParams): Promise<Invoice> {
    return this.invoicingService.getInvoiceById(params.id);
  }
}
