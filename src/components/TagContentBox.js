import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { width, height, colors } from '../constant/theme'


export default class TagBox extends PureComponent {
  render() {
    return (
      <TouchableOpacity
        style={{ ...styles.container, borderColor: this.props.data.color }}
        onPress={() => this.props.toNote('修改内容', this.props.data.color, this.props.data.text,this.props.index)}
      >
        <Text style={{
          ...styles.text,
          fontSize: this.props.userSetting.tagFontSize,
          color: this.props.data.color,
        }}
          numberOfLines={1}
        >
          {this.props.data.text}
        </Text>
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