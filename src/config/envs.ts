import 'dotenv/config'
import * as joi from 'joi'


interface EnvVars {
    PORT:number
    DATABASE_URL: string
}


//se crea un esquema para evitar que si no llega un puerto no de levante la app de nest


const envsSchema = joi.object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required()
})
.unknown(true); //esta propiedad se coloca ya que hay mas variables de entorno y solo se quiere validar el puerto

const { error, value } = envsSchema.validate( process.env )

if ( error ) {
    throw new Error(`Config validation error: ${ error.message }`)
}

const envVars: EnvVars = value

export const envs = {
    port: envVars.PORT,
    databaseUrl: envVars.DATABASE_URL
}