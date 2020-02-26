import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import TagList from '../components/TagList'
import { connect } from 'react-redux'
import { tagSave } from '../redux/actions/tagSave'
import Modal from "react-native-modal"
import { AntDesign } from '@expo/vector-icons'
import { Alert } from 'react-native'
import { set } from 'react-native-reanimated'

class Home extends React.PureComponent {
	state = {
		isLongClick: false,
		tagIndex: null,
		name: null,
		isDelete: false
	}
	render() {
		return (
			<View style={styles.container}>
				<TagList
					newTag={this.newTag}
					toTagContent={this.toTagContent}
					tagList={this.props.tagList}
					userSetting={this.props.userSetting}
					isLongClick={this.state.isLongClick}
					longClick={this.longClick}
				/>
				<Modal
					style={styles.modal}
					isVisible={this.state.isLongClick}
					onBackButtonPress={this.hideModal}
					onBackdropPress={this.hideModal}
					backdropColor={this.props.userSetting.color}
					backdropOpacity={0.1}
					animationInTiming={100}
					animationOutTiming={100}
				>
					<View style={styles.popupList}>
						<TouchableOpacity
							style={styles.iconBox}
							onPress={this.changeTag}
						>
							<AntDesign
								name='edit'
								size={25}
								color={this.props.userSetting.color}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.iconBox}
							onPress={this.deleteTag}
						>
							<AntDesign
								name='delete'
								size={25}
								color={this.props.userSetting.color}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.iconBox}
							onPress={this.deleteTag}
						>
							<AntDesign
								name='back'
								size={25}
								color={this.props.userSetting.color}
							/>
						</TouchableOpacity>
					</View>
				</Modal>
				<Modal
					// style={styles.modal}
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
						height: 150,
						width: 220,
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
								color: this.props.userSetting.color
							}}
						>确定删除: {this.state.name}?</Text>
						<View
							style={{
								flexDirection: 'row',
								width: 150,
								// height: 80,
								marginTop: 20,
								justifyContent: 'space-around'
							}}
						>
							<TouchableOpacity>
								<Text style={{
									fontSize: 16,
									color: this.props.userSetting.color
								}}>确定</Text>
							</TouchableOpacity>
							<TouchableOpacity>
								<Text style={{
									fontSize: 16,
									color: this.props.userSetting.color
								}}>取消</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</View>
		)
	}

	toTagContent = (name, tagIndex) => {
		this.props.navigation.navigate('TagContentScreen', { name, tagIndex })
	}

	newTag = (name) => {
		this.props.navigation.navigate('TagScreen', { name })
	}

	longClick = (name, index) => {
		console.log('longClick')
		this.setState({
			isLongClick: true,
			tagIndex: index,
			name
		})
	}

	hideModal = () => {
		this.setState({
			isLongClick: false
		})
	}

	changeTag = () => {
		this.hideModal()
		this.props.navigation.navigate('TagScreen', {
			tagIndex: this.state.tagIndex,
			name: this.state.name,
			changeTag: true
		})
	}

	deleteTag = () => {
		this.setState({
			isDelete: true
		})
		// Alert.alert(
		// 	'删除警告！',
		// 	`确定要删除:${this.state.name}?`,
		// 	[
		// 		{ text: '确定', onPress: () => console.log('点击确定') },
		// 		{ text: '取消', onPress: () => console.log('点击取消') }
		// 	]
		// )
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20
	},
	modal: {
		margin: 0,
		// height: 50,
		justifyContent: 'flex-end'
	},
	popupList: {
		height: 50,
		// width: 50,
		flexDirection: 'row',
		backgroundColor: 'white',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	iconBox: {
		height: 50,
		width: 50,
		justifyContent: 'center',
		alignItems: 'center',
	}
})



const mapState = state => ({ tagList: state.tagReducer, userSetting: state.userReducer })

export default connect(mapState, { tagSave })(Home)

// export default Home