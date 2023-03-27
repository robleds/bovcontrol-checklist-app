// Import realm dependencies
import {createRealmContext} from '@realm/react';
import {CheckList} from './../models/CheckList'
import {Farmer} from './../models/Farmer'
import {From} from './../models/From'
import {To} from './../models/To'
import {Location} from './../models/Location'
import {Untracked} from './../models/Untracked'

export const RealmContext = createRealmContext({
  schema: [Untracked,CheckList,Farmer,From,To,Location],
});
