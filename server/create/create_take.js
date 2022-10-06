import { ObjectId } from 'mongodb'
import Mongo from '../mongo.js'

export default async function (req, res, next) {
  if (req.body.shotId == null) {
    next({ message: 'A take needs a shot ID', status: 400 })
    return
  }

  let shot

  try {
    shot = await Mongo.collection('shots').findOne(ObjectId(req.body.shotId))
  } catch (e) {
    next({ message: e, status: 500 })
    return
  }

  if (shot == null) {
    next({ message: 'Shot not found', status: 500 })
    return
  }

  let status
  if (req.body.status !== null) {
    if (req.body.status !== 'ok' && req.body.status !== 'pok' && req.body.status !== 'nok') {
      next({ message: 'Take\'s status must be \'ok\', \'pok\' or \'nok\'', status: 400 })
      return
    } else {
      status = req.body.status
    }
  } else {
    status = 'nok'
  }

  const dateNow = new Date()
  const newTake = {
    name: req.body.name ?? 'New Shot',
    shotId: shot._id,
    audioTrack: req.body.audioTrack ?? 0,
    details: req.body.details ?? '',
    status,
    creationDate: dateNow,
    lastUpdatedDate: dateNow
  }

  try {
    const id = (await Mongo.collection('takes').insertOne(newTake)).insertedId
    newTake._id = id

    const takes = shot.takes
    takes.push(newTake._id)

    Mongo.collection('shots').updateOne({ _id: ObjectId(shot._id) }, { $set: { takes, lastUpdatedDate: new Date() } })
  } catch (e) {
    next({ message: e, status: 500 })
    return
  }

  res.send(newTake)
}
