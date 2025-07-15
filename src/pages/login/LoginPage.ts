import z from "zod";
import { navigate } from "../../utils/router";
import useSignal from "../../utils/useSignal";
import type { LoginFormStore } from "../../types/formTypes";
import callServer from "../../utils/server";
import { userStore } from "../../utils/store";
import type { LoginResponse } from "../../types/apiTypes";

const loginSchema = z.object({
    email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters long")
        .refine(val => /[A-Z]/.test(val), {
            message: "Password must contain at least one uppercase letter",
        })
        .refine(val => /\d/.test(val), {
            message: "Password must contain at least one number",
        })
        .refine(val => /[!@#$%^&*(),.?":{}|<>_\-\\[\]\/~`+=;]/.test(val), {
            message: "Password must contain at least one special character",
        }),
});

class LoginPage extends HTMLElement {
    loginFormSubmitted = false;
    loginFormStore = useSignal<LoginFormStore>({
        email: {
            value: "",
            error: "",
        },
        password: {
            value: "",
            error: "",
        },
    });

    emailInput!: HTMLInputElement;
    emailError!: HTMLSpanElement;
    passwordInput!: HTMLInputElement;
    passwordError!: HTMLSpanElement;

    connectedCallback() {
        this.render();

        this.emailInput = this.querySelector('#email') as HTMLInputElement;
        this.emailError = this.querySelector('#email-error') as HTMLSpanElement;
        this.passwordInput = this.querySelector('#password') as HTMLInputElement;
        this.passwordError = this.querySelector('#password-error') as HTMLSpanElement;

        this.addEventListener('click', this.clickHandler);
        this.addEventListener('input', this.inputHandler);
        this.addEventListener('submit', this.submitHandler);

        this.loginFormStore.subscribe(() => {
            if (this.loginFormStore().email.error) {
                this.emailError.textContent = this.loginFormStore().email.error;
                this.emailError.classList.remove('hidden');
                this.emailInput.classList.add('border-red-500');
            } else {
                this.emailError.classList.add('hidden');
                this.emailError.textContent = "";
                this.emailInput.classList.remove('border-red-500');
            }
            if (this.loginFormStore().password.error) {
                this.passwordError.textContent = this.loginFormStore().password.error;
                this.passwordError.classList.remove('hidden');
                this.passwordInput.classList.add('border-red-500');
            } else {
                this.passwordError.classList.add('hidden');
                this.passwordError.textContent = "";
                this.passwordInput.classList.remove('border-red-500');
            }
        });
    }

    clickHandler = (e: MouseEvent) => {
        if ((e.target as HTMLElement).matches('#login-form #login-btn')) {
            e.preventDefault();
            this.handleLoginSubmit();
        }
    }

    submitHandler = (e: SubmitEvent) => {
        if ((e.target as HTMLElement).matches('#login-form')) {
            e.preventDefault();
            this.handleLoginSubmit();
        }
    }

    inputHandler = (e: Event) => {
        if ((e.target as HTMLElement).matches('#login-form #email')) {
            this.loginFormStore().email.value = (e.target as HTMLInputElement).value;
            if (this.loginFormSubmitted) {
                this.validateLoginForm(["email"]);
            }
        } else if ((e.target as HTMLElement).matches('#login-form #password')) {
            this.loginFormStore().password.value = (e.target as HTMLInputElement).value;
            if (this.loginFormSubmitted) {
                this.validateLoginForm(["password"]);
            }
        }
    }

    validateLoginForm = (keys?: (keyof LoginFormStore)[]) => {
        const { success, error } = loginSchema.safeParse({
            email: this.loginFormStore().email.value,
            password: this.loginFormStore().password.value,
        });

        for (const key of keys || Object.keys(this.loginFormStore()) as (keyof LoginFormStore)[]) {
            const errMsg =
                error?.issues.find((i) => i.path.includes(key))?.message || "";
            this.loginFormStore.set({ ...this.loginFormStore(), [key]: { ...this.loginFormStore()[key], error: errMsg } });
        }

        return success;
    };

    handleLoginSubmit = async () => {
        this.loginFormSubmitted = true;

        const ok = this.validateLoginForm();

        if (!ok) return;

        const response = await callServer<LoginResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email: this.loginFormStore().email.value,
                password: this.loginFormStore().password.value,
            }),
        });

        if (!response?.data) return;

        userStore.set({ email: response.data.email, firstName: response.data.firstName, gpsEnabled: false });
        navigate("/app");
    };

    render() {
        this.innerHTML = `
            <div id="login-page" class="flex flex-col items-center justify-center h-full">
                <h1 class="text-4xl mb-6">Login</h1>
                <form id="login-form" class="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-96" novalidate>
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-medium">Email</label>
                        <input type="email" id="email" name="email" required class="${this.loginFormStore().email.error ? 'border-red-500' : ''} mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <span id="email-error" class="${this.loginFormStore().email.error ? '' : 'hidden'} text-red-500 text-sm mt-1 pl-2">${this.loginFormStore().email.error}</span>
                    </div>
                    <div class="mb-6">
                        <label for="password" class="block text-sm font-medium">Password</label>
                        <input type="password" id="password" name="password" required class="${this.loginFormStore().password.error ? 'border-red-500' : ''} mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <span id="password-error" class="${this.loginFormStore().password.error ? '' : 'hidden'} text-red-500 text-sm mt-1 pl-2">${this.loginFormStore().password.error}</span>
                    </div>
                    <button id="login-btn" class="w-full primary-btn">Login</button>
                </form>
            </div>
            <toast-component></toast-component>
            <loader-component></loader-component>
        `;
    }
}
customElements.define('login-page', LoginPage);

export default LoginPage;