// import React, { Component } from 'react'
// import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert, DeviceEventEmitter } from 'react-native'
// import { colors } from '../constant/theme'


// export default class NoteScreen extends Component {
//   state = {
//     text: null
//   }
//   render() {
//     console.log(this.props.route.params)
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>请输入内容：</Text>
//         <View style={styles.inputBox}>
//           <TextInput
//             style={styles.inputTxt}
//             placeholder='不超过二百字'
//             maxLength={200}
//             onChangeText={value => this.setState({ text: value })}

//           />
//         </View>
//         <TouchableOpacity
//           style={styles.subBtn}
//           onPress={this.subBtn}
//         >
//           <Text style={styles.subTxt}>保存</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.subBtn}
//           onPress={() => this.setState({ text: this.inputValue.current }, () => console.log(this.state.text))}
//         >
//           <Text style={styles.subTxt}>测试</Text>
//         </TouchableOpacity>
//       </View>
//     )
//   }

 

//   subBtn = () => {
    
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   title: {
//     width: 200,
//     height: 30,
//     color: colors.primary,
//     fontSize: 18
//   },
//   inputBox: {
//     width: 200,
//     height: 50,
//     marginTop: 20,
//     borderWidth: 1,
//     borderColor: colors.primary,
//     borderRadius: 10
//   },
//   inputTxt: {
//     paddingLeft: 10,
//     width: 190,
//     height: 50,
//     fontSize: 16,
//     color: colors.primary
//   },
//   subBtn: {
//     width: 100,
//     height: 40,
//     borderWidth: 1,
//     borderColor: colors.primary,
//     borderRadius: 10,
//     marginTop: 30,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   subTxt: {
//     color: colors.primary,
//     fontSize: 16
//   }
// })