import { ObjectId } from 'mongodb'
import Mongo from '../mongo.js'

export default async function (req, res, next) {
  try {
    let response

    if (req.query._id != null) {
      response = await Mongo.collection('takes').find(ObjectId(req.query._id)).toArray()
    } else if (req.query.shotId != null) {
      response = await Mongo.collection('takes').find({ shotId: ObjectId(req.query.shotId) }).toArray()
    } else {
      response = await Mongo.collection('takes').find({}).toArray()
    }

    res.send(response)
  } catch (e) {
    next(e)
  }
}
