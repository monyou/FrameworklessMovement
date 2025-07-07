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

    // Clear and render
    app.innerHTML = '';
    const el = document.createElement(match.tag);
    Object.assign(el, params); // Pass params as props
    app.appendChild(el);
}
