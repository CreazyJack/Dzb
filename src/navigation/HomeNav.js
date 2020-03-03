import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import TagScreen from '../screens/TagScreen'
import TagContentScreen from '../screens/TagContentScreen'
import NoteScreen from '../screens/NoteScreen'
import SettingScreen from '../screens/SettingScreen'
import HomeRightBtn from '../components/HomeRightBtn'
import HomeLeftBtn from '../components/HomeLeftBtn'
import { DeviceEventEmitter } from 'react-native'
import { connect } from 'react-redux'

const Stack = createStackNavigator()

class Nav extends React.PureComponent {
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
              backgroundColor: this.props.color,
              height: 70,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
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
              headerRight: ({ tintColor }) => (
                <HomeRightBtn
                  tintColor={tintColor}
                  navigate={navigation.navigate}
                  purpose='TagScreen'
                  name='新建分类'
                />
              ),
              headerLeft: ({ tintColor }) => (
                <HomeLeftBtn
                  tintColor={tintColor}
                  navigate={navigation.navigate}
                  purpose='SettingScreen'
                  name='个人设置'
                />
              )
            })}
          />
          <Stack.Screen
            name="TagScreen"
            component={TagScreen}
            options={({ route }) => ({
              title: route.params.name,
            })}
          />
          <Stack.Screen
            name="TagContentScreen"
            component={TagContentScreen}
            options={({ route, navigation }) => ({
              title: route.params.headerShown ? route.params.name : '批量选择',
              headerRight: ({ tintColor }) => {
                if (route.params.headerShown) {
                  return (
                    <HomeRightBtn
                      tintColor={tintColor}
                      navigate={navigation.navigate}
                      purpose='NoteScreen' name='添加想法'
                      tagIndex={route.params.tagIndex}
                    />
                  )
                } else {
                  return null
                }
              },
              // headerShown: route.params.headerShown
            })}
          />
          <Stack.Screen
            name="NoteScreen"
            component={NoteScreen}
            options={({ route }) => ({
              title: route.params.name
            })}
          />
          <Stack.Screen
            name="SettingScreen"
            component={SettingScreen}
            options={({ route }) => ({
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

const mapState = state => ({ color: state.userReducer.color })
export default connect(mapState)(Nav)