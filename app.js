const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = process.env.PORT || '3000'

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.get('/htmlData', (req, res) => {
  try {
    const data = fs.readFileSync(
      path.join(__dirname, 'public', 'htmlData.txt'),
      'utf8'
    )
    res.send(data)
  } catch (err) {
    console.error(err)
  }
})
app.post('/htmlData', (req, res) => {
  try {
    const data = fs.writeFileSync(
      path.join(__dirname, 'public', 'htmlData.txt'),
      req.body.data
    )
    res.send(data)
  } catch (err) {
    console.error(err)
  }
})
app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
