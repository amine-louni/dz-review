import { auth } from "../api";
import { useAppDispatch } from "../redux/hooks"
import { setUser } from "../redux/slices/userSlice";

export const useAuth = () => {

    const dispatch = useAppDispatch();

    const logoutHandler = async () => {
        try {

            const response = await auth.get('/logout');

            if (!response) return;

            dispatch(setUser({ accessToken: null, data: null }))
        } catch (error) {
            console.error(error)
        }

    }


    return { logoutHandler }



}