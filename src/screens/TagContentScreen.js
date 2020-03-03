import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Animated, Easing, BackHandler } from 'react-native'
import TagContentList from '../components/TagContentList'
import { connect } from 'react-redux'
import Modal from "react-native-modal"
import { AntDesign } from '@expo/vector-icons'
import { width } from '../constant/theme'
import { deleteNote, deleteTag } from '../redux/actions/tagSave'

const deleteIndex = []
class TagContentScreen extends Component {
  state = {
    isLongClick: false,
    noteIndex: null,
    name: null,
    isDelete: false,
    height: new Animated.Value(0)
  }

  render() {
    const tagIndex = this.props.route.params.tagIndex
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1
          }}
        >
          <TagContentList
            listData={this.props.listData[tagIndex].noteList}
            toNote={this.toNote}
            tagIndex={tagIndex}
            color={this.props.listData[tagIndex].color}
            userSetting={this.props.userSetting}
            longClick={this.longClick}
            isLongClick={this.state.isLongClick}
            pushIndex={this.pushIndex}
          />
        </View>
        <Modal
          isVisible={this.state.isDelete}
          onBackButtonPress={() => this.setState({ isDelete: false })}
          onBackdropPress={() => this.setState({ isDelete: false })}
          backdropColor={this.props.userSetting.color}
          backdropOpacity={0}
          animationInTiming={100}
          animationOutTiming={100}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
        >
          <View style={{
            height: 120,
            width: width * 0.6,
            backgroundColor: 'white',
            alignSelf: 'center',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text
              style={{
                fontSize: 18,
                padding: 10,
                color: this.props.listData[tagIndex].color
              }}
            >确定删除选中项?</Text>
            <View
              style={{
                flexDirection: 'row',
                width: 150,
                // height: 80,
                marginTop: 20,
                justifyContent: 'space-around'
              }}
            >
              <TouchableOpacity
                onPress={this.deleteConfirm}
              >
                <Text style={{
                  fontSize: 16,
                  color: this.props.listData[tagIndex].color
                }}>确定</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.deleteConsole}
              >
                <Text style={{
                  fontSize: 16,
                  color: this.props.listData[tagIndex].color
                }}>取消</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Animated.View
          style={{
            height: this.state.height,
            backgroundColor: this.props.listData[tagIndex].color,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
          <TouchableOpacity
            style={{
              ...styles.iconBox,
              width: 50,
              height: 50,
            }}
            onPress={this.deleteNote}
          >
            <AntDesign
              name='delete'
              size={this.state.isLongClick ? 25 : 0}
              color='#fff'
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.iconBox,
              width: 50,
              height: 50,
            }}
            onPress={this.hideModal}
          >
            <AntDesign
              name='back'
              size={this.state.isLongClick ? 25 : 0}
              color='#fff'
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }

  toNote = (name, noteColor, noteTxt, noteIndex) => {
    this.props.navigation.navigate('NoteScreen', {
      name,
      id: this.props.route.params.name,
      tagIndex: this.props.route.params.tagIndex,
      noteColor,
      noteTxt,
      noteIndex
    })
  }

  longClick = (noteIndex) => {
    console.log('longClick')
    this.setState({
      isLongClick: true,
      noteIndex
    })
    this.props.navigation.setParams({ headerShown: false })
    this.liftUp()
  }

  hideModal = () => {
    this.setState({
      isLongClick: false
    })
    this.liftDown()
  }

  deleteNote = () => {
    this.setState({
      isDelete: true
    })
  }

  deleteConfirm = () => {
    if (!deleteIndex) {
      this.setState({
        isDelete: false,
        isLongClick: false
      })
      return
    }
    const tagIndex = this.props.route.params.tagIndex
    let data = this.props.listData
    let list = data[tagIndex].noteList.filter(item => item.isSelected === false)
    data[tagIndex].noteList = list
    console.log(list)
    this.props.deleteNote(data)
    this.setState({
      isDelete: false,
      isLongClick: false
    })
    this.liftDown()
  }

  deleteConsole = () => {
    this.setState({
      isDelete: false
    })
  }

  liftUp = () => {
    Animated.timing(
      this.state.height,
      {
        toValue: 50,  //动画最终值
        duration: 500,   //动画时长
        easing: Easing.linear,
      }
    ).start()
  }

  liftDown = () => {
    const tagIndex = this.props.route.params.tagIndex
    const data = this.props.listData
    data[tagIndex].noteList.forEach(item => item.isSelected = false)
    this.props.deleteNote(data)
    Animated.timing(
      this.state.height,
      {
        toValue: 0,  //动画最终值
        duration: 500,   //动画时长
        easing: Easing.linear,
      }
    ).start()
    this.setState({ isLongClick: false })
    this.props.navigation.setParams({ headerShown: true })
    return false
  }

  pushIndex = (index) => {
    const tagIndex = this.props.route.params.tagIndex
    const repeatIndex = deleteIndex.findIndex(item => item === index)
    const data = this.props.listData

    if (repeatIndex === -1) {
      deleteIndex.push(index)
      data[tagIndex].noteList[index].isSelected = true
      this.props.deleteNote(data)
      return
    }
    deleteIndex.splice(repeatIndex, 1)
    data[tagIndex].noteList[index].isSelected = false
    this.props.deleteNote(data)
  }

  backForAndroid = () => {
    if (this.state.isLongClick) {
      this.liftDown()
      return true
    } else {
      return false
    }
  }

  componentDidMount() {
    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
    //   // do something
    //   console.log('focus')
    // })
    BackHandler.addEventListener('hardwareBackPress', this.backForAndroid)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backForAndroid)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  popupList: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  iconBox: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})


const mapState = state => ({
  listData: state.tagReducer,
  userSetting: state.userReducer
})
export default connect(mapState, { deleteNote, deleteTag })(TagContentScreen)