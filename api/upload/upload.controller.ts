import { FastifyReply, FastifyRequest } from "fastify";
import fs from 'node:fs'
import { pipeline } from "node:stream";
import util from 'node:util'

const pump = util.promisify(pipeline)

export const uploadHandler = async (req: FastifyRequest, reply: FastifyReply) => {
    console.log('start upload');
    const data = await req.file()

    if(!data?.file) {
        reply.send({ message: 'required file '})
        return 
    }

    const mimetype = data.mimetype

    console.log(data.mimetype);

    if(!mimetype.includes('image')) {
        reply.send({ message: 'unsupport file '})
        return
    }
    

    await pump(data.file, fs.createWriteStream('./uploads/images/' + data.filename))
    // const image =  await uploadFile(data?.file)

    reply.send({ message: 'uploaded '})
}