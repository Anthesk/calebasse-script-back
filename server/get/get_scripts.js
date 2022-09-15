import { ObjectId } from 'mongodb'
import Mongo from '../mongo.js'

export default async function (req, res, next) {
  try {
    let response

    if (req.query._id != null) {
      response = await Mongo.collection('scripts').find(ObjectId(req.query._id)).toArray()
    } else {
      response = await Mongo.collection('scripts').find({}).toArray()
    }

    res.send(response)
  } catch (e) {
    next(e)
  }
}
