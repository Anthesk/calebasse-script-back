import { ObjectId } from 'mongodb'
import Mongo from '../mongo.js'

export default async function (req, res, next) {
  try {
    if (req.body._id == null) {
      next({ message: 'Shot\'s id is mandatory', status: 400 })
      return
    }

    const dateNow = new Date()
    const newShot = await Mongo.collection('shots').findOne(ObjectId(req.body._id))

    if (newShot == null) {
      next({ message: 'Shot not found', status: 404 })
    }

    newShot.name = req.body.newName ?? newShot.name
    newShot.lastUpdatedDate = dateNow

    await Mongo.collection('shots').updateOne(ObjectId(req.body._id), { name: req.body.newName, lastUpdatedDate: dateNow })

    res.send(newShot)
  } catch (e) {
    next(e)
  }
}
