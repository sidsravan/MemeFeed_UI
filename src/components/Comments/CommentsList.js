import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Text, List, Spinner, Content} from 'native-base'
import Comment from "./Comment"
import styles from '../../styles/common'
import { fetchComments } from "../../actions/commentsActions"

// This component displays name from Context
const CommentsList = ({dispatch, loading, hasErrors, post, comments, user}) => {
    
    useEffect(() => {
        dispatch(fetchComments(post.id))
        // console.log("comments: " + JSON.stringify(comments))
    }, [dispatch])

    // Comment render
    const renderComments = () => {
        if (hasErrors) return <Text style={styles.error}>Unable to display comments.</Text>
        if (comments.length > 0) return comments.map(comment => <Comment key={comment.id} comment={comment} post={post} />)
        return <Text style={styles.noData}>No comments to display.</Text>
    }
    return (
        <Content>
            {loading ? <Spinner color="#00639c" style={{ marginTop: 10, alignSelf: 'center' }} /> : null}
            <List>{renderComments()}</List>
        </Content>
    )
}
const mapStateToProps = (state) => ({
    user: state.user,
    loading: state.comments.loading,
    comments: state.comments.comments,
    hasErrors: state.comments.hasErrors
})
export default connect(mapStateToProps)(CommentsList)