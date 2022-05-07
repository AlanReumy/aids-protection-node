import crypto from 'crypto'

const md5password = (password: string) => {
  const hash = crypto.createHash('md5')
  //  加密成16进制
  return hash.update(password).digest('hex')
}

export default md5password
