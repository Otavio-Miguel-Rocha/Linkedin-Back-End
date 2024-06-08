import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { log } from 'console';
import { Publication } from 'src/publication/entities/publication.entity';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if(createUserDto.password != createUserDto.passwordConfirm){
      throw new HttpException("As senhas não coincidem!", HttpStatus.BAD_REQUEST);
    }
    try{
      return await this.userRepository.save(createUserDto);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('E-mail existente no sistema!', HttpStatus.CONFLICT);
      }
    }
  }

  async findOne(id: number) : Promise<User>{
    return await this.userRepository.findOne({
      where: { id },
      relations: ['publications'],
    });
  }

  async findPublicationsByUser(id: number): Promise<Publication[]> {
    const user : User = await this.findOne(id);
    return user.publications;
  }
}
