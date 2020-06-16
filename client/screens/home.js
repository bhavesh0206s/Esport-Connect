import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, RefreshControl, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, logout } from '../Redux/actions/auth';
import { AsyncStorage } from 'react-native';
import setAuthToken from '../Redux/setAuthToken';
import { getCurrentProfile } from '../Redux/actions/profile';
import {
  getAllPosts,
  clearChangedlike,
  changeUIdueTolike,
} from '../Redux/actions/post';
import Posts from './postHandling/posts';
import Loading from '../shared/loading';
import { socket } from '../MainComponent';

const Home = () => {
  const dispatch = useDispatch();
  const globalposts = useSelector((state) => state.post.globalposts);
  const myprofile = useSelector((state) => state.profile.myprofile);
  let changedlike = useSelector((state) => state.post.changedlike);
  
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getAllPosts());
    setRefreshing(false);
  }

  useEffect(() => {
    const userLoad = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setAuthToken(token);
      }
    };
    userLoad();
    console.log('Home Page refreshed');
    dispatch(getAllPosts());
  }, []);

  // useEffect(() => {
  //   const updateLike = async  () => {
      
  //     setLiked(false)
  //   }
  //   updateLike();
  // }, [liked]);
  
  socket.on('changed like', (data) => {
    dispatch(changeUIdueTolike(data));
    console.log('socket.on got trrigered');
  });

  if (globalposts.length <= 0 || !myprofile) {
    return <Loading />;
  } else {
    return (
      <View>
        <FlatList
          nestedScrollEnabled
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={globalposts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Posts item={[item]} />}
        />
      </View>
    );
  }
};

export default Home;
