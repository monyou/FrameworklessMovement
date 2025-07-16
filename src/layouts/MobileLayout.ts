class MobileLayout extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        const currentPath = window.location.pathname;

        this.innerHTML = `
            <div id="mobile-layout" class="flex flex-col h-full">
                <main class="flex-grow container mx-auto p-4 overflow-y-auto" id="app-content"></main>
                <footer class="bg-gray-800 text-white p-4 text-center">
                    <nav class="flex justify-around items-center">
                    <button class="flex flex-col items-center focus:outline-none group" data-link="/app" aria-current="${currentPath === '/app' ? 'page' : 'false'}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 ${currentPath === '/app' ? 'text-yellow-500' : 'text-gray-200'} group-hover:text-yellow-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5 0a2 2 0 002-2V7a2 2 0 00-2-2h-3.5a2 2 0 00-2 2v2" />
                        </svg>
                        <span class="text-xs mt-1 ${currentPath === '/app' ? 'text-yellow-500' : 'text-gray-200'}">Home</span>
                    </button>
                    <button class="flex flex-col items-center focus:outline-none group" data-link="/logs" aria-current="${currentPath === '/logs' ? 'page' : 'false'}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 ${currentPath === '/logs' ? 'text-yellow-500' : 'text-gray-200'} group-hover:text-yellow-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <rect x="4" y="4" width="16" height="16" rx="2" stroke-width="2" stroke="currentColor" fill="none"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9h8M8 13h6M8 17h4" />
                        </svg>
                        <span class="text-xs mt-1 ${currentPath === '/logs' ? 'text-yellow-500' : 'text-gray-200'}">Logs</span>
                    </button>
                    <button class="flex flex-col items-center focus:outline-none group" data-link="/profile" aria-current="${currentPath === '/profile' ? 'page' : 'false'}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 ${currentPath === '/profile' ? 'text-yellow-500' : 'text-gray-200'} group-hover:text-yellow-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span class="text-xs mt-1 ${currentPath === '/profile' ? 'text-yellow-500' : 'text-gray-200'}">Profile</span>
                    </button>
                    </nav>
                </footer>
            </div>
            <toast-component></toast-component>
            <loader-component></loader-component>
        `;
    }
}
customElements.define('mobile-layout', MobileLayout);

export default MobileLayout;