function showLoader() {
    const overlay = document.getElementById("loading-overlay");
    if (overlay) overlay.style.display = "flex";
}

function hideLoader() {
    const overlay = document.getElementById("loading-overlay");
    if (overlay) overlay.style.display = "none";
}

// Captura todos los enlaces y botones de navegación
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("a, button").forEach(el => {
        el.addEventListener("click", e => {
            const target = e.target.closest("a, button");
            if (!target || target.getAttribute("target") === "_blank") return;
            if (target.href || target.getAttribute("onclick")?.includes("window.location")) {
                showLoader();
            }
        });
    });
});

function showLoader() {
    const loader = document.getElementById('loading-overlay');
    if (loader) {
        loader.style.display = 'flex';
    }
}

function hideLoader() {
    const loader = document.getElementById('loading-overlay');
    if (loader) {
        loader.style.display = 'none';
    }
}

window.addEventListener('load', function () {
    hideLoader();
});

window.addEventListener('beforeunload', function () {
    showLoader();
});