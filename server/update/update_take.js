import Mongo from '../mongo.js'

export default async function (req, res, next) {
  try {
    if (req.query._id == null) {
      next({ message: 'Shot\'s id is mandatory', status: 400 })
      return
    }

    const dateNow = new Date()
    const newShot = await Mongo.collection('shots').findOne(req.query._id)

    if (newShot == null) {
      next({ message: 'Shot not found', status: 404 })
    }

    newShot.name = req.query.newName ?? newShot.name
    newShot.lastUpdatedDate = dateNow

    await Mongo.collection('shots').updateOne(req.query._id, { name: req.query.newName, lastUpdatedDate: dateNow })

    res.send(newShot)
  } catch (e) {
    next(e)
  }
}
