import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { CryptographyService } from '../../domain/account/user/services/cryptography-service';

@Injectable()
export class BcryptCryptographyService implements CryptographyService {
  async hash(textToHash: string): Promise<string> {
    return bcrypt.hash(textToHash, 10);
  }

  async compare(text: string, hash: string): Promise<boolean> {
    return bcrypt.compare(text, hash);
  }
}
