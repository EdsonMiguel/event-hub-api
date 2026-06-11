import { UseCaseError } from './use-case-error';

export class ConflictError extends UseCaseError {
  constructor(error: string) {
    super(error);
  }
}
