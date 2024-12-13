// Wait until the DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;

    /**
     * Sets up event listeners on interactive state links.
     * When a state is clicked, it navigates to the details page for that state.
     */
    const stateLinks = document.querySelectorAll('.state-link');
    stateLinks.forEach(link => {
        link.addEventListener('click', function() {
            const state = this.getAttribute('data-state');
            if (state) {
                window.location.href = `/state/${state}`;
            }
        });
    });
});