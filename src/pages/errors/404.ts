class NotFoundPage extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div id="not-found-page" class="flex flex-col items-center justify-center h-screen bg-gray-100">
                <h1 class="text-4xl mb-6">404 - Page Not Found</h1>
                <p class="text-lg mb-4">The page you are looking for does not exist.</p>
                <button data-link="/" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 cursor-pointer">
                    Go to Home
                </button>
            </div>
        `;
    }
}
customElements.define('not-found-page', NotFoundPage);

export default NotFoundPage;