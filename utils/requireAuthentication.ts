import { GetServerSideProps, GetServerSidePropsContext } from "next";

export function requireAuthentication(gssp: GetServerSideProps) {
    return async (context: GetServerSidePropsContext) => {
        try {
            const { req } = context;
            const token = req.cookies.accessToken;

            if (!token) {
                // Redirect to login page
                return {
                    redirect: {
                        destination: '/login',
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