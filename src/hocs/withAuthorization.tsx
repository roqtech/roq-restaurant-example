import React, { ComponentType } from "react";
import { useSession } from "@roq/ui-react";
import AppLayout from "../layout/app/app.layout";

export interface WithAuthorizationPropsInterface {
  allowedRoles: ("owner" | "guest" | "employee")[];
}

export function withAuthorization(props: WithAuthorizationPropsInterface) {
  return function withAuth<T>(WrappedComponent: React.FC<T>) {
    const outerProps = props;
    const WithAuthorization: React.FC<T> = (props) => {
      const { session } = useSession();
      if (
        session.user.roles.some((role) =>
          outerProps.allowedRoles.some((r) => r === role)
        )
      ) {
        return <WrappedComponent {...props} />;
      } else {
        return <AppLayout>Not Found</AppLayout>;
      }
    };
    return WithAuthorization;
  };
}
