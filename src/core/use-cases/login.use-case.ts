import type { HashingProvider } from "../ports/hashing.provider";

export type StoredUser = { email: string; passwordHash: string };

export class LoginUseCase {
  constructor(
    private readonly hashing: HashingProvider,
    private readonly users: StoredUser[],
  ) {}

  async execute(input: { email: string; password: string }) {
    const user = this.users.find((u) => u.email === input.email);
    const ok =
      user && (await this.hashing.compare(input.password, user.passwordHash));
    if (!user || !ok) throw new Error("Invalid credentials");
    return { email: user.email };
  }
}
