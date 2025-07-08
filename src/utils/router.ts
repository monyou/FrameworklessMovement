type Route = {
    pattern: string;
    load: () => Promise<any>;
    tag: string;
};

const noLayoutRoutePaths: string[] = [
    '/',
    '/login',
    '/register',
    '/404'
];

const routes: Route[] = [
    {
        pattern: '/',
        load: () => import('../pages/home/HomePage'),
        tag: 'home-page'
    },
    {
        pattern: '/login',
        load: () => import('../pages/login/LoginPage'),
        tag: 'login-page'
    },
    {
        pattern: '/register',
        load: () => import('../pages/register/RegisterPage'),
        tag: 'register-page'
    },
    {
        pattern: '/app',
        load: () => import('../pages/dashboard/DashboardPage'),
        tag: 'dashboard-page'
    },
    {
        pattern: '/404',
        load: () => import('../pages/errors/404'),
        tag: 'not-found-page'
    }
];

const extractParams = (pattern: string, path: string): Record<string, string> | null => {
    const paramNames: string[] = [];

    const regex = new RegExp(
        '^' +
        pattern.replace(/\/:([^/]+)/g, (_, name) => {
            paramNames.push(name);
            return '/([^/]+)';
        }) +
        '$'
    );

    const match = path.match(regex);
    if (!match) return null;

    const params: Record<string, string> = {};
    paramNames.forEach((name, i) => {
        params[name] = decodeURIComponent(match[i + 1]);
    });

    return params;
}


export const navigate = async (path: string) => {
    history.pushState({}, '', path);
    await renderRoute();
}

export const renderRoute = async () => {
    let params = null;
    const path = window.location.pathname;
    const match = routes.find(route => { params = extractParams(route.pattern, path); return params !== null; });

    const app = document.getElementById('app');
    if (!app) return;

    if (!match) {
        history.replaceState({}, '', '/404');
        renderRoute();
        return;
    }

    // Lazy load the page
    await match.load();

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
