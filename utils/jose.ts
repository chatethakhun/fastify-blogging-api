import { importJWK } from "jose"

const secretJWK = {
  kty: 'oct',
  k: process.env.JOSE_SECRET
}


export const secretKey = async() => {
  return await importJWK(secretJWK, 'HS256')
}