import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PublicModule } from './public/public.module';
import { AuthModule } from './auth/auth.module';
import { ClasseModule } from './classe/classe.module';
import { ClassesRelationModule } from './classes-relation/classes-relation.module';

@Module({
  imports: [UserModule, PublicModule, AuthModule, ClasseModule, ClassesRelationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
