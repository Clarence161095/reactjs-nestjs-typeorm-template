import { Injectable } from '@nestjs/common';
import open from 'open';

@Injectable()
export default class AppService {
  async openSwagger(): Promise<void> {
    // TODO Config this
    const url = 'https://abc.herokuapp.com/api';

    await open(url);
  }
}
