import { RoqAuth } from "@roq/nextjs";
import { prisma } from "server/db";
import { roqClient } from "server/roq";

export default RoqAuth({
  hooks: {
    onRegisterSuccess: async ({ session, user, state }) => {
      const { role, restaurantName } = JSON.parse(
        Buffer.from(state, "base64").toString()
      );
      if (role === "guest") {
        await prisma.guest.create({
          data: {
            roqUserId: user.id,
          },
        });
        await roqClient
          .asSuperAdmin()
          .assignRolesToUser({ userId: user.id, roleKeys: ["guest"] });
      } else if (role === "owner") {
        const restaurant = await prisma.restaurant.create({
          data: {
            name: restaurantName,
          },
        });
        await prisma.owner.create({
          data: {
            restaurantId: restaurant.id,
            roqUserId: user.id,
          },
        });
        await roqClient
          .asSuperAdmin()
          .assignRolesToUser({ userId: user.id, roleKeys: ["owner"] });
      } else if (role === "employee") {
        await prisma.owner.create({
          data: {
            restaurantId: "49fadd13-e5fd-4719-b2f1-181db409a4c5",
            roqUserId: user.id,
          },
        });
        await roqClient
          .asSuperAdmin()
          .assignRolesToUser({ userId: user.id, roleKeys: ["owner"] });
      }
    },
  },
});
