import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OwnerService } from '../owner/owner.service';
import { OwnerModule } from '../owner/owner.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
@Module({
  providers: [AuthService, OwnerService, LocalStrategy, JwtStrategy],
  imports: [
    PassportModule,
    OwnerModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('auth.key'),
        signOptions: { expiresIn: '600s' },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
