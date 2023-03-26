// Import realm dependencies
import {createRealmContext} from '@realm/react';
import {CheckList} from './../models/CheckList'
import {Farmer} from './../models/Farmer'
import {From} from './../models/From'
import {To} from './../models/To'
import {Location} from './../models/Location'

export const RealmContext = createRealmContext({
  schema: [CheckList,Farmer,From,To,Location],
});

