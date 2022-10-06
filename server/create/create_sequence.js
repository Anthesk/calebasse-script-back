import { ObjectId } from 'mongodb'
import Mongo from '../mongo.js'

export default async function (req, res, next) {
  if (req.body.scriptId == null) {
    next({ message: 'A sequence needs a script ID', status: 400 })
    return
  }

  let script

  try {
    script = await Mongo.collection('scripts').findOne(ObjectId(req.body.scriptId))
  } catch (e) {
    next({ message: e, status: 500 })
    return
  }

  if (script == null) {
    next({ message: 'Script not found', status: 500 })
    return
  }

  const dateNow = new Date()
  const newSequence = {
    name: req.body.name ?? 'New Sequence',
    scriptId: script._id,
    shots: [],
    creationDate: dateNow,
    lastUpdatedDate: dateNow
  }

  try {
    const id = (await Mongo.collection('sequences').insertOne(newSequence)).insertedId
    newSequence._id = id

    const sequences = script.sequences
    sequences.push(newSequence._id)

    Mongo.collection('scripts').updateOne({ _id: ObjectId(script._id) }, { $set: { sequences, lastUpdatedDate: new Date() } })
  } catch (e) {
    next({ message: e, status: 500 })
    return
  }

  res.send(newSequence)
}
