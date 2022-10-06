import { ObjectId } from 'mongodb'
import Mongo from '../mongo.js'

export default async function (req, res, next) {
  try {
    if (req.body._id == null) {
      next({ message: 'Take\'s id is mandatory', status: 400 })
      return
    }

    const dateNow = new Date()
    const newTake = await Mongo.collection('takes').findOne(ObjectId(req.body._id))

    if (newTake == null) {
      next({ message: 'Take not found', status: 404 })
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
      status = newTake.status
    }

    newTake.name = req.body.name ?? newTake.name
    newTake.audioTrack = req.body.audioTrack ?? newTake.audioTrack
    newTake.details = req.body.details ?? newTake.details
    newTake.status = status
    newTake.lastUpdatedDate = dateNow

    await Mongo.collection('takes').updateOne({ _id: ObjectId(req.body._id) }, { $set: { name: newTake.name, audioTrack: newTake.audioTrack, details: newTake.details, status: newTake.status, lastUpdatedDate: dateNow } })

    res.send(newTake)
  } catch (e) {
    next(e)
  }
}
