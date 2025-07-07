declare class URLPattern {
    constructor(input: { pathname: string });
    test(input: { pathname: string }): boolean;
    exec(input: { pathname: string }): { pathname: { groups: Record<string, string> } } | null;
}

type Route = {
    pattern: URLPattern;
    load: () => Promise<any>;
    tag: string;
};

const noLayoutRoutePaths: string[] = [
    '/',
    '/login',
    '/404'
];

const routes: Route[] = [
    {
        pattern: new URLPattern({ pathname: '/' }),
        load: () => import('../pages/home/HomePage'),
        tag: 'home-page'
    },
    {
        pattern: new URLPattern({ pathname: '/login' }),
        load: () => import('../pages/login/LoginPage'),
        tag: 'login-page'
    },
    {
        pattern: new URLPattern({ pathname: '/app' }),
        load: () => import('../pages/dashboard/Dashboard'),
        tag: 'dashboard-page'
    },
    {
        pattern: new URLPattern({ pathname: '/404' }),
        load: () => import('../pages/errors/404'),
        tag: 'not-found-page'
    }
];

export const navigate = (path: string) => {
    history.pushState({}, '', path);
    renderRoute();
}

export const renderRoute = async () => {
    const path = window.location.pathname;
    const match = routes.find(route => route.pattern.test({ pathname: path }));

    const app = document.getElementById('app');
    if (!app) return;

    if (!match) {
        navigate('/404');
        return;
    }

    // Lazy load the page
    await match.load();

    // Extract params
    const matchResult = match.pattern.exec({ pathname: path });
    const params = matchResult?.pathname.groups ?? {};

    // Clear and render with layout
    let layout;
    const el = document.createElement(match.tag);
    Object.assign(el, params); // Pass params as props
    app.innerHTML = '';
    if (window.screen.width < 768) {
        await import('../layouts/MobileLayout');
        layout = document.createElement('mobile-layout');
    } else {
        await import('../layouts/WebLayout');
        layout = document.createElement('web-layout');
    }
    if (noLayoutRoutePaths.includes(path)) {
        app.appendChild(el);
    } else {
        app.appendChild(layout);
        layout.querySelector('#app-content')?.appendChild(el);
    }
}
