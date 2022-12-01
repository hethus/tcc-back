import { Module } from '@nestjs/common';
import { ClassesRelationService } from './classes-relation.service';
import { ClassesRelationController } from './classes-relation.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ClassesRelationController],
  providers: [ClassesRelationService, JwtStrategy],
})
export class ClassesRelationModule {}
