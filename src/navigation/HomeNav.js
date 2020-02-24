import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import TagScreen from '../screens/TagScreen'
import TagContentScreen from '../screens/TagContentScreen'
import NoteScreen from '../screens/NoteScreen'
import HomeRightBtn from '../components/HomeRightBtn'
import { DeviceEventEmitter } from 'react-native'


const Stack = createStackNavigator()

export default class Nav extends React.PureComponent {
  state = {
    theme: '#f4511e'
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerStyle: {
              backgroundColor: this.state.theme,
              height: 70,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              marginBottom: 0
            },
            headerTitleAlign: 'center',
            headerLeftContainerStyle: {},
            headerRightContainerStyle: {}
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: 'Home',
              headerRight: ({ tintColor }) => <HomeRightBtn tintColor={tintColor} navigate={navigation.navigate} purpose='TagScreen' name='新建分类' />
            })}
          />
          <Stack.Screen
            name="TagScreen"
            component={TagScreen}
            options={{
              title: '新建分类'
            }}
          />
          <Stack.Screen
            name="TagContentScreen"
            component={TagContentScreen}
            options={({ route, navigation }) => ({
              title: route.params.name,
              headerRight: ({ tintColor }) => <HomeRightBtn tintColor={tintColor} navigate={navigation.navigate} purpose='NoteScreen' name='添加想法' tagIndex={route.params.tagIndex} />
            })}
          />
          <Stack.Screen
            name="NoteScreen"
            component={NoteScreen}
            options={({ route, navigation }) => ({
              title: route.params.name
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  componentDidMount() {
    // 添加全局监听颜色变化
    DeviceEventEmitter.addListener('theme_change', params => {
      this.setState({
        theme: params
      })
    })
  }
}
