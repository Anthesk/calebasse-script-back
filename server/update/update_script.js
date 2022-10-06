import Mongo from '../mongo'

export default async function (req, res, next) {
  try {
    if (req.query._id == null) {
      next({ message: 'Script\'s id is mandatory', status: 400 })
      return
    }

    const dateNow = new Date()
    const newScript = await Mongo.collection('scripts').findOne(req.query._id)

    if (newScript == null) {
      next({ message: 'Script not found', status: 404 })
    }

    newScript.name = req.query.newName ?? newScript.name
    newScript.lastUpdatedDate = dateNow

    await Mongo.collection('scripts').updateOne(req.query._id, { name: req.query.newName, lastUpdatedDate: dateNow })

    res.send(newScript)
  } catch (e) {
    next(e)
  }
}
