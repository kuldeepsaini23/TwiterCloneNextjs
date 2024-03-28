import {types} from './types';
import {queries} from "./queries"
import {mutations} from "./mutations"
import { resolver } from './resolvers';

export const User = {
  types,
  queries,
  resolver,
  mutations
};  