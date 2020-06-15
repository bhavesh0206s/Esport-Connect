import React, { useState } from 'react';
import { StyleSheet, View, Keyboard } from "react-native";
import { Button, Text, Input, Avatar } from 'react-native-elements';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback, ScrollView, TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import Header from '../../shared/header';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../../Redux/actions/post';

const SharePostModal = ({toggleSharePostModal, sharePost, navigation}) => {
  const dispatch = useDispatch();
  const myprofile = useSelector((state) => state.profile.myprofile);
  const [visible, setVisible] = useState(true);
  const [disablePostBtn, setDisablePostBtn] = useState(true);
  const [input, setInput] = useState('');
  const { name } = myprofile;
  
  const addPostToDb = () =>{
    navigation.navigate('Home');
    dispatch(addPost(input));
    toggleSharePostModal();
  }

  const handleInput = (val) =>{
    setInput(val);
    if(val.length > 0){
      setDisablePostBtn(false)
    }
    else{
      setDisablePostBtn(true)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Modal
        onSwipeComplete={toggleSharePostModal}
        isVisible={sharePost}
        onBackButtonPress={toggleSharePostModal}
        style={styles.contentView}
      >
        <View style={styles.header}>
          <Button
            buttonStyle={styles.btnStyle}
            icon={
              <MaterialCommunityIcons 
                style={styles.icon} 
                name="sword-cross" size={24} color="white" 
              />
            }
            
            onPress={toggleSharePostModal} 
          />
          <View style={styles.headerContent}>
            <Text style={styles.headerTextMain}>Share Post</Text>
            <Button 
              buttonStyle={styles.submitPost} 
              type='clear' 
              disabled={disablePostBtn} 
              title='Post'
              onPress={addPostToDb}
              titleStyle={{color:'white'}}
            />
          </View>
        </View>
        
        <ScrollView>
          <View style={styles.content}>
            <View style={{ flexDirection: 'row', paddingLeft: 20 , paddingTop:20}}>
              <Avatar
                size={40}
                rounded
                overlayContainerStyle={{ backgroundColor: 'black' }}
                icon={{ name: 'user', type: 'font-awesome-5' }}
                onPress={() => console.log('Works!')}
                activeOpacity={1}
                containerStyle={{
                  marginHorizontal: 2,
                }}
              />
              <View style={{ justifyContent: 'center', marginLeft: 5 }}>
                <Text style={{ fontSize: 20 }}>{name}</Text>
              </View>
            </View>
            <TextInput
              placeholder='Share karle bhai'
              multiline
              numberOfLines={4}
              maxLength={100}
              style={styles.input}
              onChangeText={text => handleInput(text)}
              value={input}
            />
          </View>
        </ScrollView>
      </Modal>
      </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'grey',
  },
  btnStyle:{
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: 'grey'
  },  
  headerContent:{
    flexDirection: 'row',
  },
  submitPost:{
    top: 5,
    marginLeft: 120,
    backgroundColor: 'grey'
  },
  headerTextMain:{
    top: 10,
    paddingLeft: 20,
    fontSize: 20,
    color: 'white'
  },
  content: {
    fontSize: 20,
    marginBottom: 12,
  },
  contentView: {
    backgroundColor: 'white',
    margin: 0, 
  },
  input:{
    paddingHorizontal: 30,
    fontSize: 18,
  }
});

export default SharePostModal;