import React, { Component } from 'react'
import { Text, H3, Item, Picker, Icon, Textarea, Button, Spinner } from 'native-base'
import { Image, TouchableOpacity, View } from 'react-native'
import Post from '../../../assets/post.png'
import GrayMan from '../../../assets/grayman.png'
import ImagePicker from 'react-native-image-picker'

class CreatePost extends Component {
  state = {
    selected2: '',
    avatarSource: '',
    imagedata: null,
    description: '',
  }

  onValueChange2(value) {
    this.setState({
      selected2: value,
    })
  }

  async handlePost() {
    const { selected2, imagedata, description } = await this.state
    if (selected2 === '') {
      alert('Please Select Type of Post')
      return
    }
    if (imagedata === null) {
      alert('Please upload Image')
      return
    }
    if (description === '') {
      alert('Please Enter Post description')
      return
    }
    const requestObj = {
      post_description: description,
      post_image: imagedata,
      ptypeId: selected2,
      userId: this.props.user.data.session_id
    }
    this.props.onPostSend(requestObj)
  }

  handleImageUpload = () => {
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
        this.setState({ avatarSource: '' })
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        const source = { uri: response.uri }
        // console.log(response.data)

        // You can also display the image using data:
        // const source = { uri: 'data:image/png;base64,' + response.data } 

        this.setState({
          avatarSource: source,
          imagedata: response.data
        })
      }
    })
  }

  renderPickerItems() {
    if (this.props.postTypes.data.length) {
      return this.props.postTypes.data.map((item) => {
        return <Picker.Item label={item.name} value={item.id} key={item.id} />
      })
    }
    return null
  }

  render() {
    const { style } = this.props

    return (
      <View style={{ alignItems: 'center' }}>
        <H3
          style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            color: '#00639c',
            marginTop: 20,
          }}>
          Upload Image*
        </H3>

        <TouchableOpacity onPress={this.handleImageUpload}
          style={{ height: 200, width: '70%', marginTop: 20, borderRadius: 5 }}>
            <Image
            source={
              this.state.avatarSource === '' ? Post : this.state.avatarSource
            }
            resizeMode="stretch"
            style={{ width: '100%', height: '100%', borderRadius: 5 }}
          />
        </TouchableOpacity>

        <Item
          picker
          style={{
            backgroundColor: '#00639c',
            width: '70%',
            marginTop: 20,
            borderRadius: 5,
          }}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: '70%', color: '#fff', fontWeight: 'bold' }}
            placeholder="Select type Post"
            placeholderStyle={{ color: '#fff' }}
            placeholderIconColor="red"
            selectedValue={this.state.selected2}
            onValueChange={this.onValueChange2.bind(this)}>
            {this.renderPickerItems()}
          </Picker>
        </Item>
        <View
          style={{
            backgroundColor: '#808080',
            width: '100%',
            height: 1,
            marginTop: 20,
          }}>
          {/* <View style={{height:90,color:'red',width:"100%"}}></View> */}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingLeft: 5,
            paddingRight: 5,
          }}>
          <Image
            source={GrayMan}
            resizeMode="contain"
            style={{ width: 60, height: 60 }}
          />

          <Textarea
            onChangeText={(value) => this.setState({ description: value })}
            style={{ borderColor: 'transparent', borderWidth: 1, width: '80%' }}
            rowSpan={5}
            placeholder="What's on your mind on? ( 600 characters ) Examples: @sycreator #abcdefg"
          />
        </View>

        <View
          style={{
            backgroundColor: '#808080',
            width: '100%',
            height: 1,
            marginTop: 20,
          }}>
          {/* <View style={{height:90,color:'red',width:"100%"}}></View> */}
          {/* <Textarea rowSpan={5} bordered placeholder="Textarea" /> */}
        </View>
        <Button
          rounded
          onPress={() => this.handlePost()}
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            alignSelf: 'center',
            marginTop: 20,
            backgroundColor: '#00639c',
          }}>
          <Text>Post</Text>
        </Button>
        {this.props.postLoading ? (
          <Spinner color="#00639c" style={{ marginTop: 10, alignSelf: 'center' }} />
        ) : null}
      </View>
    )
  }
}

export default CreatePost 
