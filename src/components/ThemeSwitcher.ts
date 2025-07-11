import { themeStore } from "../utils/store";


class ThemeSwitcher extends HTMLElement {
    connectedCallback() {
        this.render();
        themeStore.subscribe(() => {
            document.documentElement.classList.toggle('dark', themeStore() === 'dark');
        });
        this.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.matches('#theme-btn, #theme-btn *')) {
                themeStore.set(themeStore() === 'light' ? 'dark' : 'light');
            }
        });
    }

    render() {
        this.innerHTML = `
            <button
                id="theme-btn"
                class="w-full h-full flex items-center justify-center p-3 rounded-full transition-colors duration-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none cursor-pointer"
                aria-label="Toggle dark mode"
            >
                <span class="block dark:hidden">
                    <!-- Sun icon for light mode -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="currentColor"/>
                        <path stroke="currentColor" stroke-width="2" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                    </svg>
                </span>
                <span class="hidden dark:block">
                    <!-- Moon icon for dark mode -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke="currentColor" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="currentColor"/>
                    </svg>
                </span>
            </button>
        `;
    }
}

export default ThemeSwitcher;
