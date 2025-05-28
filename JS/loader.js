﻿function showLoader() {
    const loader = document.getElementById('loading-overlay');
    if (loader) loader.style.display = 'flex';
}

function hideLoader() {
    const loader = document.getElementById('loading-overlay');
    if (loader) loader.style.display = 'none';
}

window.addEventListener('load', () => {
    hideLoader(); // Esto oculta el loader al terminar de cargar todo
});