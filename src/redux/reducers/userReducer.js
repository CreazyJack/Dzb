// 为了避免 actionType 重复，所以一般会把 actionType 放在一个文件里统一管理，也可以避免写错 actionType
import actionType from "../actions/actionType"
import { colors } from '../../constant/theme'
// 为了方便测试，这里有一个个初始化的状态
// 如果是列表页，此处是一个数组，而对于详情页来说，此处是一个对象
const initState = {
  color: colors[0].color,
  tagFontSize: 18,
  noteFontSize: 16,
}

export default (state = initState, action) => {
  // 根据不同的 action.type ，做不同的处理，每次返回一个新的 state ，返回的类型要一样
  switch (action.type) {
    case actionType.UserReducer:
      return state
    // 一定要有一个 default ，当 actionType 不对的时候，就不做任何处理，返回上一次的 state 
    default:
      return state
  }
}