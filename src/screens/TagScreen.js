import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native'
import { colors } from '../constant/theme'
import { connect } from 'react-redux'
import { tagSave, changeTag } from '../redux/actions/tagSave'
import { Overlay } from 'react-native-elements'
import ThemList from '../components/ThemList'


class TagScreen extends Component {
  state = {
    text: null,
    isVisible: false,
    themeColor: null,
    isSaving: false
  }
  render() {
    // console.log(this.props.route.params)
    const name = this.props.route.params.name || null
    const changeTag = this.props.route.params.changeTag || null
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
            defaultValue={changeTag ? name : null}
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
          <Text style={{ ...styles.subTxt, color: userData.color }}>{changeTag ? '保存修改' : '新建分类'}</Text>
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
  theme = () => {
    if (this.props.route.params.changeTag) {
      const index = this.props.route.params.tagIndex
      const tagColor = this.props.tagList[index].color
      this.setState({
        themeColor: tagColor
      })
      return
    }
    this.setState({
      themeColor: this.props.userSetting.color
    })
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
    const data = this.props.tagList
    const changeData = this.state.text
    const tagIndex = this.props.route.params.tagIndex
    const color = this.state.themeColor
    if (this.state.isSaving === true) {
      return
    }
    if (!changeData) {
      if (this.props.route.params.changeTag) {
        data[tagIndex].color = color
        this.props.changeTag(data)
        this.props.navigation.navigate('Home')
        return
      }
      Alert.alert('请先输入内容再保存哦')
      return
    }
    if (this.props.route.params.changeTag) {
      data[tagIndex].color = color
      data[tagIndex].tagName = changeData
      this.props.changeTag(data)
    } else {
      this.saveData()
    }
    this.props.navigation.navigate('Home')
  }
  changeTheme = () => {
    Keyboard.dismiss()
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
    this.theme()
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
  return {
    tagList: state.tagReducer,
    userSetting: state.userReducer
  }
}
export default connect(mapState, { tagSave, changeTag })(TagScreen)