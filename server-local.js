require('dotenv').config()
const app = require('./lib/app')
const logger = require('./middleware/logger')

const PORT = process.env.PORT || 7000

app.use(logger)
app.listen(PORT, () => console.log(`Server running on port: ${PORT}...`))
