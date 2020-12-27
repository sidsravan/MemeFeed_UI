import React, { useState, useEffect } from 'react'
import { Modal, View, Image } from 'react-native'
import { Header, Right, Left, Body, Button, Title, Text, Content, Footer, Item, Input, Thumbnail } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchChildComments, setCommentId } from '../../actions/childCommentsActions'
import { env } from '../../env'
import { encode } from 'base-64'
import Ionicon from 'react-native-vector-icons/dist/Ionicons'
import ImagePicker from 'react-native-image-picker'
import styles from '../../styles/common'

const ReplyModal = (props) => {
    const { commentId, handleCommentId, showReply, setShowReply, comment, user, post, handleFetchChildComments } = props
    const StatusBarStyle = Platform.OS === 'ios' ? 'dark-content' : 'light-content'
    const [value, setValue] = useState('')
    const [height, setHeight] = useState(0)
    const [avatarSource, setAvatarSource] = useState('')

    useEffect(() => {
        setHeight(45)
    }, [])

    const submitComment = async () => {
        let data = {
            user_id: user.data.session_id,
            post_id: post.id,
            comment_id: comment.id,
            comment_text: value,
            comment_image: avatarSource
        }
        console.log(JSON.stringify(data))
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

            let formData = new FormData()
            formData.append('user_id', data.user_id)
            formData.append('post_id', data.post_id)
            formData.append('parent_id', data.comment_id)
            formData.append('comment_text', data.comment_text)
            formData.append('comment_image', data.comment_image)

            console.log("formData: " + JSON.stringify(formData))

            const url = `${env.baseUrl}comments/commentList` // --> add comment api for post
            const response = await fetch(url, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
            const res = await response.json()
            setValue('')
            setHeight(45)
            handleFetchChildComments(comment.id)
            setShowReply(false)
        } catch (error) {
            alert(error)
            console.error(error)
            setValue('')
            setHeight(45)
        }
    }

    const handleImageUpload = () => {
        const options = {
            title: 'Select Image',
            // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        }
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.error) {
                setAvatarSource('')
                console.log('ImagePicker Error: ', response.error)
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            } else {
                setAvatarSource('data:image/png;base64,' + response.data)
            }
        })
    }

    return (
        <>
            <Modal
                animationType="slide"
                // transparent={true}
                visible={showReply}
                onRequestClose={() => {
                    setShowReply(false)
                }}>
                <Header style={{ backgroundColor: '#00639c' }} androidStatusBarColor="#00639c" iosBarStyle={StatusBarStyle}>
                    <Left style={{ flex: 0.5 }}>
                        <Button
                            transparent
                            onPress={() => setShowReply(false)}>
                            <Ionicon name="arrow-back-outline" color="#fff" style={styles.fs25} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ fontWeight: 'bold', alignSelf: 'center', marginLeft: -40 }}>Reply Comment</Title>
                    </Body>
                    <Right style={{ flex: 0.3 }}>
                        <Button
                            transparent
                            onPress={() => setShowReply(false)}>
                            <Ionicon name="close" color="#fff" style={styles.fs25} />
                        </Button>
                    </Right>
                </Header>

                <Content>
                    {/* Comment */}
                    <View style={{ flex: 1, flexDirection: 'row' }}>

                        {/* Comment user pic */}
                        <Thumbnail
                            source={{
                                uri:
                                    'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
                            }}
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

                </Content>
                
                <Footer style={{ backgroundColor: '#fff', paddingHorizontal: 10, minHeight: 120, maxHeight: 120 }}>
                    {avatarSource.length > 0 ? <Image source={{uri: avatarSource}} style={[styles.uploadAvatar]} resizeMode="stretch" /> : null}
                </Footer>
                <Footer style={{ backgroundColor: '#fff', paddingHorizontal: 5, height: height, maxHeight: 120 }}>
                    <Item rounded style={styles.commentInput} style={[styles.footerItem, { height: height }]}>
                        <Ionicon active name='camera' style={[styles.fs20, styles.darkGreyColor]} onPress={() => handleImageUpload()} />
                        <Input placeholder='Comment here..'
                            multiline={true}
                            style={[styles.input, { minHeight: 45, height: height, maxHeight: 120 }]}
                            onChangeText={(value) => setValue(value)}
                            value={value}
                            editable={true}
                            onContentSizeChange={(e) => setHeight(e.nativeEvent.contentSize.height)}
                        // autoFocus="true"
                        />
                        <Ionicon active name='send' style={[styles.fs20, styles.themeColor]} onPress={() => submitComment()} />
                    </Item>
                </Footer>

            </Modal>
        </>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user,
        commentId: state.postComments.commentId
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleCommentId: setCommentId,
        handleFetchChildComments: fetchChildComments
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplyModal)