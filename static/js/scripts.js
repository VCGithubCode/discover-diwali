window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        /**
         * Calculates the current scroll position from the top of the document.
         * 
         * @constant {number} currentTop - The current vertical scroll position of the document body.
         */
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
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

    document.querySelector('.footer-toggle-btn').addEventListener('click', () => {
        document.querySelector('.footer').classList.toggle('show');
    });

    document.addEventListener('click', function (event) {
        const target = event.target;
        const toggleButton = target.closest('.navbar-toggler');
        const userDropdownButton = target.closest('[data-bs-toggle="dropdown"]');
        
        // Handle main navbar toggle with expanded click area
        if (toggleButton) {
            const navbarCollapse = document.querySelector('#navbarResponsive');
            const userDropdown = document.querySelector('.dropdown-menu.show');
            
            navbarCollapse.classList.toggle('show');
            
            if (userDropdown) {
                userDropdown.classList.remove('show');
            }
        }
        
        // Handle user dropdown toggles with expanded click area
        if (userDropdownButton) {
            event.preventDefault();
            const dropdownMenu = userDropdownButton.nextElementSibling;
            
            dropdownMenu.classList.toggle('show');
            userDropdownButton.classList.toggle('show');
            
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.classList.remove('show');
                    menu.previousElementSibling.classList.remove('show');
                }
            });
        }
    });
    
    // Smoother transitions
    const style = document.createElement('style');
    style.textContent = `
        .navbar-collapse,
        .dropdown-menu {
            transition: all 0.75s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);
});
