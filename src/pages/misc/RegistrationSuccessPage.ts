class RegistrationSuccessPage extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div id="registration-success" class="flex flex-col items-center justify-center h-full p-6">
                <div class="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                    <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2.5" fill="none"/>
                        <path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold mb-2">Registration Successful!</h2>
                <p class="text-gray-600 mb-6 text-center max-w-md">
                    Thank you for registering.
                </p>
                <div class="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-2">
                    <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2.5" fill="none"/>
                        <path d="M3 7l9 6 9-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                    </svg>
                </div>
                <span class="text-blue-700 dark:text-gray-600 font-medium">Check your inbox for the activation email.</span>
            </div>
        `;
    }
}
customElements.define('registration-success-page', RegistrationSuccessPage);

export default RegistrationSuccessPage;