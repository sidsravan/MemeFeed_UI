import React from 'react'
import { Text } from 'native-base'
import { View, Image, TouchableOpacity } from 'react-native'
import Share from 'react-native-share'
import ShareImg from '../../../assets/Share.png'
import ShareColour from '../../../assets/Share_Colour.png'

export const CommentShare = ({ comment, user, shared, setShared }) => {
    // const imageUrl = `${env.baseUrl}static/images/${post.post_image}`
    // const base64Image = `${encode(`${imageUrl}`)}`

    // alert(JSON.stringify(post))

    const shareOptions = {
        subject: 'Meme Image', //string
        title: "Meme Title", //string
        // message: "Meme comment sharing...", //string
        url: 'http://img.gemejo.com/product/8c/099/cf53b3a6008136ef0882197d5f5.jpg' // imageUrl // eg.'http://img.gemejo.com/product/8c/099/cf53b3a6008136ef0882197d5f5.jpg',
    }

    const shareContent = () => {
        Share.open(shareOptions)
            .then((res) => {
                alert(res)
                setShared('share')
            })
            .catch((err) => {
                err && console.log(err)
                setShared('')
            })
    }

    return (
        <TouchableOpacity
            onPress={() => shareContent()}
            style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, }}>
            <Image source={shared === '' ? ShareImg : ShareColour} resizeMode="stretch" style={{ width: 25, height: 25 }} />
            <View>
                <Text style={{ marginLeft: 2 }}>0</Text>
            </View>
        </TouchableOpacity>
    )
}