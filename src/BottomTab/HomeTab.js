import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeMain from '../Screens/Home/HomeMain';
import {StyleSheet, Text} from 'react-native';

const Stack = createStackNavigator();

const HomeTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeMain}
        options={{
          headerStyle: styles.headerStyle,
          headerLeft: () => <Text style={styles.headerLeftText}>Drivel</Text>,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  headerLeftText: {
    color: '#ffffff',
    fontSize: 22,
  },
});

export default HomeTab;
