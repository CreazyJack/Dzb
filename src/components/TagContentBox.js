import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { width, height, colors } from '../constant/theme'
import { CheckBox } from 'react-native-elements'

export default class TagBox extends PureComponent {
  render() {
    return (
      <TouchableOpacity
        style={{ ...styles.container, borderColor: this.props.data.color }}
        onPress={() => {
          if (this.props.isLongClick) {
            this.props.pushIndex(this.props.index)
            return
          }
          this.props.toNote('修改内容', this.props.data.color, this.props.data.text, this.props.index)
        }}
        onLongPress={() => this.props.longClick()}
      >
        {
          this.props.isLongClick
            ?
            <CheckBox
              checked={this.props.data.isSelected}
              containerStyle={{
                padding: 0,
                left: 0,
                top: 3,
                position: 'absolute'
              }}
              checkedColor={this.props.data.color}
              uncheckedColor={this.props.data.color}
            />
            :
            null
        }
        <Text style={{
          ...styles.text,
          fontSize: this.props.userSetting.noteFontSize,
          color: this.props.data.color,
          width: width * 0.9,
          paddingLeft: this.props.isLongClick ? 50 : 10,
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
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    color: colors.primary,
    // textAlign: 'center',
    paddingHorizontal: 10
  }
})