import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import ContentHeader from '../../components/ContentHeader';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import SupportOpt from '../../components/SupportOpt';
import { completedTripHelpData } from '../../constants/staticData';
import { demoNotification } from '../../constants/testData';
import { useSelector } from 'react-redux';
import NotificationList from '../../components/NotificationList';

function SupportOptSeperator() {
  return (
    <View style={seperatorStyles.main} />
  );
}

function Notifications() {
  const notifications = useSelector(state => state.notification.notifications);
  
  return (
    <View style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        middleComponent={{ title: 'Notifications', color: colors.text.white }}
      />
      <ContentHeader
        height={hp(45)}
        title={'Latest Information'}
      />
      <View style={styles.notificationsView}>
        <FlatList
          data={notifications}
          style={styles.data}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={SupportOptSeperator}
          renderItem={({ item }) => (
            <NotificationList width={wp(321)} key={item.id} title={item.title} body={item.body} onPress={() => handleSupportNavigation(item)} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.blackBg,
    // height: hp(720),
    // width: wp(360),
  },
  notificationsView: {
    flex: 1,
    alignItems: 'center',
    width: wp(360),
    marginTop: hp(51),
  },
  data: {
    flex: 1,
  }
});

const seperatorStyles = StyleSheet.create({
  main: {
    width: wp(321),
    borderBottomWidth: wp(0.5),
    marginVertical: hp(3),
    borderBottomColor: colors.contentHeader,
  }
})

export default Notifications;
