document.addEventListener("DOMContentLoaded", function () {
    if (window.location.hash) {
        // Clear the hash and scroll to top
        history.replaceState(null, null, window.location.pathname);
        window.scrollTo(0, 0);
    }
});