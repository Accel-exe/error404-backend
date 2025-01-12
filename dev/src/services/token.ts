import jwt from 'jsonwebtoken'

const secret: string | any = process.env.SECRET_KEY

export const createToken = (playload: jwt.JwtPayload) => {
    const token = jwt.sign(playload, secret)
    return token
}

export const verifyToken = (token: string): string | jwt.JwtPayload => {
    try {
        const decoded = jwt.verify(token, secret)
        return decoded
    }catch(err) {
        return "Error: " + err
    }
}

export const decodedToken = (token: string):  any => {
    const decoded = jwt.decode(token)
    return decoded
}