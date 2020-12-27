import React, { useEffect, useState } from 'react'
import { Container, Header, Content, Text, H1, H3, Form } from 'native-base'
import { Image, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { env } from '../../env'
import { encode } from 'base-64'
import ImagePicker from 'react-native-image-picker'
import styles from '../../styles/common'
import { Button } from '../../components/index'
import Camera from '../../../assets/camera.png'

const BasicUpload = (props) => {
  const { style, user } = props
  const [avatarSource, setAvatarSource] = useState('')

  useEffect(() => {
    // setHeight(45)
    // alert(JSON.stringify(user))
  }, [])

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

  const submitUserImage = async () => {
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
      formData.append('user_id', user.data.session_id)
      formData.append('profile_image', avatarSource)

      console.log("formData: " + JSON.stringify(formData))

      const url = `${env.baseUrl}users/profileimg` // --> add user image api
      const response = await fetch(url, {
        method: 'POST',
        headers: myHeaders,
        body: formData
      })
      const res = await response.json()
      // alert(JSON.stringify(res))
      alert("Successfully account created. Please signin.")
      setAvatarSource('')
      props.navigation.navigate('BasicLogin')
    } catch (error) {
      alert(error)
      console.error(error)
    }
  }

  return (
    <Container style={style.container}>
      <Content style={style.content}>
        <H1 style={style.h1}>Upload Picture</H1>
        <Form style={style.form}>
          <TouchableOpacity
            style={style.imageBox}
            onPress={() => handleImageUpload()}>
            <Image source={avatarSource.length > 0 ? { uri: avatarSource } : Camera} resizeMode="cover" 
            style={avatarSource.length > 0 ? style.userImage : style.image} />
          </TouchableOpacity>
        </Form>
        <Button full rounded textLight onPress={() => submitUserImage()}>CONTINUE</Button>
        <Button full rounded textLight onPress={() => {
          alert("Successfully account created. Please signin.")
          props.navigation.navigate('BasicLogin')}}
        >SKIP</Button>
      </Content>
    </Container>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    // handleCommentId: setCommentId,
    // handleFetchChildComments: fetchChildComments
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicUpload)
