import bcrypt from "bcryptjs";
import type { HashingProvider } from "../core/ports/hashing.provider";

export class BcryptHashingProvider implements HashingProvider {
  constructor(private readonly rounds = 10) {}

  hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.rounds);
  }

  compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
