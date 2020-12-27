import React from 'react'
import {View, Text, Platform} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../styles/common'
import Ionicon from 'react-native-vector-icons/dist/Ionicons'
import MIcon from 'react-native-vector-icons/dist/MaterialIcons'
import { googleSignOut, fbSignOut } from '../utils'

const DrawerContent = (props) => {
    const {user} = props
    
    const handleSignout = async () => {
        try {
			if (user.data.login_with === 'gmail') {
				googleSignOut()
			} else if (user.data.login_with === 'facebook') {
				fbSignOut()
			}
            await AsyncStorage.removeItem('userData')
            // props.navigation.navigate('BasicLogin')
		} catch (error) {
            console.log(error)
			alert("User data not removed.")
		}
    }
    return(
        <View style={styles.flex1}>
            <DrawerContentScrollView {...props}>
                <View>
                    <Text>Main content</Text>
                </View>
            </DrawerContentScrollView>
            <View>
                <DrawerItem label="Sign Out" icon={({color, size}) => (
                    <Ionicon size={20} name={Platform.OS === 'android' ? "md-log-out-outline" : "ios-log-out-outline"} />
                )} onPress={() => handleSignout()} />
            </View>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // handleFetchPosts: fetchPosts
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)