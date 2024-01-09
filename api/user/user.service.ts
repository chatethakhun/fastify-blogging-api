import fastifyPlugin from 'fastify-plugin';
import prisma from '../../utils/prisma';
import { CreateUserInput } from './user.schema';
import { hash, compare } from 'bcryptjs'
import fastify, { FastifyInstance } from 'fastify';
// module.exports = fastifyPlugin(function(fastify: FastifyInstance) {
//   export const signIn = async (data: CreateUserInput) => {
//     const username = data.username
//     const password = data.password
  
//     try {
//       const user = await prisma.user.findUnique({
//         where: {
//           username: username
//         }
//       })
  
//       if (!user) {
//         throw new Error('User not found')
//       }
  
//       const isMatch = await compare(password, user.password)
  
//       if (!isMatch) {
//         throw new Error('Invalid password')
//       }
  
//       const token = await app.jwt.sign({ username: user.username, name: user.name, createdAt: user.createdAt })
  
//       console.log({ token });
      
//       // await prisma.user.update({ data: { token: token } })
  
//       return {
//         username: user.username,
//         name: user.name,
//         createdAt: user.createdAt,
//       }
  
  
//     } catch (error: Error | unknown) {
//       let message = 'Server error'
//       if (error instanceof Error) message = error.message
//       throw new Error(message)
//     }
//   }
// })
export const signUp = async (data: CreateUserInput) => {
  const hashed_password = await hash(data.password, 12)

  if (!process.env.JOSE_SECRET) {
    return
  }


  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashed_password,
    }
  })
  return {
    username: user.username,
    name: user.name,
    createdAt: user.createdAt,
  }


}

