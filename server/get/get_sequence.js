import { ObjectId } from 'mongodb'
import Mongo from '../mongo.js'

export default async function (req, res, next) {
  try {
    let response

    if (req.query._id != null) {
      response = await Mongo.collection('sequences').find(ObjectId(req.query._id)).toArray()
    } else if (req.query.scriptId != null) {
      response = await Mongo.collection('sequences').find({ scriptId: ObjectId(req.query.scriptId) }).toArray()
    } else {
      response = await Mongo.collection('sequences').find({}).toArray()
    }

    res.send(response)
  } catch (e) {
    next(e)
  }
}
