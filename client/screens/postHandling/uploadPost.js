import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import Modal  from 'react-native-modal'

const UploadPost = ({navigation}) => {
  const [visible, setVisible] = useState(true);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
 
  return (
    <View >
      <Modal
        animationIn="bounceIn"
        backdropOpacity={0.8}
        onSwipeComplete={toggleOverlay}
        swipeDirection={['up', 'left', 'right', 'down']}
        isVisible={visible}
        onBackButtonPress={toggleOverlay}
        style={styles.overLay}
        onBackdropPress={toggleOverlay}
      >
        <View style={styles.content}>
          <Text style={styles.contentTitle}>Hello👋!</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  overLay: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});

export default UploadPost;