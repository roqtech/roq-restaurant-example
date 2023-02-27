import AppLayout from "layout/app/app.layout";
import { requireNextAuth } from "@roq/nextjs";

function RestaurantsPage() {
  return (
    <AppLayout>
      <div>All restaurant</div>
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: "/login",
})(RestaurantsPage);
