import MongoClient from 'mongodb'
import config from './config.js'

class Mongo {
  static client = new MongoClient.MongoClient(config.mongoUrl)

  static async connect () {
    await Mongo.client.connect()
  }

  static disconnect () {
    Mongo.client.close()
  }

  static db () {
    return Mongo.client.db(config.dbName)
  }

  static collection (collectionName) {
    return Mongo.db().collection(collectionName)
  }
}

export default Mongo
