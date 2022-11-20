import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { connect } from './db/connect';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OwnerService } from './owner/owner.service';
import { OwnerModule } from './owner/owner.module';
import { SpendService } from './spend/spend.service';
import { SpendModule } from './spend/spend.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  imports: [MongooseModule.forRoot(connect()), OwnerModule, SpendModule, AuthModule],
  providers: [AppService, OwnerService, SpendService, AuthService],
})
export class AppModule {}
