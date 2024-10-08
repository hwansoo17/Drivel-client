import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {textStyles} from '../styles/textStyles';
import colors from '../styles/colors';
const CustomInput = ({
  value,
  onChangeText,
  placeholder,
  showButton,
  onButtonPress,
  buttonIcon,
  isValid,
  editable = true,
  buttonDisabled,
  secureTextEntry = false,
  showTimer,
  timerText,
  maxLength,
  keyboardType,
  inputMode,
  containerStyle,
  multiline,
  returnKeyType,
  onfocus,
}) => {
  return (
    <View
      style={[
        styles.inputContainer,
        containerStyle,
        {borderColor: isValid === false ? colors.red : colors.Gray03},
      ]}>
      <TextInput
        onFocus={onfocus}
        style={[
          styles.input,
          textStyles.H5,
          {color: editable ? colors.Gray10 : colors.Gray06},
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.Gray04}
        editable={editable}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        keyboardType={keyboardType}
        inputMode={inputMode}
        multiline={multiline}
        autoCapitalize={'none'}
        returnKeyType={returnKeyType}
      />
      {showTimer && (
        <Text
          style={[
            textStyles.H5,
            {marginRight: 8, color: colors.Gray04, alignSelf: 'center'},
          ]}>
          {timerText}
        </Text>
      )}
      {showButton && (
        <TouchableOpacity
          onPress={onButtonPress}
          style={{alignSelf: 'center'}}
          disabled={buttonDisabled}>
          {typeof buttonIcon === 'function'
            ? buttonIcon({buttonDisabled})
            : buttonIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.Gray03,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 12 : 0,
    
  },
  input: {
    textAlignVertical: 'center',
    flex: 1,
    color: colors.Gray10,
  },
  buttonText: {
    fontSize: 14,
    alignSelf: 'center',
  },
});

export default CustomInput;
