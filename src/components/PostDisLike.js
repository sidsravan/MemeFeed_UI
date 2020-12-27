import React, { useState } from 'react'
import { Text } from 'native-base'
import { View, Image, TouchableOpacity } from 'react-native'
import { encode } from 'base-64'
import { env } from '../env'
import Down from '../../assets/Down_Arrow.png' 
import DownColor from '../../assets/Down_Arrow_Colour.png' 

export const PostDisLike = ({ post, user, selectedVote, setSelectedVote }) => {
    const [response, setResponse] = useState({})

    const handleDisLike = async (id) => {
        setSelectedVote('dislike')
        let likeData = {
            id: id,
            type: 'downvote',
            up_vote: 0,
            down_vote: user.data.session_id
        }

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

            const api = `${env.baseUrl}posts/votes`
            const res = await fetch(api, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            }) 
            console.log('res', res)
            let responseJson = await res.json()
            setResponse(responseJson)
            // alert(JSON.stringify(responseJson))
            // return dispatch({
            //     type: CREATE_POST_SUCCESS,
            //     payload: responseJson,
            // }) 
        } catch (err) {
            console.log('err', err.toString()) 
            // return dispatch({
            //     type: CREATE_POST_ERROR,
            //     payload: err,
            // }) 
        }
    }
    return (
        <TouchableOpacity
            onPress={() => handleDisLike(post.id)} 
            disabled={Object.keys(response).length > 0 && selectedVote === 'dislike' ? true : false}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={Object.keys(response).length > 0 && selectedVote === 'dislike' ? DownColor : Down}
                resizeMode="stretch"
                style={{ width: 30, height: 30 }}
            />
            <View>
                <Text style={{ marginLeft: 2 }}>
                    {Object.keys(response).length > 0 ? response.downvote_count : post.down_vote.length}
                </Text>
            </View>
        </TouchableOpacity>
    )
}