import useSignal from './useSignal';

type GlobalStore = {
    theme: 'light' | 'dark';
}

const createPersistentStore = <T>(key: string, defaultValue: T) => {
    const stored = localStorage.getItem(key);
    const parsed = stored ? JSON.parse(stored) : defaultValue;
    const signal = useSignal<T>(parsed);

    signal.subscribe(() => {
        localStorage.setItem(key, JSON.stringify(signal()));
    });

    return signal;
}

const initialGlobalStore: GlobalStore = {
    theme: 'light',
};

export const globalStore = createPersistentStore<GlobalStore>('fm-global-store', initialGlobalStore);