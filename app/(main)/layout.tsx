import SideNavigation from "@/components/common/SideNavigation/SideNavigation";
import { testAuthFetcher } from "@/modules/Auth/Api";
import { cookies } from "next/dist/client/components/headers";

export default async function MainLayout({ authorized, unauthorized }: { authorized: React.ReactNode, unauthorized: React.ReactNode }) {
    const cookiesStore = cookies()
    const accessToken = cookiesStore.get('accessToken');

    if (accessToken) {
        const isAuth = await testAuthFetcher(accessToken.value.toString());
        if (isAuth) {
            return (
                <div className="container">
                    <div className="pageWrapper">
                        <SideNavigation />
                        <div className="content">
                            {authorized}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <>
                    {unauthorized}
                </>
            )
        }
    }

    if (!accessToken) {
        return (
            <>
                {unauthorized}
            </>
        )
    }
}