import React, {useLayoutEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import MyPageMain from '../Screens/Mypage/MypageMain';
import MyInfoDetail from '../Screens/Mypage/MyInfoDetail';
import MyScrap from '../Screens/Mypage/MyScrap';
import DriveDetail from '../Screens/DriveCourse/DriveDetail';
import SelectedProfileImage from '../Screens/Mypage/SelectedProfileImage';
import MyDriveTagEdit from '../Screens/Mypage/MyDriveTagEdit';
import MyReview from '../Screens/Mypage/MyReview';
import MyInfoEdit from '../Screens/Mypage/MyInfoEdit';
import RequiredInfo from '../Screens/Mypage/RequiredInfo';
import Setting from '../Screens/Mypage/Setting';
import MeetDetail from '../Screens/Meet/MeetDetail';
import ReportPage from '../Screens/Common/ReportPage';
import Help from '../Screens/Mypage/Help';
import UserEvaluate from '../Screens/Meet/UserEvaluate';
import HistoryMeetDetail from '../Screens/Meet/HistoryMeetDetail';
import {textStyles} from '../styles/textStyles';
import colors from '../styles/colors';
import GearIcon from '../assets/icons/GearIcon';
import {TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {showTabBar, hideTabBar} from '../features/tabBar/tabBarSlice';
import OtherProfile from '../Screens/Common/OtherProfile';
// import Notice from '../Screens/Mypage/Notice';
// import Inquiry from '../Screens/Mypage/Inquiry';
const Stack = createStackNavigator();

const MypageTab = ({route, navigation}) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Mypage' || routeName === undefined) {
      dispatch(showTabBar());
    } else {
      dispatch(hideTabBar());
    }
  }, [route]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mypage"
        component={MyPageMain}
        options={{
          headerTitle: '마이페이지',
          headerTitleStyle: [textStyles.H2, {color: colors.Gray10}],
          headerRight: () => (
            <TouchableOpacity
              style={{padding: 16}}
              onPress={() => {
                navigation.navigate('Setting');
              }}>
              <GearIcon />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="MyInfoDetail" component={MyInfoDetail} />
      <Stack.Screen name="MyScrap" component={MyScrap} />
      <Stack.Screen name="DriveDetail" component={DriveDetail} />
      <Stack.Screen
        name="SelectedProfileImage"
        component={SelectedProfileImage}
      />
      <Stack.Screen name="MyDriveTagEdit" component={MyDriveTagEdit} />
      <Stack.Screen name="MyReview" component={MyReview} />
      <Stack.Screen name="MyInfoEdit" component={MyInfoEdit} />
      <Stack.Screen name="RequiredInfo" component={RequiredInfo} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="MeetDetail" component={MeetDetail} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="OtherProfile" component={OtherProfile} />
      <Stack.Screen name="UserEvaluate" component={UserEvaluate} />
      <Stack.Screen name="ReportPage" component={ReportPage} />
      <Stack.Screen name="HistoryMeetDetail" component={HistoryMeetDetail} />
      {/* <Stack.Screen name="Notice" component={Notice} />
      <Stack.Screen name="Inquiry" component={Inquiry} /> */}
    </Stack.Navigator>
  );
};

export default MypageTab;
