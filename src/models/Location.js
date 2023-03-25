import Realm from 'realm';
// Define object models
export class Location extends Realm.Object {
    static schema = {
      name: 'Location',
      properties: {
        "latitude": 'double',
        "longitude": 'double'
      }
    }
}