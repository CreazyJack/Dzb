import actionType from './actionType'

export const tagSave = (data) => {
  return {
    type: actionType.SaveTag,
    payload: {
      data
    }
  }
}

export const noteSave = (data, changeData, tagIndex, color) => {
  // const listData = []
  data[tagIndex].noteList.push({ text: changeData, color })
  return {
    type: actionType.SaveNote,
    payload: {
      listData: data
    }
  }
}
