window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;

    // Handle navigation bar visibility on scroll
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if (currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });

    // Interactive map: Navigate to state details
    const stateLinks = document.querySelectorAll('.state-link');
    stateLinks.forEach(link => {
        link.addEventListener('click', function() {
            const state = this.getAttribute('data-state');
            if (state) {
                // Redirect to the state-specific page
                window.location.href = `/state/${state}`;
            }
        });
    });
});
