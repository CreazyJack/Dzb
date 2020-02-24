import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'


const TagContentRightBtn = ({ tintColor, navigate, purpose, name, tagIndex }) => {
  console.log(tagIndex)
  return (
    <TouchableOpacity
      style={styles.rightBtn}
      onPress={() => navigate(purpose, { name, tagIndex })}
    >
      <AntDesign
        name='plus'
        size={25}
        color={tintColor}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  rightBtn: {
    marginRight: 0,
    width: 50,
    alignItems: 'center'
  }
})

export default TagContentRightBtn
