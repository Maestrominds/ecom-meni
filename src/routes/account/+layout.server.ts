import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) => {
    const userToken = cookies.get('user_token');
    return {
        isAuthenticated: !!userToken
    };
};
