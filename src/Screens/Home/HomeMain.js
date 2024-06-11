import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useDispatch} from 'react-redux';

const HomeMain = () => {
  return (
    <>
      <View>
        <Text></Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Text>Home Screen</Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeMain;
