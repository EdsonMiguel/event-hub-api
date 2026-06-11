import { Injectable } from '@nestjs/common';
import { SlugGenerator } from '../../domain/event-manager/event/services/slug-generator';

@Injectable()
export class TextToSlugGenerator implements SlugGenerator {
  generate(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
  }
}
