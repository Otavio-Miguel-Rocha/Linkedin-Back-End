import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { PublicationModule } from './publication/publication.module';
import { Publication } from './publication/entities/publication.entity';
import { FileModule } from './file/file.module';
import { File } from './file/entities/file.entity';
import { ConnectionModule } from './connection/connection.module';
import { Connection } from './connection/entities/connection.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      logging: true,
      logger: 'advanced-console',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'linkedin',
      entities: [
        User,
        Publication,
        File,
        Connection
      ],
      synchronize: true,
    }),
    UserModule,
    PublicationModule,
    FileModule,
    ConnectionModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
