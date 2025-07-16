import useSignal from "../utils/useSignal";

type Movie = { title: string; color: string };

class MoviesDeck extends HTMLElement {
    movies = useSignal<Movie[]>([{
        title: 'Movie 1',
        color: 'bg-sky-600'
    }, {
        title: 'Movie 2',
        color: 'bg-emerald-600'
    }, {
        title: 'Movie 3',
        color: 'bg-rose-600'
    }]);
    startX: number = 0;
    startY: number = 0;
    currentX: number = 0;
    currentY: number = 0;

    moviesDeck!: HTMLDivElement;
    topCard!: HTMLDivElement;

    connectedCallback() {
        this.render();

        this.moviesDeck = this.querySelector('#movies-deck') as HTMLDivElement;

        this.moviesDeck?.classList.add(...(this.getAttribute('class')?.split(' ') || []));

        this.movies.subscribe(() => {
            if (this.topCard) {
                this.topCard.removeEventListener('pointerdown', this.pointerDown);
            }
            this.moviesDeck.innerHTML = this.getMoviesCardsHTML();
            this.attachToTopCard();
        });

        this.attachToTopCard();
    }

    movieSwipeHandler = (like: 1 | -1) => {
        //TODO: Implement movie like/dislike logic
    };

    attachToTopCard = () => {
        const cards = this.moviesDeck.querySelectorAll('.card');
        if (!cards.length) return;

        this.topCard = cards[cards.length - 1] as HTMLDivElement;
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.topCard.addEventListener('pointerdown', this.pointerDown);
    }

    setCardPos = (dx: number, dy: number) => {
        this.topCard.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx * 0.12}deg)`;
    };

    pointerDown = (e: PointerEvent) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.topCard.setPointerCapture(e.pointerId);
        this.topCard.style.transition = '';
        this.moviesDeck.addEventListener('pointermove', this.pointerMove);
        this.moviesDeck.addEventListener('pointerup', this.pointerUp);
    };

    pointerMove = (e: PointerEvent) => {
        this.currentX = e.clientX;
        this.currentY = e.clientY;
        this.setCardPos(this.currentX - this.startX, this.currentY - this.startY);
    };

    pointerUp = (e: PointerEvent) => {
        const dx = e.clientX - this.startX;
        const threshold = 120; // px before we fling away
        const shouldDismiss = Math.abs(dx) > threshold;
        const direction = dx > 0 ? 1 : -1;

        this.moviesDeck.removeEventListener('pointermove', this.pointerMove);
        this.moviesDeck.removeEventListener('pointerup', this.pointerUp);

        if (shouldDismiss) {
            // fling off‑screen
            this.topCard.style.transition = 'transform 0.35s ease-out';
            this.setCardPos(direction * window.innerWidth * 1.2, this.currentY - this.startY);
            this.topCard.addEventListener(
                'transitionend',
                () => {
                    this.topCard.removeEventListener('pointerdown', this.pointerDown);
                    this.topCard.remove();
                    this.attachToTopCard();
                    this.movieSwipeHandler(direction);
                },
                { once: true }
            );
        } else {
            // snap back
            this.topCard.style.transition = 'transform 0.25s ease-out';
            this.setCardPos(0, 0);
        }
    };

    getMoviesCardsHTML = () => {
        return this.movies().map(movie => `
            <div class="card absolute inset-0 rounded-xl ${movie.color} text-white text-3xl font-bold flex items-center justify-center no-select cursor-grab active:cursor-grabbing">
                ${movie.title}
            </div>
        `).join('');
    }

    render() {
        this.innerHTML = `
            <div id="movies-deck" class="relative mx-auto">
                ${this.getMoviesCardsHTML()}
            </div>
        `;
    }
}

export default MoviesDeck;
