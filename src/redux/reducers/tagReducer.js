// 为了避免 actionType 重复，所以一般会把 actionType 放在一个文件里统一管理，也可以避免写错 actionType
import actionType from "../actions/actionType"

// 为了方便测试，这里有一个个初始化的状态
// 如果是列表页，此处是一个数组，而对于详情页来说，此处是一个对象
const initState = []

export default (state = initState, action) => {
  // 根据不同的 action.type ，做不同的处理，每次返回一个新的 state ，返回的类型要一样
  switch (action.type) {
    case actionType.SaveTag:
      state = [...state, action.payload.listData]
      return state
    case actionType.DeleteTag:
      state = action.payload.listData
      return state
    case actionType.DeleteNote:
      // 做一次深拷贝，让组件自动刷新 state，多层嵌套的数组或对象无法触发自动刷新
      var listData1 = JSON.stringify(action.payload.listData)
      var listData2 = JSON.parse(listData1)
      state = listData2
      return state
    case actionType.ChangeTag:
      var listData1 = JSON.stringify(action.payload.listData)
      var listData2 = JSON.parse(listData1)
      state = listData2
      return state
    case actionType.SaveNote:
      // 做一次深拷贝，让组件自动刷新 state，多层嵌套的数组或对象无法触发自动刷新
      var listData1 = JSON.stringify(action.payload.listData)
      var listData2 = JSON.parse(listData1)
      state = listData2
      return state
    case actionType.ChangeNote:
      // 做一次深拷贝，让组件自动刷新 state，多层嵌套的数组或对象无法触发自动刷新
      var listData1 = JSON.stringify(action.payload.listData)
      var listData2 = JSON.parse(listData1)
      state = listData2
      return state
    // 一定要有一个 default ，当 actionType 不对的时候，就不做任何处理，返回上一次的 state 
    default:
      return state
  }
}