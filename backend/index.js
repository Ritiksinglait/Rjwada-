const express = require('express')
const app = express()
const cors = require('cors')

const port = 5000
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello from Rjwada!')
})



app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})