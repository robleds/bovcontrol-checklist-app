import Realm from 'realm';
// Define object models
export class LogProd extends Realm.Object {
    static schema = {
      name: 'LogProd',
      primaryKey: '_id',
      properties: {
        _id: 'string',
        message: "string",
        created_at: "date"
      }
    }
}