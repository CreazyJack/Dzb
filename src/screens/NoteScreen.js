import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert, Keyboard, KeyboardAvoidingView } from 'react-native'
import { colors } from '../constant/theme'
import { connect } from 'react-redux'
import { Overlay } from 'react-native-elements'
import ThemList from '../components/ThemList'
import { noteSave, changeNote } from '../redux/actions/tagSave'


const alert = Alert.alert
class NoteScreen extends PureComponent {
  state = {
    text: null,
    isSaving: false,
    themeColor: null,
    isVisible: false,
  }
  render() {
    // console.log(this.props.route.params)
    const tagIndex = this.props.route.params.tagIndex
    // 获得分类标签的颜色
    const tagColor = this.props.listData[tagIndex].color
    const noteColor = this.props.route.params.noteColor
    const defaultTxt = this.props.route.params.noteTxt
    return (
      <KeyboardAvoidingView style={styles.container} behavior='height'>
        <Text style={{ ...styles.title, color: tagColor }}>请输入内容：</Text>
        <View style={{ ...styles.inputBox, borderColor: tagColor }}>
          <TextInput
            style={{ ...styles.inputTxt, color: tagColor }}
            placeholder='不超过一百五十字'
            maxLength={150}
            onChangeText={value => this.setState({ text: value })}
            multiline
            defaultValue={noteColor ? defaultTxt : null}
          />
        </View>
        <TouchableOpacity
          style={styles.themeBox}
          onPress={this.changeTheme}
        >
          <Text style={{ ...styles.subTxt, color: tagColor }}>主题:</Text>
          <View
            style={{
              ...styles.themeBtn,
              backgroundColor: this.state.themeColor
            }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.subBtn, borderColor: tagColor }}
          onPress={this.subBtn}
        >
          <Text style={{ ...styles.subTxt, color: tagColor }}>{noteColor ? '保存修改' : '添加'}</Text>
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
      </KeyboardAvoidingView>
    )
  }
  theme = () => {
    if (this.props.route.params.noteColor) {
      this.setState({
        themeColor: this.props.route.params.noteColor
      })
      return
    }
    const index = this.props.route.params.tagIndex
    const tagColor = this.props.listData[index].color
    this.setState({
      themeColor: tagColor
    })
  }
  subBtn = () => {
    const data = this.props.listData
    const changeData = this.state.text
    const tagIndex = this.props.route.params.tagIndex
    const color = this.state.themeColor
    // 防止重复保存👇
    if (this.state.isSaving === true) {
      return
    }
    if (!changeData) {
      if (this.props.route.params.noteTxt) {
        const noteIndex = this.props.route.params.noteIndex
        this.props.changeNote(data, this.props.route.params.noteTxt, tagIndex, color, noteIndex)
        this.setState({ isSaving: true }, () => this.props.navigation.navigate('TagContentScreen'))
        return
      }
      alert('请先输入内容再保存哦')
      return
    }
    if (this.props.route.params.noteTxt) {
      const noteIndex = this.props.route.params.noteIndex
      // console.log(data, changeData, tagIndex, color, noteIndex)
      this.props.changeNote(data, changeData, tagIndex, color, noteIndex)
    } else {
      this.props.noteSave(data, changeData, tagIndex, color)
    }
    this.setState({ isSaving: true }, () => this.props.navigation.navigate('TagContentScreen'))
  }
  changeTheme = () => {
    // 解决键盘引起的无法聚焦的问题👇
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
    width: 300,
    height: 30,
    color: colors.primary,
    fontSize: 18
  },
  inputBox: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10
  },
  inputTxt: {
    padding: 10,
    width: 300,
    height: 300,
    fontSize: 16,
    color: colors.primary,
    textAlignVertical: 'top'
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
})


const mapState = state => ({ listData: state.tagReducer })
export default connect(mapState, { noteSave, changeNote })(NoteScreen)