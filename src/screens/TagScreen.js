import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import { colors } from '../constant/theme'
import { connect } from 'react-redux'
import { tagSave } from '../redux/actions/tagSave'
import { add } from '../redux/actions/noteSave'

class TagScreen extends Component {
  state = {
    text: null
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>请输入分类名：</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputTxt}
            placeholder='不超过十个字'
            maxLength={10}
            onChangeText={value => this.setState({ text: value })}
          />
        </View>
        <TouchableOpacity
          style={styles.subBtn}
          onPress={this.subBtn}
        >
          <Text style={styles.subTxt}>保存</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subBtn}
          onPress={this.props.add}
        >
          <Text style={styles.subTxt}>改变主题</Text>
        </TouchableOpacity>
      </View>
    )
  }

  saveData = () => {
    const tagData = {
      tagName: this.state.text,
      color: 'red',
      noteList: []
    }
    this.props.tagSave(tagData)
  }
  subBtn = () => {
    if (!this.state.text) {
      Alert.alert('内容不能为空')
      return
    }
    this.saveData()
    this.props.navigation.navigate('Home')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    width: 200,
    height: 30,
    color: colors.primary,
    fontSize: 18
  },
  inputBox: {
    width: 200,
    height: 50,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10
  },
  inputTxt: {
    paddingLeft: 10,
    width: 190,
    height: 50,
    fontSize: 16,
    color: colors.primary
  },
  subBtn: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subTxt: {
    color: colors.primary,
    fontSize: 16
  }
})

// const mapState = state => ({ tagList: state.tagReducer })
const mapState = state => {
  console.log(state)
  return { tagList: state.tagReducer }
}
export default connect(mapState, { tagSave, add })(TagScreen)