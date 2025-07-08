import { navigate } from "../../utils/router";

class RegisterPage extends HTMLElement {
    connectedCallback() {
        this.render();
        this.addEventListener('click', this.clickHandler);
    }

    clickHandler = (e: MouseEvent) => {
        if ((e.target as HTMLElement).matches('#register-form #register-btn')) {
            e.preventDefault();
            this.handleRegister();
        }
    }

    handleRegister = async () => {
        navigate('/app');
    }

    render() {
        this.innerHTML = `
            <div id="register-page" class="flex flex-col items-center justify-center h-full">
                <h1 class="text-4xl mb-6">Register</h1>
                <form id="register-form" class="bg-gray-800 p-8 rounded shadow-md w-96" novalidate>
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-medium">Email</label>
                        <input type="email" id="email" name="email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    </div>
                    <div class="mb-6">
                        <label for="password" class="block text-sm font-medium">Password</label>
                        <input type="password" id="password" name="password" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    </div>
                    <button id="register-btn" class="w-full primary-btn">Register</button>
                </form>
            </div>
            <toast-component></toast-component>
            <loader-component></loader-component>
        `;
    }
}
customElements.define('register-page', RegisterPage);

export default RegisterPage;