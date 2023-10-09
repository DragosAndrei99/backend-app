import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(userData: User): Promise<User> {
    try {
      const salt = 10;
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      userData.password = hashedPassword;
      const result = await this.prisma.user.create({ data: userData });
      return result;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'A new user cannot be created with this email',
          );
        }
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const result = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
