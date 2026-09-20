import { usersRepository } from "../repositories/users.repository";
import { hashPassword } from "../lib/passwords";

export const usersService = {
  async addMember(
    organizationId: string,
    email: string,
    password: string,
    displayName: string,
  ) {
    const passwordHash = await hashPassword(password);
    return usersRepository.create({
      organizationId,
      email,
      password: passwordHash,
      displayName,
      role: "member",
    });
  },

  async listMembers(organizationId: string) {
    return usersRepository.listByOrganization(organizationId);
  },
};
