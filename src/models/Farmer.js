import Realm from 'realm';
// Define object models
export class Farmer extends Realm.Object {
    static schema = {
      name: 'Farmer',
      properties: {
        "name": "string",
        "city": "string"
      }
    }
}