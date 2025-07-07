class HomePage extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div id="home-page">
                <h1 class="text-4xl text-center">Hello Frameworkless Movement</h1>
                <button data-link="/login" class="mx-auto mt-6 block bg-blue-600 text-white px-4 py-2 w-[100px] rounded hover:bg-blue-700 transition duration-200 cursor-pointer">Login</button>
            </div>
        `;
    }
}
customElements.define('home-page', HomePage);

export default HomePage;