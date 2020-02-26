import actionType from './actionType'

export const tagSave = (data) => {
  return {
    type: actionType.SaveTag,
    payload: {
      data
    }
  }
}

export const changeTag = (data) => {
  return {
    type: actionType.ChangeTag,
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

export const changeNote = (data, changeData, tagIndex, color, noteIndex) => {
  data[tagIndex].noteList[noteIndex].text = changeData
  data[tagIndex].noteList[noteIndex].color = color
  return {
    type: actionType.SaveNote,
    payload: {
      listData: data
    }
  }
}