import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PublicationService {
  constructor(
    
    @InjectRepository(Publication)
    private publicationRepository: Repository<Publication>,
    private readonly userService: UserService){}


  async create(createPublicationDto: CreatePublicationDto) {
    const user : User = await this.userService.findOne(createPublicationDto.ownerID);
    const publication : Publication = {
      id: 0,
      description: "Vasco da Gama",
      owner: user,
      attachments: []
    }
    return await this.publicationRepository.save(publication);
  }
}
