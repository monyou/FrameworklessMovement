import type { RegisterFormStore } from "../../types/formTypes";
import { navigate } from "../../utils/router";
import useSignal from "../../utils/useSignal";
import type { RegisterResponse } from "../../types/apiTypes";
import callServer from "../../utils/server";
import { registerSchema } from "../../utils/zodSchemas";

class RegisterPage extends HTMLElement {
    registerFormSubmitted = false;
    registerFormStore = useSignal<RegisterFormStore>({
        email: {
            value: "",
            error: "",
        },
        password: {
            value: "",
            error: "",
        },
        confirmPassword: {
            value: "",
            error: "",
        },
        firstName: {
            value: "",
            error: "",
        },
        lastName: {
            value: "",
            error: "",
        },
        age: {
            value: null,
            error: "",
        }
    });

    emailInput!: HTMLInputElement;
    emailError!: HTMLSpanElement;
    passwordInput!: HTMLInputElement;
    passwordError!: HTMLSpanElement;
    confirmPasswordInput!: HTMLInputElement;
    confirmPasswordError!: HTMLSpanElement;
    firstNameInput!: HTMLInputElement;
    firstNameError!: HTMLSpanElement;
    lastNameInput!: HTMLInputElement;
    lastNameError!: HTMLSpanElement;
    ageInput!: HTMLInputElement;
    ageError!: HTMLSpanElement;

    connectedCallback() {
        this.render();

        this.emailInput = this.querySelector('#email') as HTMLInputElement;
        this.emailError = this.querySelector('#email-error') as HTMLSpanElement;
        this.passwordInput = this.querySelector('#password') as HTMLInputElement;
        this.passwordError = this.querySelector('#password-error') as HTMLSpanElement;
        this.confirmPasswordInput = this.querySelector('#confirm-password') as HTMLInputElement;
        this.confirmPasswordError = this.querySelector('#confirm-password-error') as HTMLSpanElement;
        this.firstNameInput = this.querySelector('#first-name') as HTMLInputElement;
        this.firstNameError = this.querySelector('#first-name-error') as HTMLSpanElement;
        this.lastNameInput = this.querySelector('#last-name') as HTMLInputElement;
        this.lastNameError = this.querySelector('#last-name-error') as HTMLSpanElement;
        this.ageInput = this.querySelector('#age') as HTMLInputElement;
        this.ageError = this.querySelector('#age-error') as HTMLSpanElement;

        this.addEventListener('click', this.clickHandler);
        this.addEventListener('input', this.inputHandler);
        this.addEventListener('submit', this.submitHandler);

        this.registerFormStore.subscribe(() => {
            if (this.registerFormStore().email.error) {
                this.emailError.textContent = this.registerFormStore().email.error;
                this.emailError.classList.remove('hidden');
                this.emailInput.classList.add('border-red-500');
            } else {
                this.emailError.classList.add('hidden');
                this.emailError.textContent = "";
                this.emailInput.classList.remove('border-red-500');
            }
            if (this.registerFormStore().password.error) {
                this.passwordError.textContent = this.registerFormStore().password.error;
                this.passwordError.classList.remove('hidden');
                this.passwordInput.classList.add('border-red-500');
            } else {
                this.passwordError.classList.add('hidden');
                this.passwordError.textContent = "";
                this.passwordInput.classList.remove('border-red-500');
            }
            if (this.registerFormStore().confirmPassword.error) {
                this.confirmPasswordError.textContent = this.registerFormStore().confirmPassword.error;
                this.confirmPasswordError.classList.remove('hidden');
                this.confirmPasswordInput.classList.add('border-red-500');
            } else {
                this.confirmPasswordError.classList.add('hidden');
                this.confirmPasswordError.textContent = "";
                this.confirmPasswordInput.classList.remove('border-red-500');
            }
            if (this.registerFormStore().firstName.error) {
                this.firstNameError.textContent = this.registerFormStore().firstName.error;
                this.firstNameError.classList.remove('hidden');
                this.firstNameInput.classList.add('border-red-500');
            } else {
                this.firstNameError.classList.add('hidden');
                this.firstNameError.textContent = "";
                this.firstNameInput.classList.remove('border-red-500');
            }
            if (this.registerFormStore().lastName.error) {
                this.lastNameError.textContent = this.registerFormStore().lastName.error;
                this.lastNameError.classList.remove('hidden');
                this.lastNameInput.classList.add('border-red-500');
            } else {
                this.lastNameError.classList.add('hidden');
                this.lastNameError.textContent = "";
                this.lastNameInput.classList.remove('border-red-500');
            }
            if (this.registerFormStore().age.error) {
                this.ageError.textContent = this.registerFormStore().age.error;
                this.ageError.classList.remove('hidden');
                this.ageInput.classList.add('border-red-500');
            } else {
                this.ageError.classList.add('hidden');
                this.ageError.textContent = "";
                this.ageInput.classList.remove('border-red-500');
            }
        });
    }

    clickHandler = (e: MouseEvent) => {
        if ((e.target as HTMLElement).matches('#register-form #register-btn')) {
            e.preventDefault();
            this.handleRegisterSubmit();
        }
    }

    submitHandler = (e: SubmitEvent) => {
        if ((e.target as HTMLElement).matches('#register-form')) {
            e.preventDefault();
            this.handleRegisterSubmit();
        }
    }

    inputHandler = (e: Event) => {
        if ((e.target as HTMLElement).matches('#register-form #email')) {
            this.registerFormStore().email.value = (e.target as HTMLInputElement).value;
            if (this.registerFormSubmitted) {
                this.validateRegisterForm(["email"]);
            }
        }
        if ((e.target as HTMLElement).matches('#register-form #password')) {
            this.registerFormStore().password.value = (e.target as HTMLInputElement).value;
            if (this.registerFormSubmitted) {
                this.validateRegisterForm(["password", "confirmPassword"]);
            }
        }
        if ((e.target as HTMLElement).matches('#register-form #confirm-password')) {
            this.registerFormStore().confirmPassword.value = (e.target as HTMLInputElement).value;
            if (this.registerFormSubmitted) {
                this.validateRegisterForm(["confirmPassword", "password"]);
            }
        }
        if ((e.target as HTMLElement).matches('#register-form #first-name')) {
            this.registerFormStore().firstName.value = (e.target as HTMLInputElement).value;
            if (this.registerFormSubmitted) {
                this.validateRegisterForm(["firstName"]);
            }
        }
        if ((e.target as HTMLElement).matches('#register-form #last-name')) {
            this.registerFormStore().lastName.value = (e.target as HTMLInputElement).value;
            if (this.registerFormSubmitted) {
                this.validateRegisterForm(["lastName"]);
            }
        }
        if ((e.target as HTMLElement).matches('#register-form #age')) {
            this.registerFormStore().age.value = Number((e.target as HTMLInputElement).value);
            if (this.registerFormSubmitted) {
                this.validateRegisterForm(["age"]);
            }
        }
    }

    validateRegisterForm = (keys?: (keyof RegisterFormStore)[]) => {
        const { success, error } = registerSchema.safeParse({
            email: this.registerFormStore().email.value,
            password: this.registerFormStore().password.value,
            confirmPassword: this.registerFormStore().confirmPassword.value,
            firstName: this.registerFormStore().firstName.value,
            lastName: this.registerFormStore().lastName.value,
            age: this.registerFormStore().age.value,
        });

        for (const key of keys || Object.keys(this.registerFormStore()) as (keyof RegisterFormStore)[]) {
            const errMsg =
                error?.issues.find((i) => i.path.includes(key))?.message || "";
            this.registerFormStore.set({ ...this.registerFormStore(), [key]: { ...this.registerFormStore()[key], error: errMsg } });
        }

        return success;
    };

    handleRegisterSubmit = async () => {
        this.registerFormSubmitted = true;

        const ok = this.validateRegisterForm();

        if (!ok) return;

        const response = await callServer<RegisterResponse>('/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                email: this.registerFormStore().email.value,
                password: this.registerFormStore().password.value,
                firstName: this.registerFormStore().firstName.value,
                lastName: this.registerFormStore().lastName.value,
                age: this.registerFormStore().age.value,
            }),
        });

        if (!response?.data) return;

        navigate("/registration-success");
    }

    render() {
        this.innerHTML = `
            <div id="register-page" class="flex flex-col items-center justify-center h-full">
                <h1 class="text-4xl mb-6">Register</h1>
                <form id="register-form" class="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-96" novalidate>
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-medium">Email</label>
                        <input type="email" id="email" name="email" required class="${this.registerFormStore().email.error ? 'border-red-500' : ''} mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <span id="email-error" class="${this.registerFormStore().email.error ? '' : 'hidden'} text-red-500 text-sm mt-1 pl-2">${this.registerFormStore().email.error}</span>
                    </div>
                    <div class="mb-6">
                        <label for="password" class="block text-sm font-medium">Password</label>
                        <input type="password" id="password" name="password" required class="${this.registerFormStore().password.error ? 'border-red-500' : ''} mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <span id="password-error" class="${this.registerFormStore().password.error ? '' : 'hidden'} text-red-500 text-sm mt-1 pl-2">${this.registerFormStore().password.error}</span>
                    </div>
                    <div class="mb-6">
                        <label for="confirm-password" class="block text-sm font-medium">Confirm Password</label>
                        <input type="password" id="confirm-password" name="confirm-password" required class="${this.registerFormStore().confirmPassword.error ? 'border-red-500' : ''} mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <span id="confirm-password-error" class="${this.registerFormStore().confirmPassword.error ? '' : 'hidden'} text-red-500 text-sm mt-1 pl-2">${this.registerFormStore().confirmPassword.error}</span>
                    </div>
                    <div class="mb-4">
                        <label for="first-name" class="block text-sm font-medium">First Name</label>
                        <input type="text" id="first-name" name="first-name" required class="${this.registerFormStore().firstName.error ? 'border-red-500' : ''} mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <span id="first-name-error" class="${this.registerFormStore().firstName.error ? '' : 'hidden'} text-red-500 text-sm mt-1 pl-2">${this.registerFormStore().firstName.error}</span>
                    </div>
                    <div class="mb-4">
                        <label for="last-name" class="block text-sm font-medium">Last Name</label>
                        <input type="text" id="last-name" name="last-name" required class="${this.registerFormStore().lastName.error ? 'border-red-500' : ''} mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <span id="last-name-error" class="${this.registerFormStore().lastName.error ? '' : 'hidden'} text-red-500 text-sm mt-1 pl-2">${this.registerFormStore().lastName.error}</span>
                    </div>
                    <div class="mb-4">
                        <label for="age" class="block text-sm font-medium">Age</label>
                        <input type="number" id="age" name="age" class="${this.registerFormStore().age.error ? 'border-red-500' : ''} mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <span id="age-error" class="${this.registerFormStore().age.error ? '' : 'hidden'} text-red-500 text-sm mt-1 pl-2">${this.registerFormStore().age.error}</span>
                    </div>
                    <button id="register-btn" class="w-full primary-btn">Register</button>
                    <button id="login-btn" data-link="/login" class="w-full secondary-btn mt-2">Login</button>
                </form>
            </div>
            <toast-component></toast-component>
            <loader-component></loader-component>
        `;
    }
}
customElements.define('register-page', RegisterPage);

export default RegisterPage;