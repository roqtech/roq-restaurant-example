import AppLayout from "layout/app/app.layout";
import { requireNextAuth } from "@roq/nextjs";

function RestaurantShowPage() {
    return <AppLayout>
        <div>Public restaurant</div>
    </AppLayout>;
}

export default requireNextAuth({
    redirectIfAuthenticated: false,
    redirectTo: "/login",
})(RestaurantShowPage);
