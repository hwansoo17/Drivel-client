import React from 'react';
import {View} from 'react-native';
import CustomChip from './CustomChip';

const ChipContainer = ({
  data,
  type,
  selectedItem,
  onSelectedHandler,
  containerStyle,
  maxSelection = 11,
  chipStyle,
  textStyle,
}) => {
  const onPressHandler = (isActive, item) => {
    if (type === 'single') {
      if (isActive) {
        if (onSelectedHandler) {
          onSelectedHandler('');
        }
      } else {
        if (onSelectedHandler) {
          onSelectedHandler(item);
        }
      }
    } else if (type === 'multi') {
      const selectedItems = Array.isArray(selectedItem)
        ? [...selectedItem]
        : [];

      if (isActive) {
        const index = selectedItems.indexOf(item);
        if (index !== -1) {
          selectedItems.splice(index, 1);
        }
      } else {
        if (selectedItems.length < maxSelection) {
          selectedItems.push(item);
        }
      }
      if (onSelectedHandler) {
        onSelectedHandler(selectedItems);
      }
    }
  };

  return (
    <View style={[{flexDirection: 'row', flexWrap: 'wrap'}, containerStyle]}>
      {data.map(item => {
        const isActive = Array.isArray(selectedItem)
          ? selectedItem.includes(item.id)
          : selectedItem === item.id;
        return (
          <CustomChip
            key={item.id}
            item={item.displayName}
            isActive={isActive}
            onPressHandler={() => onPressHandler(isActive, item.id)}
            chipStyle={chipStyle}
            textStyle={textStyle}
          />
        );
      })}
    </View>
  );
};

export default ChipContainer;
