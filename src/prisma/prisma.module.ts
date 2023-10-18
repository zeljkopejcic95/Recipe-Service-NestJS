import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators/modules';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
