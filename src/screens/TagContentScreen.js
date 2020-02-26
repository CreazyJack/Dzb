import React, { Component } from 'react'
import { Text, View, DeviceEventEmitter } from 'react-native'
import TagContentList from '../components/TagContentList'
import { connect } from 'react-redux'

class TagContentScreen extends Component {
  render() {
    // console.log(this.props.route.params)
    // console.log(this.props.listData)
    const tagIndex = this.props.route.params.tagIndex
    return (
      <View>
        <TagContentList
          listData={this.props.listData[tagIndex].noteList}
          toNote={this.toNote}
          tagIndex={tagIndex}
          color={this.props.listData[tagIndex].color}
          userSetting={this.props.userSetting}
        />
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

  componentDidMount() {

  }
}

const mapState = state => ({
  listData: state.tagReducer,
  userSetting: state.userReducer
})
export default connect(mapState)(TagContentScreen)