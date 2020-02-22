import React from 'react'
import { View, StyleSheet, DeviceEventEmitter, Text } from 'react-native'
import TagList from '../components/TagList'
import { connect } from 'react-redux'
import { tagSave } from '../redux/actions/tagSave'


class Home extends React.PureComponent {
	render() {
		console.log(this.props.tagList)
		return (
			<View style={styles.container}>
				<TagList
					newTag={this.newTag}
					toTagContent={this.toTagContent}
					tagList={this.props.tagList}
				/>
			</View>
		)
	}

	toTagContent = (name,index) => {
		this.props.navigation.navigate('TagContentScreen', { name,index })
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



const mapState = state => ({ tagList: state.tagReducer, count: state.noteReducer })

export default connect(mapState, { tagSave })(Home)

// export default Home