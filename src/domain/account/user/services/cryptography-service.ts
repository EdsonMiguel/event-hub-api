export abstract class CryptographyService {
  abstract hash(textToHash: string): Promise<string>;
  abstract compare(text: string, hash: string): Promise<boolean>;
}
