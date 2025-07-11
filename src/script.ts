import './style.css';
import Toast from './components/Toast';
import LoaderComponent from './components/Loader';
import ThemeSwitcher from './components/ThemeSwitcher';
import { navigate, renderRoute } from './utils/router';
import { themeStore } from './utils/store';

// Register global components
customElements.define('toast-component', Toast);
customElements.define('loader-component', LoaderComponent);
customElements.define('theme-switcher', ThemeSwitcher);

window.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.toggle('dark', themeStore() === 'dark');
    renderRoute();

    document.body.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;

        // #region Navigation handling
        if (target.matches('[data-link]')) {
            e.preventDefault();
            const path = target.getAttribute('data-link') || target.getAttribute('href');
            if (path) navigate(path);
        }
        // #endregion
    });
});
window.addEventListener('popstate', renderRoute);