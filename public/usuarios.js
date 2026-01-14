imageElement = document.createElement('img');
fetch('http://localhost:3000/usuarios', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(res => typeof res === 'object' ? res.json() : res.text())
    .then(data => {
        if (Array.isArray(data)) {
            data.forEach(usuario => {
                document.querySelector('main').innerHTML += `<div>
                <img src="${usuario.imagen}" alt="Imagen de ${usuario.nombre}" width="100"/>
                <h2>Nombre: ${usuario.nombre}</h2>
                <p>Correo: ${usuario.correo}</p>
                <p>Edad: ${usuario.edad}</p>
                </div>`;
            })
        }
    })