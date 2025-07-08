class HomePage extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div id="home-page" class="h-full flex flex-col justify-center items-center px-6 py-12 transition-colors">
                <h1 class="text-5xl font-bold mb-4 text-center tracking-tight">
                    🎬 MovieMatch
                </h1>

                <p class="text-xl text-center max-w-md mb-10 text-gray-700 dark:text-gray-300">
                    Watch better. Together. Match movies you both want to see.
                </p>

                <theme-switcher class="w-15 h-15 mb-10"></theme-switcher>

                <button data-link='/login' class="primary-btn text-xl w-[200px]">
                    Login
                </button>
                <button data-link='/register' class="mt-5 primary-btn text-xl w-[200px]">
                    Register
                </button>

                <footer class="mt-auto pt-12 text-sm text-gray-400 dark:text-gray-500 text-center">
                    © ${new Date().getFullYear()} MovieMatch. Built with ❤️ using Vanilla JS.
                </footer>
            </div>
        `;
    }
}
customElements.define('home-page', HomePage);

export default HomePage;