import jwt, { Secret, SignOptions } from 'jsonwebtoken';


type TPayload = {
    id: string;
    email: string;
}

export type TExpiresIn = number | `${number}${'s' | 'm' | 'h' | 'd'}`

const createToken = (payload: TPayload, secretKey: Secret, expiresIn: TExpiresIn) => {
    const options: SignOptions = {
        algorithm: "HS256",
        expiresIn, // This can be a number (e.g., 3600) or a string (e.g., "1h")
    };

    const token = jwt.sign(payload, secretKey, options);
    return token;
};

 export default createToken;