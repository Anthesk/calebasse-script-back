const mongoUser = encodeURIComponent('calebasse-script-back');
const mongoPwd = encodeURIComponent('+Pf}iu.2xG2b8VQ=Dr');

export default {
  mongoUrl: `mongodb://${mongoUser}:${mongoPwd}@mongo:27017/?authMechanism=SCRAM-SHA-1&authSource=calebasse-script-back`,
  dbName: 'calebasse-script-back'
}
