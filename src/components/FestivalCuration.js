import React from 'react';
import {Text, ImageBackground, Pressable, View} from 'react-native';
import {textStyles} from '../styles/textStyles';
import colors from '../styles/colors';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import MainLogo from '../assets/icons/MainLogo';
const formatDate = dateString => {
  const isoDateString = `${dateString.slice(0, 4)}-${dateString.slice(
    4,
    6,
  )}-${dateString.slice(6, 8)}`;
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const formatShortDate = dateString => {
  const isoDateString = `${dateString.slice(0, 4)}-${dateString.slice(
    4,
    6,
  )}-${dateString.slice(6, 8)}`;
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const FestivalCuration = ({item}) => {
  const navigation = useNavigation();

  const handleFestivalInfo = id => {
    navigation.navigate('FestivalInfo', {festivalId: id});
  };

  return (
    <Pressable onPress={() => handleFestivalInfo(item.id)}>
      {item.imagePath == '' || item.imagePath == null ? (
        <View
          style={{
            width: 182,
            height: 252,
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <MainLogo width={150} height={150} />
          </View>
          <LinearGradient 
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']} 
          style={{width: 182, height: 252, position:'absolute', backgroundColor: 'rgba(0, 0, 0, 0.1)', zIndex:1, padding:12}}>
            <View style={{flex: 1}} />
            <Text
              style={[
                textStyles.H4,
                {
                  color: colors.white,
                },
              ]}
              numberOfLines={2} // 최대 두 줄로 표시
              ellipsizeMode="tail">
              {item.title}
            </Text>
            <Text style={[textStyles.H6, {color: colors.Gray03, zIndex:2}]}>
              {item.startDate && formatDate(item.startDate)} -{' '}
              {item.endDate && formatShortDate(item.endDate)}
            </Text>
          </LinearGradient>
        </View>
      ) : (
        <ImageBackground
          src={item.imagePath}
          style={{
            width: 182,
            height: 252,
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          <LinearGradient
            style={{flex: 1, padding: 12}}
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']}>
            <View style={{flex: 1}} />
            <Text
              style={[
                textStyles.H4,
                {
                  color: colors.white,
                },
              ]}
              numberOfLines={2} // 최대 두 줄로 표시
              ellipsizeMode="tail">
              {item.title}
            </Text>
            <Text style={[textStyles.H6, {color: colors.Gray03}]}>
              {item.startDate && formatDate(item.startDate)} -{' '}
              {item.endDate && formatShortDate(item.endDate)}
            </Text>
          </LinearGradient>
        </ImageBackground>
      )}
    </Pressable>
  );
};

export default FestivalCuration;
