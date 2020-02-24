import { combineReducers } from 'redux'
// 引入 cart reducer ，如果有多个，继续引入
import tagReducer from './tagReducer'
import userReducer from './userReducer'

// 导出合并后的 reducer 
export default combineReducers(
  // 把多个 reducer 作为 combineReducers 的对象参数传入，在外部就可以通过 store.getState().cart 来获取到 cartReducer 里面的 state
  { tagReducer, userReducer }
)