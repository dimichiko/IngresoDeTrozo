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