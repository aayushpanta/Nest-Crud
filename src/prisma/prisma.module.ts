import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // services in exports are automatically imported in all modules(if the global module is imported in app module)
@Module({
  providers: [PrismaService],
  exports: [PrismaService], //to ensure that other poviders can import PrismaService
})
export class PrismaModule {}
