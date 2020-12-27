import React, { useState } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { Text, Thumbnail } from 'native-base'

export const ChildComment = ({childComment, user}) => {
    return(
        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 7 }}>

                {/* Child Comment user pic */}
                <Thumbnail
                    source={{
                        uri:
                            'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
                    }}
                    style={{ width: 36, height: 36 }}
                />

                <View style={{ flex: 1, padding: 10, backgroundColor: '#f7f7f7', borderRadius: 5, width: '78%' }}>
                    {/* Child Comment header */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Child Comment</Text>
                        <Text style={{ fontSize: 10, color: '#808080' }}>
                            {childComment.cdate_date}
                        </Text>
                    </View>
                    <Text style={{ color: '#039bd4', fontSize: 10 }}>@Child Comment Subtitle</Text>

                    {/* Child Comment description */}
                    <Text style={{ fontSize: 12, paddingTop: 3 }}> {childComment.comment_text}</Text>
                    {/* {childComment.comment_image.length > 0 ? <Image source={{uri: childComment.comment_image}} style={[styles.uploadAvatar]} resizeMode="stretch" /> : null} */}
                </View>

            </View>
    )
}