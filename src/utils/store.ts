import type { Theme, User } from '../types/storeTypes';
import useSignal from './useSignal';

const createPersistentStore = <T>(key: string, defaultValue: T) => {
    const stored = localStorage.getItem(key);
    const parsed = stored ? JSON.parse(stored) : defaultValue;
    const signal = useSignal<T>(parsed);

    signal.subscribe(() => {
        localStorage.setItem(key, JSON.stringify(signal()));
    });

    return signal;
}

export const themeStore = createPersistentStore<Theme>('sm-movie-match-theme-store', 'light');
export const userStore = createPersistentStore<User | null>('sm-movie-match-user-store', null);