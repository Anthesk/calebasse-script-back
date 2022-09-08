import express from 'express'
import bp from 'body-parser'
import getScripts from './get/get_scripts.js'
import getSequence from './get/get_sequence.js'
import getShots from './get/get_shots.js'
import addScript from './post/create_script.js'
import addSequence from './post/create_sequence.js'
import addShot from './post/create_shot.js'
import Mongo from './mongo.js'

async function main () {
  const app = express()
  await Mongo.connect()

  app.use(bp.json())
  app.use(bp.urlencoded({ extended: true }))

  app.route('/scripts').get(getScripts).post(addScript)
  app.route('/sequence').get(getSequence).post(addSequence)
  app.route('/shots').get(getShots).post(addShot)

  app.use(function (err, req, res, next) {
    console.error(err.message ?? err)
    res.status(err.status ?? 500).send({ error: err.message ?? err })
  })

  const server = app.listen(3000, function () {
    const port = server.address().port
    console.log('Calebasse Script Backend running on port %s', port)
  })
}

main()
