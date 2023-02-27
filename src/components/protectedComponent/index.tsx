import { PropsWithChildren } from "react";
import { useSession } from "@roq/ui-react";
import { WithAuthorizationPropsInterface } from "hocs/withAuthorization";

export function ProtectedComponent(
  props: PropsWithChildren<WithAuthorizationPropsInterface>
) {
  const { children, allowedRoles } = props;
  const { session } = useSession();
  if (
    session.user.roles.some((role) =>
      props.allowedRoles.some((r) => r === role)
    )
  ) {
    return <>{children}</>;
  }
  return null;
}
