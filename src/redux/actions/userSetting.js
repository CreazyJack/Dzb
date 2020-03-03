import actionType from './actionType'

export const save = (data) => {
  console.log(data)
  return {
    type: actionType.UserSetting,
    payLoad: {
      userData: data
    }
  }
}