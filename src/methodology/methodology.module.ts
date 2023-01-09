import { Module } from '@nestjs/common';
import { MethodologyService } from './methodology.service';
import { MethodologyController } from './methodology.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [MethodologyController],
  providers: [MethodologyService, JwtStrategy],
})
export class MethodologyModule {}
