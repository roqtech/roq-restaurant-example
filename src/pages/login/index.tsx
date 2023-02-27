import { requireNextAuth } from "@roq/nextjs";
import AuthLayout from "layout/auth/auth.layout";
import { useState } from "react";
import { Select, Button, Flex, Center, Input } from "@chakra-ui/react";

const LoginPage = function () {
  const [role, setRole] = useState("guest");
  const [restaurantName, setRestaurantName] = useState("");
  const signIn = () => {
    if (typeof window !== "undefined") {
      if (role === "owner") {
        window.location.href = `http://localhost:3000/api/auth/login?role=${role}&restaurantName=${restaurantName}`;
      } else if (role === "guest") {
        window.location.href = `http://localhost:3000/api/auth/login?role=${role}`;
      }
    }
  };
  const signUp = () => {
    if (typeof window !== "undefined") {
      if (role === "owner") {
        window.location.href = `http://localhost:3000/api/auth/signup?role=${role}&restaurantName=${restaurantName}`;
      } else if (role === "guest") {
        window.location.href = `http://localhost:3000/api/auth/signup?role=${role}`;
      }
    }
  };
  return (
    <AuthLayout>
      <Center h="calc(100vh)">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="1em"
        >
          <Flex flexDirection="column" gap="1em">
            <Select
              size="md"
              onChange={(e) => {
                setRole(e.target.value);
              }}
              value={role}
              placeholder="Select your role"
            >
              <option value="guest">Guest</option>
              <option value="owner">Owner</option>
            </Select>
            {role === "owner" && (
              <Input
                value={restaurantName}
                onChange={(e) => {
                  setRestaurantName(e.target.value);
                }}
                placeholder="Restaurant name"
                size="lg"
              />
            )}
          </Flex>
          <Flex gap="1em" flexDirection="column">
            <Button
              isDisabled={role === "owner" && !restaurantName}
              size="lg"
              onClick={signUp}
            >
              Register
            </Button>
            <Button
              size="lg"
              onClick={signIn}
            >
              Login
            </Button>
          </Flex>
        </Flex>
      </Center>
    </AuthLayout>
  );
};

export default requireNextAuth({
  redirectIfAuthenticated: true,
  redirectTo: "/",
})(LoginPage);
