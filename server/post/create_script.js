import Mongo from '../mongo.js'

export default async function (req, res, next) {
  try {
    const dateNow = new Date()
    const newScript = {
      name: req.body.name ?? 'New Script',
      sequences: [],
      creationDate: dateNow,
      lastUpdatedDate: dateNow
    }

    const id = (await Mongo.collection('scripts').insertOne(newScript)).insertedId
    newScript._id = id

    res.send(newScript)
  } catch (e) {
    next(e)
  }
}
