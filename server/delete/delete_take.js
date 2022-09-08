import { ObjectId } from 'mongodb'
import Mongo from '../mongo.js'

export default async function (req, res, next) {
  try {
    if (req.body._id == null) {
      next({ message: 'Take\'s id is mandatory', status: 400 })
      return
    }

    const deleted = await Mongo.collection('takes').deleteOne({ _id: ObjectId(req.body._id) })

    if (deleted.deletedCount === 0) {
      next({ message: 'Take not found', status: 404 })
      return
    }

    res.send(deleted.acknowledged)
  } catch (error) {
    next(error)
  }
}
