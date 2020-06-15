// type snippet rnfs
import React, { useState, useEffect } from 'react';
import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet
} from 'react-native';
import Modal  from 'react-native-modal'
import { Button, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
// import { addmyevent } from '../../Redux/actions/event';
import Addevent from './addevent';
import Events from './events';
import Loading from '../../shared/loading';
import { ScrollView } from 'react-native-gesture-handler';

const Event = ({ navigation }) => {
  const dispatch = useDispatch();
  const profileinfo = useSelector((state) => state.profile);
  const myevents = profileinfo.myprofile.myevents;
  const loading = profileinfo.loading;

  if (loading) {
    return <Loading />;
  } else {
    return (
      <View>
        {myevents && (
          <FlatList
            data={myevents}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <Events item={[item]} />}
          />
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  overlay:{
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    paddingTop: 50,
    marginTop: 80,
    backgroundColor: 'white',
    margin: 0, // This is the important style you need to set
  },
})

export default Event;

