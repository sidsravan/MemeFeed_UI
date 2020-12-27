import React, { useState } from 'react'
import { Text } from 'native-base'
import { View, Image, TouchableOpacity } from 'react-native'
import { encode } from 'base-64'
import { env } from '../../env'
import Down from '../../../assets/Down_Arrow.png'
import DownColor from '../../../assets/Down_Arrow_Colour.png'

export const CommentDisLike = ({ comment, user, selectedVote, setSelectedVote }) => {
    const [response, setResponse] = useState([])

    const handleDisLike = async (id) => {
        setSelectedVote('dislike')

        try {
            const username = 'memefeed'
            const password = 'Connect12345!'
            const myHeaders = new Headers()
            myHeaders.append('Content-Type', 'multipart/form-data')
            myHeaders.append('Authorization', `Basic ${encode(`${username}:${password}`)}`)

            let formData = new FormData() 
            formData.append('id', id)
            formData.append('type', 'downvote')
            formData.append('up_vote', 0)
            formData.append('down_vote', user.data.session_id)

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
            onPress={() => handleDisLike(comment.id)}
            disabled={response.length > 0 && selectedVote === 'dislike' ? true : false}
            // disabled={selectedVote === 'dislike' ? true : false}
            style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
            <Image source={
                    response.length > 0 && selectedVote === 'dislike' ? DownColor : Down
                // selectedVote === '' || selectedVote === 'dislike' ? Up : DownColor
                } resizeMode="stretch" style={{ width: 25, height: 25 }} />
            <View>
                <Text style={{ marginLeft: 2 }}>
                    {response.length > 0 ? response[0].down_vote.length : comment.down_vote.length}
                    {/* {comment.down_vote.length} */}
                </Text>
            </View>
        </TouchableOpacity>
    )
}