const VERSION_CONFIG = {
    XML_PATH: "xml/version.xml",
    DEFAULT_MESSAGE: "Versión no disponible",
    VERSION_PREFIX: "Versión "
};

async function cargarVersionAplicacion() {
    const versionInfo = document.getElementById("version-info");
    if (!versionInfo) {
        console.error("Elemento version-info no encontrado");
        return;
    }

    try {
        if (typeof window.__versionText === "string") {
            versionInfo.textContent = window.__versionText;
            return;
        }

        const response = await fetch(VERSION_CONFIG.XML_PATH);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const str = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "text/xml");
        const version = xml.querySelector("number")?.textContent;

        if (version) {
            versionInfo.textContent = VERSION_CONFIG.VERSION_PREFIX + version;
        } else {
            throw new Error("No se encontró el número de versión en el XML");
        }
    } catch (error) {
        console.error("Error al cargar la versión:", error);
        versionInfo.textContent = VERSION_CONFIG.DEFAULT_MESSAGE;
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", cargarVersionAplicacion);
} else {
    cargarVersionAplicacion();
}
