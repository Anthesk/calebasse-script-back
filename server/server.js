import express from 'express'
import bp from 'body-parser'
import addScript from './post/create_script.js'
import listScripts from './get/get_script.js'
import listShots from './get/get_shots.js'

const app = express()

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// get
app.get('/listScripts', listScripts)
app.get('/listShots', listShots)

// post
app.post('/addScript', addScript)

const server = app.listen(3000, function () {
  const host = server.address().address
  const port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
