import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { auth } from "../api";

export function authed(gssp: GetServerSideProps) {
    return async (context: GetServerSidePropsContext) => {
        try {
            const jid = context.req.cookies.jid;

            if (jid) {
                // Redirect to login page
                return {
                    redirect: {
                        destination: '/',
                        statusCode: 302
                    }
                };
            }
        } catch (_error) {
            return {
                redirect: {
                    destination: '/login',
                    statusCode: 302
                }
            };
        }

        return await gssp(context); // Continue on to call `getServerSideProps` logic
    }
}


export const refreshUserToken = async () => {
    try {
        const response = await auth.get('/refresh-token');
        return response.data
    } catch (error) {
        console.error(error)
    }


}