import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { width, height, colors } from '../constant/theme'


export default class TagBox extends PureComponent {
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.toTagContent(this.props.data.tagName, this.props.index)}
      >
        <Text style={styles.text}>{this.props.data.tagName}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: width * 0.4,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    marginTop: 20,
    marginLeft: width * 0.07,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    color: colors.primary,
    width: width * 0.3,
    textAlign: 'center',
  }
})