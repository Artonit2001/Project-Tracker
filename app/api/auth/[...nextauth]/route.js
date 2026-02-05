const auth = require('@/lib/auth')

const handler = auth.default

module.exports = { GET: handler, POST: handler }
