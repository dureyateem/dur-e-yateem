/* ============================================
   Dur-e-Yateem — Main Script
   ============================================ */

// ---------- AOS Initialization ----------
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 850,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
    });

    // ---------- Navbar scroll effect ----------
    const navbar = document.querySelector('.navbar-custom');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ---------- Close mobile nav on link click ----------
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navCollapse = document.querySelector('.navbar-collapse');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (navCollapse && navCollapse.classList.contains('show')) {
                new bootstrap.Collapse(navCollapse, { toggle: true });
            }
        });
    });

    // ---------- Substack RSS Toast ----------
    const toast = document.getElementById('substackToast');
    if (toast) {
        const SUBSTACK_RSS =
            'https://api.rss2json.com/v1/api.json?rss_url=https://dureyateem.substack.com/feed';

        fetch(SUBSTACK_RSS)
            .then(function (res) { return res.json(); })
            .then(function (data) {
                if (data.status === 'ok' && data.items && data.items.length > 0) {
                    var latest = data.items[0];
                    var titleEl = toast.querySelector('.substack-toast-title');
                    if (titleEl) titleEl.textContent = latest.title;

                    // Store article link
                    toast.dataset.link = latest.link;

                    // Show the toast after a short delay
                    setTimeout(function () {
                        toast.classList.add('show');
                    }, 3500);
                }
            })
            .catch(function (err) {
                console.log('Substack RSS fetch skipped:', err.message);
            });

        // Open article on click
        toast.addEventListener('click', function (e) {
            if (e.target.closest('.substack-toast-close')) {
                e.stopPropagation();
                toast.classList.remove('show');
                return;
            }
            var link = toast.dataset.link;
            if (link) {
                window.open(link, '_blank');
            }
        });
    }
});
