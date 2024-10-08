import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import {useNavigation} from '@react-navigation/native';

const MyDriveTag = ({myProfileInfo}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        marginHorizontal: 16,
        backgroundColor: colors.white,
        borderRadius: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Text style={[textStyles.B3, {color: colors.Gray10}]}>
          나의 드라이브 태그
        </Text>
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MyDriveTagEdit', {item: myProfileInfo})
          }>
          <Text style={[textStyles.B4, {color: colors.Gray05}]}>수정</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 16}} />
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {myProfileInfo.styles
          .concat(myProfileInfo.themes, myProfileInfo.togethers)
          .map((item, index) => (
            <View
              key={index}
              style={{
                alignSelf: 'flex-start',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 24,
                justifyContent: 'center',
                marginRight: 8,
                marginBottom: 8,
                backgroundColor: colors.Light_Blue,
              }}>
              <Text style={[textStyles.B4, {color: colors.Blue}]}>
                {item.displayName}
              </Text>
            </View>
          ))}
      </View>
    </View>
  );
};

export default MyDriveTag;
