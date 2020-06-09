import React, { useState } from 'react';
import { StyleSheet, View, Keyboard } from "react-native";
import { Button, Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';

const SharePostModal = ({toggleSharePostModal}) => {
  
  return (
    <View style={styles.container}>
      <Modal
        onSwipeComplete={toggleSharePostModal}
        swipeDirection={['left', 'right', 'down']}
        isVisible={visible}
        onBackButtonPress={toggleSharePostModal}
        onBackdropPress={toggleSharePostModal}
        style={styles.contentView}
      >
        <Button title='cancel' onPress={toggleSharePostModal} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">
              <View style={styles.content}>
                <Text>Host Event</Text>
              </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  contentView: {
    backgroundColor: 'white',
    margin: 0, 
  },
});

export default SharePostModal;