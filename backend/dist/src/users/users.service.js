"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
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
    async findByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    async updateProfile(id, data) {
        if (data.newPassword) {
            if (!data.currentPassword) {
                throw new common_1.BadRequestException('Current password is required to set a new password');
            }
            const user = await this.prisma.user.findUnique({ where: { id } });
            if (!user)
                throw new common_1.UnauthorizedException('User not found');
            const valid = await bcrypt.compare(data.currentPassword, user.passwordHash);
            if (!valid)
                throw new common_1.BadRequestException('Current password is incorrect');
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map