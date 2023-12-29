let Usuario;
document.querySelector('form')
    .addEventListener('submit', e => {
        
        e.preventDefault()
        const data = Object.fromEntries(
        new FormData(e.target)
        )
        alert(JSON.stringify(data))
        Usuario = JSON?.stringify(data)
        Usuario = JSON.parse(Usuario)
        console.info(Usuario)
        Usuario.edad = parseInt(Usuario.edad)
        console.info(Usuario)
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
