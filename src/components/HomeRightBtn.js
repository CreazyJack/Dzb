import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'


const HomeRightBtn = ({ tintColor, navigate }) => {
  return (
    <TouchableOpacity
      style={styles.rightBtn}
      onPress={() => navigate('TagScreen')}
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

export default HomeRightBtn
