import { ObjectId } from 'mongodb'
import Mongo from '../mongo.js'

export default async function (req, res, next) {
  try {
    if (req.body._id == null) {
      next({ message: 'Script\'s id is mandatory', status: 400 })
      return
    }

    const dateNow = new Date()
    const newScript = await Mongo.collection('scripts').findOne(ObjectId(req.body._id))

    if (newScript == null) {
      next({ message: 'Script not found', status: 404 })
    }

    newScript.name = req.body.newName ?? newScript.name
    newScript.lastUpdatedDate = dateNow

    await Mongo.collection('scripts').updateOne({ _id: ObjectId(req.body._id) }, { $set: { name: newScript.name, lastUpdatedDate: dateNow } })

    res.send(newScript)
  } catch (e) {
    next(e)
  }
}
