import React from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../constant/theme'


const ThemList = ({ click }) => {
  return (
    <FlatList
      data={colors}
      renderItem={({ item, index }) => <ThemeBox data={item} click={click} />}
      keyExtractor={(item, index) => index.toString()}
      numColumns={5}
      contentContainerStyle={styles.list}
    />
  )
}

const ThemeBox = ({ click, data }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.themeBox, backgroundColor: data.color }}
      onPress={() => click(data.color)}
    />
  )
}

const styles = StyleSheet.create({
  themeBox: {
    width: 50,
    height: 50,
    borderRadius: 5,
    margin: 1
  },
  list: {
    width: 300,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center'

  }
})
export default ThemList
