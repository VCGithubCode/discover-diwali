// Wait for DOM content to load before running
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav ? mainNav.clientHeight : 0;

    document.querySelector('svg').addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('interactive')) {
            const state = event.target.getAttribute('data-state');
            if (state) {
                navigateToState(state);
            }
        }
    });

    // Handle navigation bar visibility on scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const currentTop = document.body.getBoundingClientRect().top * -1;
            if (currentTop < scrollPos) {
                if (currentTop > 0 && mainNav && mainNav.classList.contains('is-fixed')) {
                    mainNav.classList.add('is-visible');
                } else {
                    mainNav.classList.remove('is-visible', 'is-fixed');
                }
            } else {
                mainNav.classList.remove('is-visible');
                if (currentTop > headerHeight && mainNav && !mainNav.classList.contains('is-fixed')) {
                    mainNav.classList.add('is-fixed');
                }
            }
            scrollPos = currentTop;
        }, 100);
    });

    window.dispatchEvent(new Event('scroll'));
});

document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener('mouseover', function(event) {
        if (event.target && event.target.hasAttribute('data-bs-toggle')) {
            new bootstrap.Tooltip(event.target);
        }
    });
});

function navigateToState(state) {
    const formattedState = encodeURIComponent(state.trim());
    window.location.href = `/state/${formattedState}`;
}