import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const generateToken = ({ username = '', email, firstName, lastName }) => {
    return jwt.sign(
        {
            username,
            email,
            firstName,
            lastName
        },
        'test',
        {
            algorithm: 'HS512'
        }
    )
}

export const encryptPassword = (password) => {
    return bcrypt.hashSync(password, 5)
}

export const compareHash = (hash, password) => {
    return bcrypt.compareSync(password, hash)
}
