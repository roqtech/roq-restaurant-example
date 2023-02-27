import AppLayout from "layout/app/app.layout";
import { requireNextAuth } from "@roq/nextjs";
import { withAuthorization } from "hocs/withAuthorization";

function RestaurantShowPage() {
  return (
    <AppLayout>
      <div>Owner restaurant</div>
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: "/login",
})(
  withAuthorization({ allowedRoles: ["owner", "employee"] })(RestaurantShowPage)
);
