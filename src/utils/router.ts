import { userStore } from './store';

type Route = {
    pattern: string;
    load: () => Promise<any>;
    tag: string;
    noAuth?: boolean;
    noLayout?: boolean;
    isSystem?: boolean;
};

const routes: Route[] = [
    {
        pattern: '/',
        load: () => import('../pages/home/HomePage'),
        tag: 'home-page',
        noAuth: true,
        noLayout: true,
        isSystem: true
    },
    {
        pattern: '/login',
        load: () => import('../pages/login/LoginPage'),
        tag: 'login-page',
        noAuth: true,
        noLayout: true,
        isSystem: true
    },
    {
        pattern: '/register',
        load: () => import('../pages/register/RegisterPage'),
        tag: 'register-page',
        noAuth: true,
        noLayout: true,
        isSystem: true
    },
    {
        pattern: '/app',
        load: () => import('../pages/dashboard/DashboardPage'),
        tag: 'dashboard-page'
    },
    {
        pattern: '/404',
        load: () => import('../pages/errors/404'),
        tag: 'not-found-page',
        noAuth: true,
        noLayout: true
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


export const navigate = async (path: string, replace?: boolean) => {
    if (replace) {
        history.replaceState({}, '', path);
    } else {
        history.pushState({}, '', path);
    }
    await renderRoute();
}

export const renderRoute = async () => {
    let params = null;
    const path = window.location.pathname;

    // Match the route and extract parameters if any
    const matchedRoute = routes.find(route => { params = extractParams(route.pattern, path); return params !== null; });

    const app = document.getElementById('app');
    if (!app) return;

    // Unknown page handling
    if (!matchedRoute) {
        navigate('/404', true);
        return;
    }

    // Check for authenticated user
    const isAuth = !!userStore()
    if (isAuth && matchedRoute.isSystem) {
        navigate('/app', true);
        return;
    }
    if (!isAuth && !matchedRoute.noAuth) {
        navigate('/login', true);
        return;
    }

    // Lazy load the page
    await matchedRoute.load();

    // Clear and render logic
    let layout;
    const el = document.createElement(matchedRoute.tag);
    Object.assign(el, params); // Pass params as props
    app.innerHTML = '';

    // Determine layout based on screen width
    if (window.screen.width < 768) {
        await import('../layouts/MobileLayout');
        layout = document.createElement('mobile-layout');
    } else {
        await import('../layouts/WebLayout');
        layout = document.createElement('web-layout');
    }

    // Render content
    if (matchedRoute.noLayout) {
        app.appendChild(el);
    } else {
        app.appendChild(layout);
        layout.querySelector('#app-content')?.appendChild(el);
    }
}
