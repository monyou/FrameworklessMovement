class WebLayout extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div id="web-layout" class="flex flex-col min-h-screen">
                <header class="bg-gray-800 text-white p-4">
                    <nav class="container mx-auto">
                        <ul class="flex space-x-4">
                            <li><a href="/" data-link class="hover:underline">Home</a></li>
                            <li><a href="/login" data-link class="hover:underline">Login</a></li>
                        </ul>
                    </nav>
                </header>               
                <main class="flex-grow container mx-auto p-4" id="app-content"></main>
                <footer class="bg-gray-800 text-white p-4 text-center">
                    <p>&copy; ${new Date().getFullYear()} Frameworkless Movement</p>
                </footer>
            </div>
            <toast-component></toast-component>
            <loader-component></loader-component>
        `;
    }
}
customElements.define('web-layout', WebLayout);

export default WebLayout;