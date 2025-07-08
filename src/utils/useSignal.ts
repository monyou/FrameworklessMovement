type Signal<T> = {
    (): T;
    subscribe: (fn: () => void) => void;
    set: (value: T) => void;
};

const useSignal = <T>(initialState: T): Signal<T> => {
    let value = initialState;
    const subscribers = new Set<() => void>();

    const signal = () => value;
    signal.subscribe = (fn: () => void) => subscribers.add(fn);
    signal.set = (v: T) => {
        value = v;
        subscribers.forEach(fn => fn());
    };

    return signal;
}


export default useSignal;