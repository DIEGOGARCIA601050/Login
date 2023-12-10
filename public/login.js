let Cantidad;
document.querySelector('form')
    .addEventListener('submit', e => {
        
        e.preventDefault()
        const data = Object.fromEntries(
        new FormData(e.target)
        )
        alert(JSON.stringify(data))
        Cantidad = JSON?.stringify(data)
        Cantidad = JSON.parse(Cantidad)
        console.info(Cantidad)
        return Cantidad
    })

module.exports = {
    Cantidad
}