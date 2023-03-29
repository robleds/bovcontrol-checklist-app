import Realm from 'realm';
// Define object models
export class From extends Realm.Object {
    static schema = {
      name: 'From',
      properties: {
        "name": "string"
      }
    }
}