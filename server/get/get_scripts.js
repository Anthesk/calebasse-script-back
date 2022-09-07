import Mongo from '../mongo.js'

export default async function (req, res) {
  res.send(await Mongo.collection('scripts').find({}).toArray())
}
