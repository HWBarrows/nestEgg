import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { SpendController } from './spend.controller';
import { SpendService } from './spend.service';
import { SpendAccount, SpendAccountSchema } from './spendAccount';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SpendAccount.name, schema: SpendAccountSchema },
    ]),
  ],
  //controllers: [CatsController],
  providers: [SpendService],
})
export class SpendModule {}
