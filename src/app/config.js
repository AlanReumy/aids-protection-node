const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

dotenv.config()

const PRIVATE_KEY = fs.readFileSync(
    path.resolve(__dirname, './keys/private.key')
)
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

module.exports = {
    DATABASE_HOST,
    DATABASE_DIALECT,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_POOP_MAX,
    DATABASE_POOL_MIN,
    DATABASE_POOL_ACQUIRE,
    DATABASE_POOL_IDLE,
    DATABASE_DB,
    PORT
} = process.env

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY
