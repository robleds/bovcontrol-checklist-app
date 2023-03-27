import Realm from 'realm';
// Define object models
export class CheckList extends Realm.Object {
  static schema = {
    name: 'CheckList',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        type: "string",
        amount_of_milk_produced: "string", // must to be number
        farmer: 'Farmer?',
        from: 'From?',
        to: 'To?',
        number_of_cows_head: "string", // must to be number
        had_supervision: 'bool',
        location: 'Location?',
        created_at: "date",
        updated_at: "date",
        __v: "int"
    }
  };
}
