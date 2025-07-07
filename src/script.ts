import './style.css';
import { navigate, renderRoute } from './utils/router';

window.addEventListener('DOMContentLoaded', () => {
    renderRoute();

    document.body.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;

        // #region Navigation handling
        if (target.matches('[data-link]')) {
            e.preventDefault();
            const path = target.getAttribute('data-link');
            if (path) navigate(path);
        }
        // #endregion
    });
});
window.addEventListener('popstate', renderRoute);