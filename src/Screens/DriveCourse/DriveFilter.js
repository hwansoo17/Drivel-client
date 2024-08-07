import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  Pressable,
} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import {useFocusEffect} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchIcon from '../../assets/icons/SearchIcon.svg';
import XIcon from '../../assets/icons/XIcon.svg';
import BackIcon from '../../assets/icons/BackIcon.svg';
import SpinIcon from '../../assets/icons/SpinIcon.svg';
import ChipContainer from '../../components/ChipContainer';
import {
  driveStyle,
  driveTheme,
  driveWith,
} from '../../assets/onboardingData/onBoardingData';
import {useDispatch, useSelector} from 'react-redux';
import koFilter from '../../utils/koFilter';
import {
  getDriveList,
  setFilterDriveTheme,
  setFilterDriveWith,
  setFilterDriveStyle,
} from '../../features/drive/driveActions';

const DriveFilter = ({navigation}) => {
  const dispatch = useDispatch();
  const {filterDriveTheme, filterDriveWith, filterDriveStyle} = useSelector(
    state => state.drive,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '필터',
      headerTitleAlign: 'center',
      headerTitleStyle: [textStyles.H3, {color: colors.Gray10}],
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            filterDrive();
          }}
          style={{padding: 16}}>
          <BackIcon color={colors.Gray10} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, filterDriveTheme, filterDriveWith, filterDriveStyle]);

  useEffect(() => {
    console.log(
      filterDriveStyle,
      filterDriveTheme,
      filterDriveWith,
      '값 잘 변하나?',
    );
    const backAction = () => {
      filterDrive();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [filterDriveStyle, filterDriveTheme, filterDriveWith]);

  const filterDrive = () => {
    dispatch(
      getDriveList({
        page: 0,
        size: 10,
        themeId: filterDriveTheme == '' ? null : filterDriveTheme,
        togetherId: filterDriveWith == '' ? null : filterDriveWith,
        styleId: filterDriveStyle == '' ? null : filterDriveStyle,
      }),
    );
    navigation.navigate('DriveMain');
  };
  const resetFilter = () => {
    dispatch(setFilterDriveWith(''));
    dispatch(setFilterDriveTheme(''));
    dispatch(setFilterDriveStyle(''));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.BG}}>
      <KeyboardAwareScrollView>
        <View style={{padding: 16}}>
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>
            드라이브 풍경
          </Text>
          <View style={{height: 16}} />
          <ChipContainer
            containerStyle={{flexDirection: 'row'}}
            type={'single'}
            data={driveTheme}
            selectedItem={filterDriveTheme}
            onSelectedHandler={items => dispatch(setFilterDriveTheme(items))}
          />
          <View style={{height: 32}} />
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>
            드라이브 스타일
          </Text>
          <View style={{height: 16}} />
          <ChipContainer
            containerStyle={{flexDirection: 'row'}}
            type={'single'}
            data={driveStyle}
            selectedItem={filterDriveStyle}
            onSelectedHandler={items => dispatch(setFilterDriveStyle(items))}
          />
          <View style={{height: 32}} />
          <Text style={[textStyles.H4, {color: colors.Gray10}]}>
            드라이브 형태
          </Text>
          <View style={{height: 16}} />
          <ChipContainer
            containerStyle={{flexDirection: 'row'}}
            type={'single'}
            data={driveWith}
            selectedItem={filterDriveWith}
            onSelectedHandler={items => dispatch(setFilterDriveWith(items))}
          />
          <View style={{height: 32}} />
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{
          padding: 16,
          elevation: 10,
          backgroundColor: colors.BG,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            height: 50,
            display:
              filterDriveWith == '' &&
              filterDriveTheme == '' &&
              filterDriveStyle == ''
                ? 'none'
                : 'flex',
          }}
          onPress={resetFilter}>
          <View style={{flexDirection: 'row', height: 22}}>
            <SpinIcon />
            <View style={{width: 8}} />
            <Text style={[textStyles.H4, {color: colors.Gray08}]}>재설정</Text>
            <View style={{width: 16}} />
          </View>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <CustomButton title={'드라이브 코스 검색'} onPress={filterDrive} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DriveFilter;
