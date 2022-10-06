# calebasse-script-back

## Mongo configuration

```
docker exec -it mongo mongosh

use admin
db.createUser({user: "root", pwd: "root", roles: ["root"]})
exit

docker exec -it mongo mongosh -u root -p root

use calebasse-script-back
db.createUser({user: "calebasse-script-back", pwd: "${MONGO_PWD}", roles: [{role: "readWrite", db: "calebasse-script-back"}]})
exit
```
