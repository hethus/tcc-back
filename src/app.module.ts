import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PublicModule } from './public/public.module';
import { AuthModule } from './auth/auth.module';
import { FormModule } from './form/form.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [UserModule, PublicModule, AuthModule, FormModule, QuestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
