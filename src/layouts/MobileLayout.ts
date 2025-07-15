import { navigate } from "../utils/router";
import callServer from "../utils/server";
import { userStore } from "../utils/store";

class MobileLayout extends HTMLElement {
    connectedCallback() {
        this.render();
        this.addEventListener('click', this.clickHandler);
    }

    clickHandler = async (e: MouseEvent) => {
        if ((e.target as HTMLElement).matches('#logout-btn, #logout-btn *')) {
            e.preventDefault();
            this.logout();
        }
    }

    logout = async () => {
        const response = await callServer('/auth/logout');

        if (!response) return;

        userStore.set(null);
        navigate('/login');
    }

    render() {
        this.innerHTML = `
            <div id="mobile-layout" class="flex flex-col min-h-screen">
                <header class="bg-gray-800 text-white p-4">
                    <nav class="container mx-auto">
                        <ul class="flex space-x-4 items-center">
                            <li><a href="/" data-link class="hover:underline">Home</a></li>
                            <li class="ml-auto">Hi, ${userStore()?.firstName || 'User'}</li>
                            <li class="w-10 h-10"><theme-switcher></theme-switcher></li>
                            <li>
                                <button id="logout-btn" class="flex items-center space-x-2 cursor-pointer rounded-full p-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main class="flex-grow container mx-auto p-4" id="app-content"></main>
                <footer class="bg-gray-800 text-white p-4 text-center">
                    <p>© ${new Date().getFullYear()} MovieMatch. Built with ❤️ using Vanilla JS.</p>
                </footer>
            </div>
            <toast-component></toast-component>
            <loader-component></loader-component>
        `;
    }
}
customElements.define('mobile-layout', MobileLayout);

export default MobileLayout;