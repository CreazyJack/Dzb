import React, { PureComponent } from 'react'
import { Text, View, DeviceEventEmitter } from 'react-native'
import TagContentList from '../components/TagContentList'
import { connect } from 'react-redux'

class TagContentScreen extends PureComponent {
  render() {
    return (
      <View>
        <TagContentList
          listData={this.state.listData}
          toNote={this.toNote}
        />
      </View>
    )
  }

  toNote = (name) => {
    this.props.navigation.navigate('NoteScreen', { name, id: this.props.route.params.name })
  }



  componentDidMount() {

  }
}

const mapState = state => ({ noteList: state.noteList })
export default connect(mapState)(TagContentScreen)