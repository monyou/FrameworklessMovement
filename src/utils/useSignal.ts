type Signal<T> = {
    (): T;
    subscribe: (fn: () => void) => void;
    set: (value: T) => void;
};

const useSignal = <T>(initialState: T): Signal<T> => {
    let value = initialState;
    const subscribers = new Set<() => void>();

    const read = () => value;
    read.subscribe = (fn: () => void) => subscribers.add(fn);
    read.set = (v: T) => {
        value = v;
        subscribers.forEach(fn => fn());
    };

    return read;
}


export default useSignal;