import type MoviesDeck from "../../components/MoviesDeck";
import useSignal from "../../utils/useSignal";

class DashboardPage extends HTMLElement {
    count = useSignal(0);

    countBtn!: HTMLButtonElement;
    moviesDeckComponent!: MoviesDeck;

    connectedCallback() {
        this.render();
        this.addEventListener('click', this.clickHandler);

        this.countBtn = this.querySelector('#count-btn') as HTMLButtonElement;
        this.moviesDeckComponent = this.querySelector('movies-deck') as MoviesDeck;

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
        this.moviesDeckComponent.movies.set(new Array(3).fill(null).map((_, i) => ({
            title: `Movie ${i + 1}`,
            color: ['bg-sky-600', 'bg-emerald-600', 'bg-rose-600'][i % 3]
        })));
    }

    render() {
        this.innerHTML = `
            <div id="dashboard-page" class="p-4">
                <h1 class="text-4xl text-center mb-6">Dashboard</h1>
                <p class="text-center text-gray-500">Welcome to your dashboard!</p>
                <button id="count-btn" class="mt-4 mx-auto block primary-btn">Count: ${this.count()}</button>
                <movies-deck class="mt-8 w-70 h-[430px]"></movies-deck>
            </div>      
        `;
    }
}
customElements.define('dashboard-page', DashboardPage);

export default DashboardPage;