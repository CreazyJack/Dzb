import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { height } from '../constant/theme'
import { AntDesign } from '@expo/vector-icons'
import TagContentBox from './TagContentBox'


export default class TagContentList extends PureComponent {
  render() {
    return (
      <FlatList
        data={this.props.listData}
        renderItem={({ item, index }) => <TagContentBox data={item} index={index} toNote={this.props.toNote} userSetting={this.props.userSetting} />}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            {/* <Text
              style={{
                paddingVertical: 50,
                fontSize: 17,
                color: '#f4511e'
              }}
            >
              哎呀，还没有内容，点击下面添加第一条想法
          </Text> */}
            <TouchableOpacity
              style={{ ...styles.plusBox, borderColor: this.props.color }}
              onPress={() => this.props.toNote('添加想法')}
            >
              <AntDesign
                name='plus'
                size={90}
                color={this.props.color}
              />
              <Text style={{ ...styles.plusText, color: this.props.color }}>
                添加想法
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
    marginTop: -20
  },
  plusBox: {
    width: 150,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    borderWidth: 1,
    borderRadius: 10
  },
  plusText: {
    marginTop: 20,
    fontSize: 16,
  }
})