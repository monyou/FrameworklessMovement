import { navigate } from "../../utils/router";
import callServer from "../../utils/server";
import { userStore } from "../../utils/store";

class ProfilePage extends HTMLElement {

    connectedCallback() {
        this.render();
        this.addEventListener('click', this.clickHandler);
    }

    clickHandler = (e: MouseEvent) => {
        if ((e.target as HTMLElement).matches('#logout-btn, #logout-btn *')) {
            e.preventDefault();
            this.logout();
        }
    }

    logout = async () => {
        const response = await callServer('/auth/logout', {
            method: 'POST'
        });

        if (!response) return;

        userStore.set(null);
        navigate('/login');
    }

    render() {
        this.innerHTML = `
            <div id="profile-page" class="p-4">
                <h1 class="text-4xl text-center mb-6">Profile</h1>
                <p class="text-center text-gray-500">Welcome to your profile, ${userStore()?.firstName}!</p>
                <theme-switcher class="w-15 h-15 mt-10 block mx-auto"></theme-switcher>
                <button 
                    id="logout-btn" 
                    class="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 mx-auto mt-6 transition-colors cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                    </svg>
                    Logout
                </button>
            </div>      
        `;
    }
}
customElements.define('profile-page', ProfilePage);

export default ProfilePage;