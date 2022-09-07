import express from 'express'
import bp from 'body-parser'
import addScript from './post/create_script.js'
import addShot from './post/create_shot.js'
import getScripts from './get/get_scripts.js'
import getShots from './get/get_shots.js'
import Mongo from './mongo.js'

async function main () {
  const app = express()
  await Mongo.connect()

  app.use(bp.json())
  app.use(bp.urlencoded({ extended: true }))

  app.route('/scripts').get(getScripts).post(addScript)
  app.route('/shots').get(getShots).post(addShot)

  const server = app.listen(3000, function () {
    const port = server.address().port
    console.log('Calebasse Script Backend running on port %s', port)
  })
}

main()
