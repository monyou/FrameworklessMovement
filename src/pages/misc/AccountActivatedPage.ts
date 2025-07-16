class AccountActivatedPage extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div id="account-activated" class="flex flex-col items-center justify-center h-full p-6">
                <div class="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                    <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2.5" fill="none"/>
                        <path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold mb-2">Account Activated!</h2>
                <p class="text-gray-600 mb-6 text-center max-w-md">
                    Your account has been successfully activated.
                </p>
                <button
                    class="px-6 py-2 primary-btn"
                    data-link="/login"
                >
                    Go to Login
                </button>
            </div>
        `;
    }
}
customElements.define('account-activated-page', AccountActivatedPage);

export default AccountActivatedPage;