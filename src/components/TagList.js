import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { height } from '../constant/theme'
import { AntDesign } from '@expo/vector-icons'
import TagBox from './TagBox'
import { connect } from 'react-redux'

class TagList extends Component {
  state = {

  }
  render() {
    console.log(this.props.tagList)
    return (
      <FlatList
        data={this.props.tagList}
        renderItem={({ item, index }) => <TagBox data={item} index={index} toTagContent={this.props.toTagContent} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            {/* <Text
              style={{
                paddingVertical: 50,
                fontSize: 17,
                color: '#f4511e'
              }}
            >
              哎呀，还没有内容，点击下面立即开始！
          </Text> */}
            <TouchableOpacity
              style={styles.plusBox}
              onPress={this.props.newTag}
            >
              <AntDesign
                name='plus'
                size={90}
                color='#f4511e'
              />
              <Text style={styles.plusText}>
                创建新分类
            </Text>
            </TouchableOpacity>
          </View>
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  emptyBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    marginTop: -50
  },
  plusBox: {
    width: 150,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    borderWidth: 1,
    borderColor: '#f4511e',
    borderRadius: 10
  },
  plusText: {
    marginTop: 20,
    fontSize: 16,
    color: '#f4511e'
  }
})

const mapState = state => ({ listData: state.tagReducer })
export default connect(mapState)(TagList)
// export default TagList