import { describe, it, expect } from "vitest";
import type { HashingProvider } from "../src/core/ports/hashing.provider";
import { LoginUseCase } from "../src/core/use-cases/login.use-case";

class FakeHashingProvider implements HashingProvider {
  async hash(plain: string) {
    return `fake:${plain}`;
  }

  async compare(plain: string, hashed: string) {
    return hashed === `fake:${plain}`;
  }
}

describe("LoginUseCase", () => {
  const users = [
    { email: "ana@example.com", passwordHash: "fake:senha-secreta" },
  ];
  const login = new LoginUseCase(new FakeHashingProvider(), users);

  it("logs in with the correct password", async () => {
    const result = await login.execute({
      email: "ana@example.com",
      password: "senha-secreta",
    });
    expect(result).toEqual({ email: "ana@example.com" });
  });

  it("rejects a wrong password", async () => {
    await expect(
      login.execute({ email: "ana@example.com", password: "errada" }),
    ).rejects.toThrow("Invalid credentials");
  });
});
