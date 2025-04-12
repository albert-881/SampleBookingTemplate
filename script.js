window.onload = function() {
    // Remove hash (#) from the URL
    if (window.location.hash) {
        history.replaceState("", document.title, window.location.pathname + window.location.search);
    }

    // Scroll to the top of the page
    window.scrollTo(0, 0);
};
