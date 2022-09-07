import config from '../config.js'
import Mongo from '../mongo.js'

export default async function (req, res) {
  console.log(await Mongo.collection(config.collectionName).find({}).toArray())
  res.end()
}
