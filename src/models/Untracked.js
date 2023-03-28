import Realm from 'realm';
// Define object models
export class Untracked extends Realm.Object {
  static schema = {
    name: 'Untracked',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        operation: "string",
        updated_at: "date",
        children_id: 'string',
        children_data: 'CheckList?',
    }
  };
}
