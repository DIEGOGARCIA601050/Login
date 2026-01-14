let Usuario;
document.querySelector('form')
    .addEventListener('submit', e => {

        e.preventDefault()
        const data = Object.fromEntries(
            new FormData(e.target)
        )
        const imageInput = document.getElementById('imageInput');
        const file = (_a = imageInput.files) === null || _a === void 0 ? void 0 : _a[0]; // Obtiene el archivo seleccionado
        let imageElement
        // Verifica si se seleccionó un archivo
        if (file) {
            // Crea un objeto URL para la imagen
            const imageUrl = URL.createObjectURL(file);
            // Crea un nuevo elemento <img>
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            imageElement.alt = file.name;
            // Agrega la imagen al DOM
            document.body.appendChild(imageElement);
        }
        alert(JSON.stringify(data))
        Usuario = JSON?.stringify(data)
        Usuario = JSON.parse(Usuario)
        console.info(Usuario)
        Usuario.edad = parseInt(Usuario.edad)
        console.info(Usuario)
        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: new FormData(document.querySelector('form'))
        })
            .then(res => res.text())
            .then(data => {
                console.info(data)
            })
        fetch('http://localhost:3000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Usuario)
        })
            .then(res => typeof res === 'object' ? res.json() : res.text())
            .then(data => {
                console.info(data)
            })
    })
