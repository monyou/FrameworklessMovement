import useSignal from "../utils/useSignal";

type Toast = {
    id: number;
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning';
};

const toasts = useSignal<Toast[]>([]);

let nextId = 1;

export const showToast = (message: string, type: Toast['type'] = 'info', duration = 3000) => {
    const id = nextId++;
    toasts.set([...toasts(), { id, message, type }]);
    setTimeout(() => {
        toasts.set(toasts().filter((t) => t.id !== id));
    }, duration);
}

export const useToasts = () => {
    return toasts;
}

class ToastComponent extends HTMLElement {
    toasts = useToasts();

    connectedCallback() {
        this.render();
        this.toasts.subscribe(() => {
            this.render();
        })
    }

    render() {
        this.innerHTML = `
            <div class="fixed top-4 right-4 space-y-2 z-50">
                ${this.toasts().map(toast => `
                    <div class="p-3 rounded shadow-md max-w-xs text-white ${toast.type === 'success' ? 'bg-green-500' : toast.type === 'error' ? 'bg-red-500' : toast.type === 'warning' ? 'bg-yellow-500' : 'bg-secondary'}">
                        ${toast.message}
                    </div>
                `).join('')}
            </div>
        `;
    }
}

export default ToastComponent;