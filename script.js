document.addEventListener('DOMContentLoaded', () => {
    const personalizarBtn = document.getElementById('personalizar-pc');
    const pcPersonalizadoBtn = document.getElementById('pc-personalizado');
    const builderContainer = document.getElementById('builder-container');
    const pcPredefinidasSection = document.getElementById('pc-predefinidas');
    const componentList = document.getElementById('component-list');
    const componentInfo = document.getElementById('component-info');

    personalizarBtn.addEventListener('click', () => {
        builderContainer.classList.remove('hidden');
        pcPredefinidasSection.classList.add('hidden');
    });

    pcPersonalizadoBtn.addEventListener('click', () => {
        pcPredefinidasSection.classList.remove('hidden');
        builderContainer.classList.add('hidden');
    });

    componentList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const component = event.target.dataset.component;
            showComponentDetails(component);
        }
    });

    function showComponentDetails(component) {
        let details = '';
        switch (component) {
            case 'cpu':
                details = '<p><strong>CPU:</strong> Intel Core i7-12700K</p><p>8 núcleos, 16 hilos</p>';
                break;
            case 'gpu':
                details = '<p><strong>GPU:</strong> NVIDIA GeForce RTX 3080</p><p>10GB GDDR6X</p>';
                break;
            case 'ram':
                details = '<p><strong>RAM:</strong> 32GB DDR5 5200MHz</p>';
                break;
            case 'storage':
                details = '<p><strong>Almacenamiento:</strong> 1TB NVMe SSD</p>';
                break;
            case 'psu':
                details = '<p><strong>Fuente de Poder:</strong> 850W 80+ Gold</p>';
                break;
            case 'case':
                details = '<p><strong>Gabinete:</strong> NZXT H510i</p>';
                break;
            default:
                details = '<p>Selecciona un componente para ver sus detalles.</p>';
        }
        componentInfo.innerHTML = details;
    }
});
