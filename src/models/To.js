import Realm from 'realm';
// Define object models
export class To extends Realm.Object {
    static schema = {
      name: 'To',
      properties: {
        "name": "string"
      }
    }
}