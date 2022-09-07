export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://mongo:27017',
  dbName: 'test',
  collectionName: 'collectionTest'
}
