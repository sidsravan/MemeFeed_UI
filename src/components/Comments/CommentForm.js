import React, { useCallback, useEffect, useState } from 'react'
import { encode } from 'base-64'
import { env } from '../../env'
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import { Footer, Item, Input } from 'native-base'
import Ionicon from 'react-native-vector-icons/dist/Ionicons'
import styles from '../../styles/common'
import { fetchComments } from '../../actions/commentsActions'
import { setCommentId } from '../../actions/childCommentsActions'

const CommentForm = ({ post, user, storeCommentId, handleCommentId, handleFetchComments }) => {
    const [value, setValue] = useState('')
    const [height, setHeight] = useState(0)

    useEffect(() => {
        setHeight(45)
    }, [])

    const submitComment = async () => {
        let data = {
            user_id: user.data.session_id,
            post_id: post.id,
            comment_id: 0,
            comment_text: value,
            comment_image: '',
            name: user.data.name,
            handle_name: user.data.handle_name,
            profile_image: user.data.profile_image
        }
        // alert(JSON.stringify(data))
        // dispatch(addComment(data))
        try {
            const username = 'memefeed'
            const password = 'Connect12345!'
            const myHeaders = new Headers()
            myHeaders.append('Content-Type', 'multipart/form-data')
            myHeaders.append(
                'Authorization',
                `Basic ${encode(`${username}:${password}`)}`
            )
            
        // alert(data.comment_id)

            let formData = new FormData()
            formData.append('user_id', data.user_id)
            formData.append('post_id', data.post_id)
            formData.append('parent_id', data.comment_id)
            formData.append('comment_text', data.comment_text)
            formData.append('comment_image', data.comment_image)
            formData.append('name', data.name)
            formData.append('handle_name', data.handle_name)
            formData.append('profile_image', data.profile_image)
            // console.log(JSON.stringify(formData))

            const url = `${env.baseUrl}comments/commentList` // --> add comment api for post
            const response = await fetch(url, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
            const res = await response.json()
            console.log("Comment response" + JSON.stringify(res))
            setValue('')
            setHeight(45)
            handleFetchComments(post.id)
        } catch (error) {
            alert(error)
            console.error(error)
            setValue('')
            setHeight(45)
        }
    }

    return (
        <Footer style={{ backgroundColor: '#fff', paddingHorizontal: 5, height: height, maxHeight: 120 }}>
            <Item rounded style={styles.commentInput} style={[styles.footerItem, { height: height }]}>
                <Input placeholder='Comment here..'
                    multiline={true}
                    style={[styles.input, { minHeight: 45, height: height, maxHeight: 120 }]}
                    onChangeText={(value) => setValue(value)}
                    value={value}
                    editable={true}
                    onContentSizeChange={(e) => setHeight(e.nativeEvent.contentSize.height)}
                // autoFocus={commentId > 0 ? true : false}
                // defaultValue={commentId}
                />
                <Ionicon active name='send' style={[styles.fs20, styles.themeColor]} onPress={submitComment} />
            </Item>
        </Footer>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user,
        storeCommentId: state.postComments.commentId,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleCommentId: setCommentId,
        handleFetchComments: fetchComments
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
// const mapStateToProps = (state) => ({
//     user: state.user
// })
// export default connect(mapStateToProps)(CommentForm)