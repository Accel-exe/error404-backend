import yup from 'yup'

export const createUserValidations = yup.object({
    role: yup.string().required(),
    name: yup.string().required().min(3),
    img: yup.string().notRequired(),
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    plataform: yup.array().notRequired()
})

export const updateUserValidations = yup.object({
    role: yup.string().notRequired(),
    name: yup.string().notRequired().min(3),
    img: yup.string().notRequired(),
    email: yup.string().notRequired().email(),
    password: yup.string().notRequired().min(8),
    plataform: yup.array().notRequired()
})