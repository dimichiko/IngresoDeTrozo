let lastDiameter = null;

$(document).ready(function () {
    // Cargar datos iniciales desde la API
    $.get('/api/trunk', function (data) {
        if (data) {
            data.forEach(trunk => {
                $(`#count-${trunk.diameter}`).text(trunk.count);
            });
        }
    });
});

function updateCounter(diameter, action) {
    if (action === 'increment') {
        lastDiameter = diameter;
    }

    $.post(`/api/trunk/${action}/${diameter}`, function (data) {
        if (data) {
            data.forEach(trunk => {
                $(`#count-${trunk.diameter}`).text(trunk.count);
            });
        }
    });
}

function getLastDiameter() {
    return lastDiameter;
}