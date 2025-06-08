import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Picture } from './entities/picture.entity';

@Injectable()
export class PictureRepository extends Repository<Picture> {
  constructor(private readonly dataSource: DataSource) {
    super(Picture, dataSource.createEntityManager());
  }

  async savePicture(url: string, key: string): Promise<Picture> {
    const picture = this.create({ url, key });
    return await this.save(picture);
  }

  async getPicture(id: number): Promise<Picture | null> {
    const picture = await this.findOne({ where: { id } });
    return picture || null;
  }
}
