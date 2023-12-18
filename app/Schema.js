const z = require('zod')
const schema = z.object({
    nombre: z.string({
        invalid_type_error: 'Dato ingresado incorrecto'
      }),
    apellido: z.string({
        invalid_type_error: 'Dato ingresado incorrecto'
      }),
    contraseña: z.string({
        invalid_type_error: 'Dato ingresado incorrecto'
      }),
    edad: z.string({
        invalid_type_error: 'Dato ingresado incorrecto'
      }) 
})

function ValidateSchema(Object) {
    const Validate = schema.safeParse()
    if (Validate.success) {
        return true
    } else if (!Validate.success) {
        return false
    }
}

module.exports = {
    ValidateSchema
}