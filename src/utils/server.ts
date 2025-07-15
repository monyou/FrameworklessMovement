import { hideLoader, showLoader } from "../components/Loader";
import { showToast } from "../components/Toast";
import type { ServerResponse } from "../types/apiTypes";
import { navigate } from "./router";
import { userStore } from "./store";

const callServer = async <T>(endpoint: string, options: RequestInit = {}): Promise<ServerResponse<T> | null> => {
    try {
        showLoader();
        const url = `${import.meta.env.VITE_SERVER_URL}${endpoint}`;
        const response = await fetch(url, {
            method: 'GET',
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            credentials: 'include'
        });
        const responseData = await response.json();
        hideLoader();
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                userStore.set(null);
                await navigate('/login');
                showToast(responseData.message, response.status === 401 ? 'warning' : 'error');
                return null;
            } else {
                showToast(responseData.message || 'Error', 'error');
                return null;
            }
        }
        return responseData as ServerResponse<T>;
    } catch (error) {
        hideLoader();
        console.error('Server call error:', error);
        return null;
    }
}

export default callServer;