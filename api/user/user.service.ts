import { secretKey } from '../../utils/jose';
import prisma from '../../utils/prisma';
import { CreateUserInput } from './user.schema';
import { hash } from 'bcryptjs'
import { base64url, EncryptJWT } from 'jose'

export const signUp = async (data: CreateUserInput) => {
  const hashed_password = await hash(data.password, 12)
  const token = await secretKey()

  if(!process.env.JOSE_SECRET) {
    return
  }

  const secret = base64url.decode(process.env.JOSE_SECRET)
  
  const jwt = await new EncryptJWT({ 'urn:example:claim': true })
  .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
  .setIssuedAt()
  .setIssuer('urn:example:issuer')
  .setAudience('urn:example:audience')
  .setExpirationTime('2h')
  .encrypt(secret)

  
  return prisma.user.create({
    data: {
      ...data,
      password: hashed_password,
      token: jwt,
    }
  })
}