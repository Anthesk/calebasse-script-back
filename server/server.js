import express from 'express'
import bp from 'body-parser'
import Mongo from './mongo.js'

import getScripts from './get/get_scripts.js'
import getSequence from './get/get_sequence.js'
import getShots from './get/get_shots.js'
import getTakes from './get/get_takes.js'

import createScript from './create/create_script.js'
import createSequence from './create/create_sequence.js'
import createShot from './create/create_shot.js'
import createTake from './create/create_take.js'

import deleteScript from './delete/delete_script.js'
import deleteSequence from './delete/delete_sequence.js'
import deleteShot from './delete/delete_shot.js'
import deleteTake from './delete/delete_take.js'

import updateScript from './update/update_script.js'
import updateSequence from './update/update_sequence.js'
import updateShot from './update/update_shot.js'
import updateTake from './update/update_take.js'

async function main () {
  const app = express()
  await Mongo.connect()

  app.use(bp.json())
  app.use(bp.urlencoded({ extended: true }))

  app.route('/script').get(getScripts).put(createScript).delete(deleteScript).post(updateScript)
  app.route('/sequence').get(getSequence).put(createSequence).delete(deleteSequence).post(updateSequence)
  app.route('/shot').get(getShots).put(createShot).delete(deleteShot).post(updateShot)
  app.route('/take').get(getTakes).put(createTake).delete(deleteTake).post(updateTake)

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
