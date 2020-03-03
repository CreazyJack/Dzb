import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'


const HomeLeftBtn = ({ tintColor, navigate, purpose, name, tagIndex }) => {
  return (
    <TouchableOpacity
      style={styles.leftBtn}
      onPress={() => navigate(purpose, { name, tagIndex })}
    >
      <AntDesign
        name='setting'
        size={25}
        color={tintColor}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  leftBtn: {
    marginRight: 0,
    width: 50,
    alignItems: 'center'
  }
})

export default HomeLeftBtn