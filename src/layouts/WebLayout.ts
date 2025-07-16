import { userStore } from "../utils/store";

class WebLayout extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        const currentPath = window.location.pathname;

        this.innerHTML = `
            <div id="web-layout" class="flex flex-col min-h-screen">
                <header class="bg-gray-800 text-white p-4">
                    <nav class="container mx-auto">
                        <ul class="flex space-x-4 items-center">
                            <li><a href="/" data-link class="hover:underline ${currentPath === '/app' ? 'text-yellow-500' : ''}">Home</a></li>
                            <li><a href="/logs" data-link class="hover:underline ${currentPath === '/logs' ? 'text-yellow-500' : ''}">Logs</a></li>
                            <li class="ml-auto">Hi, ${userStore()?.firstName || 'User'}</li>
                            <li>
                                <button 
                                    data-link="/profile"
                                    class="rounded-full p-2 transition-colors duration-200 bg-gray-700 cursor-pointer hover:bg-gray-600"
                                    title="Profile"
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        class="h-6 w-6" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <circle cx="12" cy="8" r="4" class="fill-current ${currentPath === '/profile' ? 'text-yellow-500' : 'text-gray-300'}"/>
                                        <path 
                                            stroke-linecap="round" 
                                            stroke-linejoin="round" 
                                            stroke-width="2" 
                                            d="M6 20c0-2.21 3.58-4 8-4s8 1.79 8 4"
                                            class="stroke-current ${currentPath === '/profile' ? 'text-yellow-500' : 'text-gray-300'}"
                                        />
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
customElements.define('web-layout', WebLayout);

export default WebLayout;