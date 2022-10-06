import { ObjectId } from 'mongodb'
import Mongo from '../mongo.js'

export default async function (req, res, next) {
  try {
    if (req.body._id == null) {
      next({ message: 'Sequence\'s id is mandatory', status: 400 })
      return
    }

    const dateNow = new Date()
    const newSequence = await Mongo.collection('sequences').findOne(ObjectId(req.body._id))

    if (newSequence == null) {
      next({ message: 'Sequence not found', status: 404 })
    }

    newSequence.name = req.body.newName ?? newSequence.name
    newSequence.lastUpdatedDate = dateNow

    await Mongo.collection('sequences').updateOne({ _id: ObjectId(req.body._id) }, { $set: { name: newSequence.name, lastUpdatedDate: dateNow } })

    res.send(newSequence)
  } catch (e) {
    next(e)
  }
}
