import React, { useState } from 'react'
import { Text } from 'native-base'
import { View, Image, TouchableOpacity } from 'react-native'
import { encode } from 'base-64'
import { env } from '../../env'
import Up from '../../../assets/Up_Arrow.png'
import UpColor from '../../../assets/Up_Arrow_Colour.png'

export const CommentLike = ({ comment, user, selectedVote, setSelectedVote }) => {
    const [response, setResponse] = useState([])

    const handleLike = async (id) => {
        setSelectedVote('like')

        try {
            const username = 'memefeed'
            const password = 'Connect12345!'
            const myHeaders = new Headers()
            myHeaders.append('Content-Type', 'multipart/form-data')
            myHeaders.append('Authorization', `Basic ${encode(`${username}:${password}`)}`)

            let formData = new FormData() 
            formData.append('id', id)
            formData.append('type', 'upvote')
            formData.append('up_vote', user.data.session_id)
            formData.append('down_vote', 0)

            const api = `${env.baseUrl}comments/commentvotes`
            const res = await fetch(api, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            }) 
            console.log('res', res)
            let responseJson = await res.json()
            setResponse(responseJson)
            console.log(JSON.stringify(responseJson))
        } catch (err) {
            console.log('err', err.toString()) 
        }
    }

    return (
        <TouchableOpacity
            onPress={() => handleLike(comment.id)}
            disabled={response.length > 0 && selectedVote === 'like' ? true : false}
            // disabled={selectedVote === 'like' ? true : false}
            style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
            <Image source={
                    response.length > 0 && selectedVote === 'like' ? UpColor : Up
                // selectedVote === '' || selectedVote === 'dislike' ? Up : UpColor
                } resizeMode="stretch" style={{ width: 25, height: 25 }} />
            <View>
                <Text style={{ marginLeft: 2 }}>
                    {response.length > 0 ? response[0].up_vote.length : comment.up_vote.length}
                    {/* {comment.up_vote.length} */}
                </Text>
            </View>
        </TouchableOpacity>
    )
}