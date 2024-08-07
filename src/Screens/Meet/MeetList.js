import React from 'react';
import {FlatList, View} from 'react-native';
import MeetListItem from './MeetListItem';
import {RefreshControl} from 'react-native-gesture-handler';
const MeetList = ({
  ListHeaderComponent,
  data,
  refreshing,
  onRefresh,
  onEndReached,
  ListFooterComponent,
}) => {
  return (
    <FlatList
      ListFooterComponent={ListFooterComponent}
      ListHeaderComponent={ListHeaderComponent}
      data={data}
      renderItem={({item}) => (
        <MeetListItem item={item}/>
      )}
      keyExtractor={item => item.meetingId}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};
export default MeetList;
