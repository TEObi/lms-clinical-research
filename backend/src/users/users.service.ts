import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        country: true,
        timezone: true,
        isEmailVerified: true,
        createdAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updateProfile(id: string, data: {
    firstName?: string;
    lastName?: string;
    country?: string;
    timezone?: string;
    currentPassword?: string;
    newPassword?: string;
  }) {
    // If password change requested, verify current password first
    if (data.newPassword) {
      if (!data.currentPassword) {
        throw new BadRequestException('Current password is required to set a new password');
      }
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) throw new UnauthorizedException('User not found');

      const valid = await bcrypt.compare(data.currentPassword, user.passwordHash);
      if (!valid) throw new BadRequestException('Current password is incorrect');

      const passwordHash = await bcrypt.hash(data.newPassword, 12);
      const { currentPassword, newPassword, ...profileData } = data;
      return this.prisma.user.update({
        where: { id },
        data: { ...profileData, passwordHash },
        select: { id: true, email: true, firstName: true, lastName: true, country: true, timezone: true },
      });
    }

    const { currentPassword, newPassword, ...profileData } = data;
    return this.prisma.user.update({
      where: { id },
      data: profileData,
      select: { id: true, email: true, firstName: true, lastName: true, country: true, timezone: true },
    });
  }
}
