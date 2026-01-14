const z = require('zod')
const schema = z.object({
  nombre: z.string({
    invalid_type_error: 'Dato ingresado incorrecto'
  }),
  correo: z.string({
    invalid_type_error: 'Dato ingresado incorrecto'
  }),
  contrasena: z.string({
    invalid_type_error: 'Dato ingresado incorrecto'
  }),
  edad: z.number({
    invalid_type_error: 'Dato ingresado incorrecto'
  }).int(),
  imagen: z.object({
    image: z.any()
  }).optional()
})

function ValidateSchema(Object) {
  const Validate = schema.safeParse(Object)
  console.log(Validate);
  if (Validate.success) {
    return true
  } else if (!Validate.success) {
    return false
  }
}

function ValidatePartialSchema(Object) {
  const Validate = schema.partial().safeParse(Object)
  console.log(Validate);
  if (Validate.success) {
    return true
  } else if (!Validate.success) {
    return false
  }
}

module.exports = {
  ValidateSchema,
  ValidatePartialSchema
}