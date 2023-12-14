import { importJWK, jwtVerify } from "jose"

const secretJWK = {
  kty: 'oct',
  k: process.env.JOSE_SECRET
}


export const secretKey = async() => {
  return await importJWK(secretJWK, 'HS256')
}

export const verifyToken = async(token: string) => {
  const secret = await secretKey()
  const { payload } = await jwtVerify(token, secret)

  console.log({ payload });
  
  return payload
}