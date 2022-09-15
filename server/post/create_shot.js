import { ObjectId } from 'mongodb'
import Mongo from '../mongo.js'

export default async function (req, res, next) {
  if (req.body.sequenceId == null) {
    next({ message: 'A shot needs a sequence ID', status: 400 })
    return
  }

  let sequence

  try {
    sequence = await Mongo.collection('sequences').findOne(ObjectId(req.body.sequenceId))
  } catch (e) {
    next({ message: e, status: 500 })
    return
  }

  if (sequence == null) {
    next({ message: 'Sequence not found', status: 500 })
    return
  }

  const dateNow = new Date()
  const newShot = {
    name: req.body.name ?? 'New Shot',
    sequenceId: sequence._id,
    takes: [],
    creationDate: dateNow,
    lastUpdatedDate: dateNow
  }

  try {
    const id = (await Mongo.collection('shots').insertOne(newShot)).insertedId
    newShot._id = id

    const shots = sequence.shots
    shots.push(newShot._id)

    Mongo.collection('sequences').updateOne({ _id: ObjectId(sequence._id) }, { $set: { shots, lastUpdatedDate: new Date() } })
  } catch (e) {
    next({ message: e, status: 500 })
    return
  }

  res.send(newShot)
}
