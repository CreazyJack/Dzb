import React from 'react'
import { View, StyleSheet, DeviceEventEmitter, Text } from 'react-native'
import TagList from '../components/TagList'
import { connect } from 'react-redux'
import { tagSave } from '../redux/actions/tagSave'


class Home extends React.PureComponent {
	render() {
		return (
			<View style={styles.container}>
				<TagList
					newTag={this.newTag}
					toTagContent={this.toTagContent}
					tagList={this.props.tagList}
					userSetting={this.props.userSetting}
				/>
			</View>
		)
	}

	toTagContent = (name, tagIndex) => {
		this.props.navigation.navigate('TagContentScreen', { name, tagIndex })
	}

	newTag = () => {
		this.props.navigation.navigate('TagScreen')
	}

	componentDidMount() {
		// DeviceEventEmitter.addListener('tagChange', params => {
		// 	this.setState({
		// 		listData: params
		// 	})
		// })
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20
	}
})



const mapState = state => ({ tagList: state.tagReducer, userSetting: state.userReducer })

export default connect(mapState, { tagSave })(Home)

// export default Home