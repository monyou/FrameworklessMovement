import useSignal from "../../utils/useSignal";

class DashboardPage extends HTMLElement {
    count = useSignal(0);

    countBtn!: HTMLButtonElement;

    connectedCallback() {
        this.render();
        this.addEventListener('click', this.clickHandler);

        this.countBtn = this.querySelector('#count-btn') as HTMLButtonElement;

        this.count.subscribe(() => {
            this.countBtn.textContent = `Count: ${this.count()}`;
        });
    }

    clickHandler = (e: MouseEvent) => {
        if ((e.target as HTMLElement).matches('#count-btn')) {
            this.handleCount();
        }
    }

    handleCount = () => {
        this.count.set(this.count() + 1);
    }

    render() {
        this.innerHTML = `
            <div id="dashboard-page" class="p-4">
                <h1 class="text-4xl text-center mb-6">Dashboard</h1>
                <p class="text-center text-gray-500">Welcome to your dashboard!</p>
                <button id="count-btn" class="mt-4 mx-auto block primary-btn">Count: ${this.count()}</button>
            </div>      
        `;
    }
}
customElements.define('dashboard-page', DashboardPage);

export default DashboardPage;