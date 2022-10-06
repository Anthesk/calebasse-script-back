import Mongo from '../mongo'

export default async function (req, res, next) {
  try {
    if (req.query._id == null) {
      next({ message: 'Sequence\'s id is mandatory', status: 400 })
      return
    }

    const dateNow = new Date()
    const newSequence = await Mongo.collection('sequences').findOne(req.query._id)

    if (newSequence == null) {
      next({ message: 'Sequence not found', status: 404 })
    }

    newSequence.name = req.query.newName ?? newSequence.name
    newSequence.lastUpdatedDate = dateNow

    await Mongo.collection('sequences').updateOne(req.query._id, { name: req.query.newName, lastUpdatedDate: dateNow })

    res.send(newSequence)
  } catch (e) {
    next(e)
  }
}
