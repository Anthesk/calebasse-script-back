import config from '../config.js'
import Mongo from '../mongo.js'

export default async function (req, res) {
  await Mongo.collection(config.collectionName).insertOne({ y: 2 })
  res.end()
}
