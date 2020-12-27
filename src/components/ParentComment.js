import React, { useState, useEffect } from 'react'
import { Header, Right, Left, Body, Button, Title } from 'native-base'
import { Modal } from 'react-native'
import Ionicon from 'react-native-vector-icons/dist/Ionicons'
import styles from '../styles/common'
import CommentForm from './Comments/CommentForm'
import CommentsList from './Comments/CommentsList'

const ParentComment = ({ isVisible, setIsVisible, post, user }) => {
    const StatusBarStyle = Platform.OS === 'ios' ? 'dark-content' : 'light-content'

    return (
        <Modal
            animationType="slide"
            // transparent={true}
            visible={isVisible}
            onRequestClose={() => {
                setIsVisible(false)
            }}>
            <Header style={{ backgroundColor: '#00639c' }} androidStatusBarColor="#00639c" iosBarStyle={StatusBarStyle}>
                <Left style={{ flex: 0.5 }}>
                    <Button
                        transparent
                        onPress={() => setIsVisible(false)}>
                        <Ionicon name="arrow-back-outline" color="#fff" style={styles.fs25} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ fontWeight: 'bold', alignSelf: 'center', marginLeft: -40 }}>Comment</Title>
                </Body>
                <Right style={{ flex: 0.3 }}>
                    <Button
                        transparent
                        onPress={() => setIsVisible(false)}>
                        <Ionicon name="close" color="#fff" style={styles.fs25} />
                    </Button>
                </Right>
            </Header>

            <CommentsList post={post} user={user} />
            <CommentForm post={post} user={user} />

        </Modal>
    )
}

export default ParentComment