import React, { useCallback, useState } from 'react'
import { Text, Thumbnail } from 'native-base'
import { View, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setCommentId } from '../../actions/childCommentsActions'
import { CommentLike } from './CommentLike'
import { CommentDisLike } from './CommentDisLike'
import { CommentShare } from './CommentShare'
import ChildCommentsList from './ChildCommentsList'

import CommentImg from '../../../assets/Comment.png'
import CommentColor from '../../../assets/Comment_Colour.png'
import defaultAvatar from '../../../assets/grayman.png' 
import ReplyModal from './ReplyModal'

const Comment = ({ comment, user, post, handleCommentId }) => {
    const [selectedVote, setSelectedVote] = useState('')
    const [shared, setShared] = useState('')
    const [showReply, setShowReply] = useState(false)

    return (
        <View key style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'column', width: '100%', alignSelf: 'center', marginRight: 10, marginLeft: 10, marginTop: 10 }}>

            {/* ************************ Parent comment ************************* */}
            <View style={{ flex: 1, flexDirection: 'column' }}>
                {/* Comment */}
                <View style={{ flex: 1, flexDirection: 'row' }}>

                    {/* Comment user pic */}
                    <Thumbnail
                        source={comment.profile_image === undefined || comment.profile_image.length === 0 ? defaultAvatar : comment.profile_image}
                    />
                    <View style={{ padding: 10, backgroundColor: '#f7f7f7', borderRadius: 5, width: '81%' }}>

                        {/* Comment header */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: 'bold' }}>Comment Title</Text>
                            <Text style={{ fontSize: 12, color: '#808080' }}>
                                {comment.cdate_date}
                            </Text>
                        </View>
                        <Text style={{ color: '#039bd4', fontSize: 13 }}>@Sub_Title</Text>

                        {/* Comment description */}
                        <Text style={{ fontSize: 14 }}>{comment.comment_text}</Text>
                    </View>
                </View>

                {/* Comment footer */}
                <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', height: 40, paddingTop: 7, paddingLeft: 40, justifyContent: 'space-between', alignItems: 'center' }}>

                    {/* Like comment */}
                    <CommentLike comment={comment} user={user} selectedVote={selectedVote} setSelectedVote={setSelectedVote} />

                    {/* Dislike comment */}
                    <CommentDisLike comment={comment} user={user} selectedVote={selectedVote} setSelectedVote={setSelectedVote} />

                    {/* Comment comment */}
                    <TouchableOpacity
                        onPress={() => setShowReply(true)}
                        style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                        <Image source={CommentImg}
                            // source={
                            //     share !== '' && share === 'comment'
                            //         ? CommentColor
                            //         : CommentImg
                            // }
                            resizeMode="stretch"
                            style={{ width: 30, height: 30 }}
                        />
                        <View>
                            <Text style={{ marginLeft: 2 }}>0</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Share comment */}
                    <CommentShare comment={comment} user={user} shared={shared} setShared={setShared} />
                </View>
            </View>


            {/* ************************ Child comments ************************* */}
            {/* Child Comment */}
            {/* <ChildCommentsList comment={comment} user={user} post={post} /> */}

            <ReplyModal  showReply={showReply} setShowReply={setShowReply} comment={comment} post={post} />

        </View>
    )
}


function mapStateToProps(state) {
    return {
        commentId: state.postComments.commentId
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // handleIncrease: increaseCount,
        // handleDecrease: decreaseCount,
        // handleReset: resetCount,
        handleCommentId: setCommentId
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)