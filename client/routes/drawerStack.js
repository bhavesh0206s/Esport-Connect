import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import TabStack from './tabStack';
import AboutStack from './otherStack/aboutStack';
import { Button, Avatar } from 'react-native-elements';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout, loadUser } from '../Redux/actions/auth';
import Profile from '../routes/otherStack/profileStack';
import Loading from '../shared/loading';
import { getCurrentProfile } from '../Redux/actions/profile';

const Drawer = createDrawerNavigator();

const LogoutContentComponent = (props) => {
  const dispatch = useDispatch();
  const myprofileinfo = useSelector((state) => state.profile);
  const myprofileloading = myprofileinfo.myprofileloading;

  if (!myprofileinfo.myprofile) {
    console.log('DrawerStack loading is happening');
    if (!myprofileinfo.myprofile) {
      dispatch(getCurrentProfile());
    }
    return <Loading />;
  } else {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label=""
          icon={() => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  marginLeft: 40,
                }}
              >
                <Avatar
                  size={50}
                  rounded
                  overlayContainerStyle={{ backgroundColor: 'black' }}
                  icon={{ name: 'user', type: 'font-awesome-5' }}
                  // onPress={() => console.log('Works!')}
                  activeOpacity={1}
                  containerStyle={{
                    margin: 5,
                  }}
                />
                <Text style={{ fontSize: 17, paddingLeft: 4 }}>
                  {myprofileinfo.myprofile.name || ''}
                </Text>
              </View>
            );
          }}
        />
        <DrawerItemList {...props} />
        <DrawerItem
          style={{ marginHorizontal: 70 }}
          label=""
          onPress={() => {
            props.navigation.navigate('Home');
          }}
          icon={() => (
            <Button
              icon={
                <AntDesign
                  name="logout"
                  style={{ marginHorizontal: 5 }}
                  size={24}
                  color="white"
                />
              }
              buttonStyle={{ padding: 10 }}
              title="Sign Out"
              onPress={() => {
                dispatch(logout());
              }}
            />
          )}
        />
      </DrawerContentScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function DrawerStack() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <LogoutContentComponent {...props} />}
      >
        <Drawer.Screen name="Home" component={TabStack} />
        <Drawer.Screen name="About" component={AboutStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
