import React, { useEffect, useState } from 'react'
import { Text } from 'native-base'
import { View, Image, TouchableOpacity } from 'react-native'
import { encode } from 'base-64'
import { env } from '../env'
import Up from '../../assets/Up_Arrow.png'
import UpColor from '../../assets/Up_Arrow_Colour.png'

export const PostLike = ({ post, user, selectedVote, setSelectedVote }) => {
    const [response, setResponse] = useState({})

    useEffect(() => {
        // console.log(post.viewed_ids)
    }, [])

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

            const api = `${env.baseUrl}posts/votes`
            const res = await fetch(api, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            }) 
            console.log('res', res)
            let responseJson = await res.json()
            setResponse(responseJson)
        } catch (err) {
            console.log('err', err.toString()) 
        }
    }

    return (
        <TouchableOpacity
            onPress={() => handleLike(post.id)} 
            disabled={Object.keys(response).length > 0 && selectedVote === 'like' ? true : false}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
                source={
                    Object.keys(response).length > 0 && selectedVote === 'like' ? UpColor : Up
                }
                resizeMode="stretch"
                style={{ width: 30, height: 30 }}
            />
            <View>
                <Text style={{ marginLeft: 2 }}>
                    {Object.keys(response).length > 0 ? response.up_vote_count : post.up_vote.length}
                </Text>
            </View>
        </TouchableOpacity>
    )
}