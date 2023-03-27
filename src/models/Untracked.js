import Realm from 'realm';
// Define object models
export class Untracked extends Realm.Object {
  static schema = {
    name: 'Untracked',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        type: "string",
        updated_at: "date",
        data: 'CheckList?',
    }
  };
}
