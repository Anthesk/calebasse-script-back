import { ObjectId } from 'mongodb'
import Mongo from '../mongo.js'

export default async function (req, res, next) {
  try {
    let response

    if (req.query._id != null) {
      response = await Mongo.collection('shots').find(ObjectId(req.query._id)).toArray()
    } else if (req.query.sequenceId != null) {
      response = await Mongo.collection('shots').find({ sequenceId: ObjectId(req.query.sequenceId) }).toArray()
    } else {
      response = await Mongo.collection('shots').find({}).toArray()
    }

    res.send(response)
  } catch (e) {
    next(e)
  }
}
