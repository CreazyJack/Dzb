import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import { colors } from '../constant/theme'
import { connect } from 'react-redux'
import { tagSave } from '../redux/actions/tagSave'
import { Overlay } from 'react-native-elements'
import ThemList from '../components/ThemList'


class TagScreen extends Component {
  state = {
    text: null,
    isVisible: false,
    themeColor: '#f4511e',
  }
  render() {
    const userData = this.props.userSetting
    return (
      <View style={styles.container}>
        <Text style={{ ...styles.title, color: userData.color }}>请输入分类名：</Text>
        <View style={{ ...styles.inputBox, borderColor: userData.color }}>
          <TextInput
            style={{ ...styles.inputTxt, color: userData.color }}
            placeholder='不超过十个字'
            maxLength={10}
            onChangeText={value => this.setState({ text: value })}
          />
        </View>
        <TouchableOpacity
          style={styles.themeBox}
          onPress={this.changeTheme}
        >
          <Text style={{ ...styles.subTxt, color: userData.color }}>分类主题:</Text>
          <View style={{ ...styles.themeBtn, backgroundColor: this.state.themeColor }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.subBtn, borderColor: userData.color }}
          onPress={this.subBtn}
        >
          <Text style={{ ...styles.subTxt, color: userData.color }}>保存</Text>
        </TouchableOpacity>

        <Overlay
          isVisible={this.state.isVisible}
          // windowBackgroundColor="rgba(255, 255, 255, .5)"
          // overlayBackgroundColor="red"
          width={"auto"}
          height={300}
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <ThemList click={this.clickColor} />
        </Overlay>
      </View>
    )
  }

  saveData = () => {
    const tagData = {
      tagName: this.state.text,
      color: this.state.themeColor,
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
  changeTheme = () => {
    this.setState({
      isVisible: true
    })
  }
  clickColor = (color) => {
    this.setState({
      isVisible: false,
      themeColor: color
    })
  }

  componentDidMount() {
    this.setState({
      themeColor: this.props.userSetting.color
    })
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
  themeBox: {
    width: 200,
    height: 50,
    fontSize: 16,
    color: colors.primary,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center'
  },
  themeBtn: {
    width: 20,
    height: 20,
    fontSize: 16,
    color: colors.primary,
    backgroundColor: 'blue',
    marginLeft: 30,
    borderRadius: 2
  },
  subBtn: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  subTxt: {
    color: colors.primary,
    fontSize: 16
  }
})

// const mapState = state => ({ tagList: state.tagReducer })
const mapState = state => {
  console.log(state)
  return {
    tagList: state.tagReducer,
    userSetting: state.userReducer
  }
}
export default connect(mapState, { tagSave })(TagScreen)