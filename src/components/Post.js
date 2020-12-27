import React, { useState } from 'react'
import { Text, Thumbnail } from 'native-base'
import { View, Image, TouchableOpacity } from 'react-native'
import Ionicon from 'react-native-vector-icons/dist/Ionicons'
// import { env } from '../env'
import Comment from '../../assets/Comment.png'
import CommentColor from '../../assets/Comment_Colour.png'
import { PostLike } from './PostLike'
import { PostDisLike } from './PostDisLike'
import { PostShare } from './PostShare'
import ParentComment from './ParentComment'

export const Post = ({ post, user }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [selectedVote, setSelectedVote] = useState('')
    const [shared, setShared] = useState('')
    const [share, setShare] = useState('')
    // const imageUrl = `${env.baseUrl}static/images/${post.post_image}`

    // Render description
    function renderItemContent(post) {
        const contentLen = post.post_description.length
        if (isExpanded)
            if (contentLen <= 94) {
                return (
                    <View
                        style={{
                            padding: 14,
                            backgroundColor: '#ffffff',
                            justifyContent: 'center',
                        }}>
                        <Text style={{ fontWeight: 'bold' }}>{post.post_description}</Text>
                    </View>
                )
            }
        let contentInfo = post.post_description
        let seeOption = '...See Less'
        if (!isExpanded) {
            seeOption = '...See More'
            contentInfo = post.post_description.slice(0, 94)
        }

        return (
            <View
                style={{
                    padding: 14,
                    backgroundColor: '#ffffff',
                    justifyContent: 'center',
                }}>
                <Text style={{ fontWeight: 'bold' }}>{contentInfo}</Text>
                <TouchableOpacity
                    onPress={() => setIsExpanded(!isExpanded)}>
                    <Text style={{ fontSize: 15, color: '#808080' }}>{seeOption}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // Post footer
    function renderFooterContent(post) {
        return (
            <View style={{ height: 70, backgroundColor: '#ffffff', flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', borderTopWidth: 0.8, borderBottomWidth: 0.8 }}>
                <PostLike post={post} user={user} selectedVote={selectedVote} setSelectedVote={setSelectedVote} />
                <PostDisLike post={post} user={user} selectedVote={selectedVote} setSelectedVote={setSelectedVote} />
                <TouchableOpacity
                    onPress={() => setIsVisible(true)}
                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={
                            share !== '' && share === 'comment'
                                ? CommentColor
                                : Comment
                        }
                        resizeMode="stretch"
                        style={{ width: 30, height: 30 }}
                    />
                    <View>
                        <Text style={{ marginLeft: 2 }}>{post.commentids.length}</Text>
                    </View>
                </TouchableOpacity>
                <PostShare post={post} user={user} shared={shared} setShared={setShared} />
            </View>
        )
    }

    return (
        <View style={{ width: '100%' }}>
            {/* Post header */}
            <View style={{ height: 70, flexDirection: 'row', paddingLeft: 2, paddingRight: 2, backgroundColor: '#ffffff' }}>
                <View style={{ flex: 0.3, paddingLeft: 4, justifyContent: 'center' }}>
                    <Thumbnail
                        source={{
                            uri:
                                'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
                        }}
                    />
                </View>
                <View style={{ flex: 0.8, justifyContent: 'center' }}>
                    <Text style={{ fontWeight: 'bold' }}>Administrator</Text>
                    <Text style={{ fontSize: 12, color: '#808080' }}>@admin</Text>
                </View>
                <View style={{ flex: 0.5, alignItems: 'flex-end', justifyContent: 'center', paddingRight: 10 }}>
                    <Ionicon name="home" />
                    <Text style={{ fontSize: 12, color: '#808080' }}>{post.cdate}</Text>
                </View>
            </View>

            {/* Post image */}
            <View style={{ height: 250 }}>
                <Image
                    source={{ uri: post.post_image }}
                    resizeMode="stretch"
                    style={{ width: '100%', height: '100%' }}
                />
            </View>

            {/* Post content */}
            {renderItemContent(post)}

            {/* Post footer */}
            {renderFooterContent(post)}

            <ParentComment isVisible={isVisible} setIsVisible={setIsVisible} post={post} user={user} />

        </View>
    )
}