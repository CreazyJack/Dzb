import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { colors } from '../constant/theme'
import { connect } from 'react-redux'
import { Overlay } from 'react-native-elements'
import ThemList from '../components/ThemList'
import { noteSave } from '../redux/actions/tagSave'

class NoteScreen extends Component {
  state = {
    text: null,
    isSaving: false,
    themeColor: '#f4511e',
    isVisible: false,
  }
  render() {
    const index = this.props.route.params.tagIndex
    // 获得分类标签的颜色
    const tagColor = this.props.listData[index].color
    return (
      <View style={styles.container}>
        <Text style={{ ...styles.title, color: tagColor }}>请输入内容：</Text>
        <View style={{ ...styles.inputBox, borderColor: tagColor }}>
          <TextInput
            style={{ ...styles.inputTxt, color: tagColor }}
            placeholder='不超过一百五十字'
            maxLength={150}
            onChangeText={value => this.setState({ text: value })}
            multiline
          />
        </View>
        <TouchableOpacity
          style={styles.themeBox}
          onPress={this.changeTheme}
        >
          <Text style={{ ...styles.subTxt, color: tagColor }}>主题:</Text>
          <View style={{ ...styles.themeBtn, backgroundColor: this.state.themeColor }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.subBtn, borderColor: tagColor }}
          onPress={this.subBtn}
        >
          <Text style={{ ...styles.subTxt, color: tagColor }}>保存</Text>
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
    const index = this.props.route.params.tagIndex
    const tagColor = this.props.listData[index].color
    this.setState({
      themeColor: tagColor
    })
  }
  subBtn = () => {
    // 防止重复保存👇
    if (this.state.isSaving === true) {
      return
    }
    const data = this.props.listData
    const changeData = this.state.text
    const tagIndex = this.props.route.params.tagIndex
    const color = this.state.themeColor
    // this.props.noteSave(data, changeData, tagIndex, color)
    this.props.noteSave(data, changeData, tagIndex, color)
    this.setState({ isSaving: true }, () => this.props.navigation.navigate('TagContentScreen'))
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
export default connect(mapState, { noteSave })(NoteScreen)