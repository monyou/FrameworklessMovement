import { navigate } from "../../utils/router";

class LoginPage extends HTMLElement {
    connectedCallback() {
        this.render();
        this.addEventListener('click', this.clickHandler);
    }

    clickHandler = (e: MouseEvent) => {
        if ((e.target as HTMLElement).matches('#login-form #login-btn')) {
            e.preventDefault();
            this.handleLogin();
        }
    }

    handleLogin = async () => {
        navigate('/app');
    }

    render() {
        this.innerHTML = `
            <div id="login-page" class="flex flex-col items-center justify-center h-full">
                <h1 class="text-4xl mb-6">Login</h1>
                <form id="login-form" class="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-96" novalidate>
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-medium">Email</label>
                        <input type="email" id="email" name="email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    </div>
                    <div class="mb-6">
                        <label for="password" class="block text-sm font-medium">Password</label>
                        <input type="password" id="password" name="password" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
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