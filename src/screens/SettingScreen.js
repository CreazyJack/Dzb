import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Overlay, Slider, Tooltip } from 'react-native-elements'
import { colors, width } from '../constant/theme'
import { save } from '../redux/actions/userSetting'
import ThemList from '../components/ThemList'

class SettingScreen extends PureComponent {
  state = {
    themeColor: null,
    tagSize: 18,
    noteSize: 16,
    isVisible: false
  }
  render() {
    const userSetting = this.props.userSetting
    return (
      <View style={styles.container}>
        <View style={{ marginHorizontal: width * 0.1 }}>
          <TouchableOpacity
            style={styles.themeBox}
            onPress={this.changeTheme}
          >
            <Text style={{ ...styles.subTxt, color: userSetting.color }}>主题:</Text>
            <View
              style={{
                ...styles.themeBtn,
                backgroundColor: this.state.themeColor
              }}
            />
          </TouchableOpacity>
          <View
            style={styles.listBox}
          >
            <Text style={{
              color: userSetting.color,
              fontSize: 16
            }}>
              分类字体大小:</Text>
            <Slider
              value={this.state.tagSize}
              maximumValue={20}
              minimumValue={16}
              onValueChange={value => this.setState({ tagSize: value })}
              minimumTrackTintColor={userSetting.color}
              step={1}
              style={{
                width: width * 0.6,
                alignSelf: 'center',
                marginVertical: 10
              }}
              thumbStyle={{
                backgroundColor: userSetting.color
              }}
              thumbTouchSize={{ width: 200, height: 150 }}
            />
            <Text style={{
              color: userSetting.color,
              textAlign: 'center',
              fontSize: this.state.tagSize
            }}>
              {this.state.tagSize}</Text>
          </View>
          <View
            style={styles.listBox}
          >
            <Text style={{
              color: userSetting.color,
              fontSize: 16
            }}>
              想法字体大小:</Text>
            <Slider
              value={this.state.noteSize}
              maximumValue={18}
              minimumValue={14}
              onValueChange={value => this.setState({ noteSize: value })}
              minimumTrackTintColor={userSetting.color}
              step={1}
              style={{
                width: width * 0.6,
                alignSelf: 'center',
                marginVertical: 10
              }}
              thumbStyle={{
                backgroundColor: userSetting.color
              }}
              thumbTouchSize={{ width: 200, height: 150 }}
            />
            <Text style={{
              color: userSetting.color,
              textAlign: 'center',
              fontSize: this.state.noteSize
            }}>
              {this.state.noteSize}</Text>
          </View>
          <View>
            <Text style={{
              color: userSetting.color,
              fontSize: 14,
              marginBottom: 10
            }}>
              联系作者:</Text>
            <Text style={{
              paddingLeft: 15,
              marginTop: 0,
              color: userSetting.color,
              fontSize: 12
            }}>谷歌邮箱:  zhougm28331e@gmail.com</Text>
            <Text style={{
              paddingLeft: 15,
              marginTop: 0,
              color: userSetting.color,
              fontSize: 12
            }}>QQ邮箱:  913466287@qq.com</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ ...styles.subBtn, borderColor: userSetting.color }}
          onPress={this.subBtn}
        >
          <Text style={{ ...styles.subTxt, color: userSetting.color }}>保存</Text>
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

  subBtn = () => {
    const data = {
      color: this.state.themeColor,
      tagFontSize: this.state.tagSize,
      noteFontSize: this.state.noteSize,
    }
    this.props.save(data)
  }

  clickColor = (color) => {
    this.setState({
      isVisible: false,
      themeColor: color
    })
  }

  changeTheme = () => {
    this.setState({
      isVisible: true
    })
  }

  componentDidMount() {
    this.setState({
      themeColor: this.props.userSetting.color,
      tagSize: this.props.userSetting.tagFontSize,
      noteSize: this.props.userSetting.noteFontSize
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  themeBox: {
    width: 200,
    height: 50,
    fontSize: 16,
    color: colors.primary,
    flexDirection: 'row',
    // marginTop: 100,
    // alignItems: 'center'
  },
  listBox: {
    height: 50,
    color: colors.primary,
    marginBottom: 70
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
    borderRadius: 10,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subTxt: {
    fontSize: 16
  },
})


const mapState = state => ({ userSetting: state.userReducer })
export default connect(mapState, { save })(SettingScreen)