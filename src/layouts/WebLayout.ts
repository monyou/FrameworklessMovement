class WebLayout extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div id="web-layout" class="flex flex-col min-h-screen">
                <header class="bg-gray-800 text-white p-4">
                    <nav class="container mx-auto">
                        <ul class="flex space-x-4 items-center">
                            <li><a href="/" data-link class="hover:underline">Home</a></li>
                            <li class="ml-auto w-10 h-10"><theme-switcher></theme-switcher></li>
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