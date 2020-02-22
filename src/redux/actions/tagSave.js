import actionType from './actionType'

export const tagSave = (data) => {
  return {
    type: actionType.SaveTag,
    payload: {
      data
    }
  }
}
