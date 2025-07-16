class LogsPage extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div id="logs-page" class="p-4">
                <h1 class="text-4xl text-center mb-6">Logs</h1>
                <p class="text-center text-gray-500">Welcome to your logs!</p>
            </div>      
        `;
    }
}
customElements.define('logs-page', LogsPage);

export default LogsPage;