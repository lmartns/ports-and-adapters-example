import { BcryptHashingProvider } from "./adapters/bcrypt.hashing-provider";
import { LoginUseCase } from "./core/use-cases/login.use-case";

const hashing = new BcryptHashingProvider();
const passwordHash = await hashing.hash("senha-secreta");
const users = [{ email: "ana@example.com", passwordHash }];
const login = new LoginUseCase(hashing, users);

try {
  console.log(
    "Success:",
    await login.execute({
      email: "ana@example.com",
      password: "senha-secreta",
    }),
  );
} catch (error) {
  console.log("error:", (error as Error).message);
}
