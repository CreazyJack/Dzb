// 为了避免 actionType 重复，所以一般会把 actionType 放在一个文件里统一管理，也可以避免写错 actionType
import actionType from "../actions/actionType"

// 为了方便测试，这里有一个个初始化的状态
// 如果是列表页，此处是一个数组，而对于详情页来说，此处是一个对象
const initState = []

export default (state = initState, action) => {
  // 根据不同的 action.type ，做不同的处理，每次返回一个新的 state ，返回的类型要一样
  switch (action.type) {
    case actionType.SaveTag:
      return [...state, action.payload.data]
    case actionType.SaveNote:
      var listData1 = JSON.stringify(action.payload.listData)
      var listData2 = JSON.parse(listData1)
      console.log(listData2)
      return listData2
    // 一定要有一个 default ，当 actionType 不对的时候，就不做任何处理，返回上一次的 state 
    default:
      return state
  }
}