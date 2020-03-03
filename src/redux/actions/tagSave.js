import actionType from './actionType'

export const tagSave = (data) => {
  return {
    type: actionType.SaveTag,
    payload: {
      listData: data
    }
  }
}

export const changeTag = (data) => {
  return {
    type: actionType.ChangeTag,
    payload: {
      listData: data
    }
  }
}

export const noteSave = (data, changeData, tagIndex, color) => {
  // const listData = []
  data[tagIndex].noteList.push({ text: changeData, color,isSelected: false })
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

// 改进后的方法，将逻辑放在组件中，将处理好的数据再传给 action
export const deleteTag = (data) => {
  return {
    type: actionType.DeleteTag,
    payload: {
      listData: data
    }
  }
}

export const deleteNote = (data) => {
  console.log('deleteNote',data)
  return {
    type: actionType.DeleteNote,
    payload: {
      listData: data
    }
  }
}