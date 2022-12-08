import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PublicModule } from './public/public.module';
import { AuthModule } from './auth/auth.module';
import { ClasseModule } from './classe/classe.module';
import { ClassesRelationModule } from './classes-relation/classes-relation.module';
import { FormModule } from './form/form.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    UserModule,
    PublicModule,
    AuthModule,
    FormModule,
    QuestionModule,
    ClasseModule,
    ClassesRelationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
