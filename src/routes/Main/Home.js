import React, {useEffect} from 'react'
import {Linking} from 'react-native'
import { Text, Spinner, Button } from 'native-base'
import { connect } from 'react-redux'
import { Post } from '../../components/Post'
import CreatePost from '../../components/CreatePost/CreatePost'
import styles from '../../styles/common'

const Home = (props) => {
    const { loading, posts, hasErrors, onHomePostSend, showPosts, postTypes, user } = props

    // Show loading, error, or success state
    const renderPosts = () => {
        // alert(JSON.stringify(user))
        
        if (hasErrors) return <Text>Unable to display memes.</Text>
        if (posts.length === 0) return <Text style={styles.noData }>No memes found to display.</Text>
        return posts.map((post) => <Post key={post.id} post={post} user={user} />)
    }
    if (showPosts)
        return (
            <CreatePost
                onPostSend={(data) => onHomePostSend(data)}
                postTypes={postTypes} user={user}
            />
        )

    return (
        <>
            {/* <Button  onPress={()=>{Linking.openURL('app://memefeed')}}><Text>Click me to open Memefeed</Text></Button> */}
            {loading ? <Spinner color="#00639c" style={{ marginTop: 10, alignSelf: 'center' }} /> : null}
            {renderPosts()}
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    postTypes: state.postTypes
})
export default connect(mapStateToProps)(Home)