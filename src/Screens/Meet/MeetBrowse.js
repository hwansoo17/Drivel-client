import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import colors from '../../styles/colors';
import PlusIcon from '../../assets/icons/PlusIcon';
import FilterIcon from '../../assets/icons/FilterIcon';
import MeetEmptyIcon from '../../assets/icons/MeetEmptyIcon';
import LinearGradient from 'react-native-linear-gradient';
import {textStyles} from '../../styles/textStyles';
import MeetList from './MeetList';
import {useSelector, useDispatch} from 'react-redux';
import {getMeetList, getMeetListMore, setSort} from '../../features/meet/meetActions';
import {
  driveStyle,
  driveTheme,
  driveWith,
  regions,
} from '../../assets/onboardingData/onBoardingData';
import {useNavigation} from '@react-navigation/native';

const MeetBrowse = () => {
  const navigation = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [height, setHeight] = useState(0);
  const [sortName, setSortName] = useState('최신순');
  const [sortToggle, setSortToggle] = useState(false);
  const {
    meetList,
    totalMeeting,
    isLastPage,
    inititalPage,
    currentPage,
    sort,
    filterDriveTheme,
    filterDriveWith,
    filterDriveStyle,
    filterGender,
    filterAge,
    filterCarModel,
    filterCarCareer,
    filterRegion,
    isLoading,
  } = useSelector(state => state.meet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getMeetList({
        page: inititalPage,
        size: 10,
        orderBy: sort,
        themeId: filterDriveTheme == '' ? null : filterDriveTheme,
        togetherId: filterDriveWith == '' ? null : filterDriveWith,
        styleId: filterDriveStyle == '' ? null : filterDriveStyle,
        genderId: filterGender == '' ? null : filterGender,
        regionId: filterRegion == '' ? null : filterRegion,
        age: filterAge == '' ? null : filterAge,
        carModel: filterCarModel == '' ? null : filterCarModel,
        carCareer: filterCarCareer == '' ? null : filterCarCareer,
      }),
    );
    // console.log(meetList);
  }, [dispatch]);

  const goFilter = () => {
    navigation.navigate('MeetFilter');
  };
  const onRefresh = () => {
    setIsRefreshing(true);
    dispatch(
      getMeetList({
        page: inititalPage,
        size: 10,
        orderBy: sort,
        themeId: filterDriveTheme == '' ? null : filterDriveTheme,
        togetherId: filterDriveWith == '' ? null : filterDriveWith,
        styleId: filterDriveStyle == '' ? null : filterDriveStyle,
        genderId: filterGender == '' ? null : filterGender,
        regionId: filterRegion == '' ? null : filterRegion,
        age: filterAge == '' ? null : filterAge,
        carModel: filterCarModel == '' ? null : filterCarModel,
        carCareer: filterCarCareer == '' ? null : filterCarCareer,
      }),
    ).finally(() => setIsRefreshing(false));
  };

  const onEndReached = () => {
    if (!isLastPage) {
      dispatch(
        getMeetListMore({
          page: currentPage + 1,
          size: 10,
          orderBy: sort,
          themeId: filterDriveTheme == '' ? null : filterDriveTheme,
          togetherId: filterDriveWith == '' ? null : filterDriveWith,
          styleId: filterDriveStyle == '' ? null : filterDriveStyle,
          genderId: filterGender == '' ? null : filterGender,
          regionId: filterRegion == '' ? null : filterRegion,
          age: filterAge == '' ? null : filterAge,
          carModel: filterCarModel == '' ? null : filterCarModel,
          carCareer: filterCarCareer == '' ? null : filterCarCareer,
        }),
      );
      // console.log(isLastPage);
    }
  };

  const sortList = (sort) => {
    setSortName(sort.title);
    dispatch(setSort(sort.value))
    setSortToggle(!sortToggle)
    setIsRefreshing(true);
    dispatch(
      getMeetList({
        page: inititalPage,
        size: 10,
        orderBy: sort.value,
        themeId: filterDriveTheme == '' ? null : filterDriveTheme,
        togetherId: filterDriveWith == '' ? null : filterDriveWith,
        styleId: filterDriveStyle == '' ? null : filterDriveStyle,
        genderId: filterGender == '' ? null : filterGender,
        regionId: filterRegion == '' ? null : filterRegion,
        age: filterAge == '' ? null : filterAge,
        carModel: filterCarModel == '' ? null : filterCarModel,
        carCareer: filterCarCareer == '' ? null : filterCarCareer,
      }),
    ).finally(() => setIsRefreshing(false));
  };

  const regionDisplayName = filterRegion
  ? regions.find(style => style.id === filterRegion)?.displayName
  : '';

  const driveThemeDisplayName = filterDriveTheme
    ? driveTheme.find(style => style.id === filterDriveTheme)?.displayName
    : '';

  const driveWithDisplayName = filterDriveWith
    ? driveWith.find(style => style.id === filterDriveWith)?.displayName
    : '';

  const driveStyleDisplayName = filterDriveStyle
    ? driveStyle.find(style => style.id === filterDriveStyle)?.displayName
    : '';

  const genderDisplayName = filterGender
    ? [
        {id: 1, displayName: '남성'},
        {id: 2, displayName: '여성'},
      ].find(style => style.id === filterGender)?.displayName
    : '';

  const category = [
    {key: '지역', value: regionDisplayName, unit: ''},
    {key: '풍경', value: driveThemeDisplayName, unit: ''},
    {key: '활동', value: driveStyleDisplayName, unit: ''},
    {key: '동행자', value: driveWithDisplayName, unit: ''},
    {key: '성별', value: genderDisplayName, unit: ''},
    {key: '나이', value: filterAge, unit: '세'},
    {key: '차종', value: filterCarModel, unit: ''},
    {key: '운전경력', value: filterCarCareer, unit: '년'},
  ];

  const sortedCategory = category.sort((a, b) => {
    if (a.value === '' && b.value !== '') return 1;
    if (a.value !== '' && b.value === '') return -1;
    return 0;
  });

  const handleLayout = (event, setHeight) => {
    const {height} = event.nativeEvent.layout;
    setHeight(height);
    console.log('Content height:', height);
  };


  const renderCategory = ({item}) => {
    const isActive = item.value !== '';
    return (
      <TouchableOpacity
        onPress={goFilter}
        style={[
          {
            backgroundColor: isActive ? colors.Light_Blue : colors.Gray02,
            paddingHorizontal: 16,
            borderRadius: 100,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        {isActive ? (
          <Text
            style={[textStyles.B4, {color: colors.Blue, marginBottom: 1.5}]}>
            {item.value}
            {item.unit}
          </Text>
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <PlusIcon />
            <Text
              style={[
                textStyles.B4,
                {color: colors.Gray10, marginLeft: 8, marginBottom: 1.5},
              ]}>
              {item.key}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.BG}}>
      
      <View 
        style={{flexDirection: 'row', paddingHorizontal: 20, paddingTop:20}}
        onLayout={e => handleLayout(e, setHeight)}>
        <Text style={[textStyles.B4, {color: colors.Gray10}]}>
          {totalMeeting}개 모임
        </Text>
        <View style={{flex: 1}} />
        {/* <TouchableOpacity 
          onPress={() => setSortToggle(!sortToggle)}
          style={{flexDirection: 'row', alignItems:'center'}}>
          <Text style={[textStyles.B4, {color: colors.Gray10}]}>{sortName}</Text>
          <View style={{width: 4}} />
          <Text
            style={[
              textStyles.B4,
              {
                marginTop:1,
                fontFamily: 'SUIT-Bold',
                color: colors.Gray10,
                transform: [{rotate: '90deg'}],
              },
            ]}>
            {'>'}
          </Text>
        </TouchableOpacity> */}
      </View>
      {/* {sortToggle &&
        <View style={{ position: 'absolute', backgroundColor:colors.white, borderRadius:4, borderWidth:1, borderColor:colors.Gray03, zIndex:2, right:14, top: height+4}}>
        {[{title:"인기순", value:"POPULAR"}, {title:"최신순", value:"LATEST"}].map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={{padding:4, paddingHorizontal:16}}
            onPress={() => {sortList(item)}}>
            <Text style={[textStyles.B4, {color: colors.Gray10}]}>
              {item.title}          
            </Text>
          </TouchableOpacity>
        ))}
      </View>} */}
      <View style={{height: 16}} />
      <View
        style={{
          flexDirection: 'row',
          paddingRight: 16,
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderBottomColor: colors.Gray02,
        }}>
        <FlatList
          data={sortedCategory}
          renderItem={renderCategory}
          horizontal
          ListHeaderComponent={<View style={{width: 16}} />}
          ListFooterComponent={<View style={{width: 16}} />}
          ItemSeparatorComponent={<View style={{width: 8}} />}
          showsHorizontalScrollIndicator={false}
        />
        <LinearGradient
          start={{x: 1, y: 1}}
          end={{x: 0.1, y: 1}}
          locations={[0, 0.8]}
          colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']}
          style={{
            width: 60,
            height: '100%',
            position: 'absolute',
            right: 46,
            zIndex: 1,
            alignSelf: 'center',
          }}
        />
        <TouchableOpacity
          onPress={goFilter}
          style={[
            {
              backgroundColor: colors.Gray02,
              width: 30,
              borderRadius: 100,
              height: 30,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <FilterIcon />
        </TouchableOpacity>
      </View>
      
        <View style={{flex: 1}}>
        {meetList != null && !isRefreshing ? (
          meetList.length === 0 ?
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <MeetEmptyIcon />
            <View style={{height: 24}} />
            <Text style={[textStyles.C4, {color: colors.Gray07}]}>필터에 해당하는 모임이 없어요</Text>
          </View>
          :
          <MeetList
            ListHeaderComponent={<View style={{height: 16}} />}
            data={meetList}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            onEndReached={onEndReached}
          />
        ) : (
          <View style={{padding: 16}}>
            {[1, 2, 3, 4].map((item, index) => (
              <View
                key={index}
                style={{
                  padding: 16,
                  backgroundColor: colors.Gray02,
                  borderRadius: 10,
                  marginBottom: 16,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      width: 104,
                      height: 113,
                      backgroundColor: colors.Gray04,
                      borderRadius: 10,
                    }}
                  />
                  <View style={{width: 16}} />
                  <View style={{flex: 1}}>
                    <View
                      style={{
                        height: 20,
                        width: 120,
                        backgroundColor: colors.Gray04,
                        borderRadius: 5,
                      }}
                    />
                    <View style={{height: 8}} />
                    <View
                      style={{
                        height: 16,
                        width: 180,
                        backgroundColor: colors.Gray04,
                        borderRadius: 5,
                      }}
                    />
                    <View style={{height: 8}} />
                    <View
                      style={{
                        height: 14,
                        width: 50,
                        backgroundColor: colors.Gray04,
                        borderRadius: 5,
                      }}
                    />
                    <View style={{height: 8}} />
                    <View
                      style={{
                        height: 14,
                        width: 90,
                        backgroundColor: colors.Gray04,
                        borderRadius: 5,
                      }}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            bottom: 24,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 5,
          }}>
          <View
            style={{
              position: 'absolute',
              width: 32,
              height: 32,
              backgroundColor: colors.Gray10,
              opacity: 0.7,
              borderRadius: 20,
            }}
          />
          <ActivityIndicator
            size={'small'}
            style={{position: 'absolute'}}
            color={colors.BG}
          />
        </View>
      )}
    </View>
  );
};
export default MeetBrowse;
