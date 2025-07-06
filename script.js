document.addEventListener('DOMContentLoaded', () => {
    const personalizarBtn = document.getElementById('personalizar-pc');
    const pcPersonalizadoBtn = document.getElementById('pc-personalizado');
    const builderContainer = document.getElementById('builder-container');
    const pcPredefinidasSection = document.getElementById('pc-predefinidas');
    const componentList = document.getElementById('component-list');
    const buildPcButton = document.getElementById('build-pc');
    const pcCards = document.querySelectorAll('.pc-card');
    const sceneContainer = document.getElementById('scene-container');

    let scene, camera, renderer, componentModel;

    // Mostrar/Ocultar Secciones
    personalizarBtn.addEventListener('click', () => {
        builderContainer.classList.remove('hidden');
        pcPredefinidasSection.classList.add('hidden');
        init3D();
    });

    pcPersonalizadoBtn.addEventListener('click', () => {
        pcPredefinidasSection.classList.remove('hidden');
        builderContainer.classList.add('hidden');
    });

    // Inicialización de Three.js
    function init3D() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, sceneContainer.offsetWidth / sceneContainer.offsetHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(sceneContainer.offsetWidth, sceneContainer.offsetHeight);
        sceneContainer.appendChild(renderer.domElement);

        camera.position.z = 5;

        // Iluminación
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        // Cargar modelo 3D (ejemplo)
        const loader = new THREE.GLTFLoader();
        loader.load('cpu.glb', (gltf) => {
            componentModel = gltf.scene;
            scene.add(componentModel);
            animate();
        });
    }

    // Animación
    function animate() {
        requestAnimationFrame(animate);
        if (componentModel) {
            componentModel.rotation.x += 0.01;
            componentModel.rotation.y += 0.01;
        }
        renderer.render(scene, camera);
    }

    // Evento para seleccionar componentes
    componentList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const component = event.target.dataset.component;
            loadComponent(component);
        }
    });

    // Cargar componentes
    function loadComponent(component) {
        const loader = new THREE.GLTFLoader();
        loader.load(`${component}.glb`, (gltf) => {
            // Eliminar modelo anterior
            if (componentModel) {
                scene.remove(componentModel);
            }
            componentModel = gltf.scene;
            scene.add(componentModel);
        });
    }

    // Evento para construir la PC
    buildPcButton.addEventListener('click', () => {
        alert('¡PC Construida! (Simulación)');
    });

    // Eventos para las PC predefinidas
    pcCards.forEach(card => {
        const comprarButton = card.querySelector('button');
        comprarButton.addEventListener('click', () => {
            const pcName = card.querySelector('h3').textContent;
            alert(`¡Has comprado la PC: ${pcName}! (Simulación)`);
        });
    });
});
