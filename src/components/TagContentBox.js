import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { width, height, colors } from '../constant/theme'


export default class TagBox extends PureComponent {
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.toNote('修改内容')}
      >
        <Text style={styles.text}>{this.props.data.content}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    color: colors.primary,
    width: width * 0.9,
    textAlign: 'center',
    paddingHorizontal: 10
  }
})