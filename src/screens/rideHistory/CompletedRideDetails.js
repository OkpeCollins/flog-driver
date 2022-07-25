import React from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ContentHeader from '../../components/ContentHeader';
import Header from '../../components/Header';
import Star from '../../components/Star';
import SupportOpt from '../../components/SupportOpt';
import SupportOptSeperator from '../../components/SupportOptSeperator';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import { completedTripHelpData } from '../../constants/staticData';
import { getDate } from '../../services/date.service';
import PayOptCard from '../payments/components/PayOptCard';
import { supportDetails } from '../support/actions/support.action';
import HistoryCard from './components/HistoryCard';

function CompleteDetails({ navigation }) {
  const support = useSelector((state) => state.support);
  const user = useSelector(state => state.login.user);

  const singleCompletedHistory = useSelector(state => state.rideHistory.singleCompletedHistory);

  const dispatch = useDispatch();

  console.log(singleCompletedHistory);

  // const socket = React.useMemo(() => io(apiBaseUrl));

  const handleSupportNavigation = (details) => {
    dispatch(supportDetails(details))
    navigation.navigate('SupportDetails')
  }
  return (
    <View style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: 'Trip Detail', color: colors.text.white }}
      />
      <View style={styles.contentHeaderContainer}>
        <ContentHeader title={'Showing Trip Details'} height={hp(45)} />
      </View>
      <View style={styles.historyContainer}>
        <HistoryCard
          location={singleCompletedHistory.origin.text}
          destination={singleCompletedHistory.destination.text}
          status={singleCompletedHistory.status}
          stars={singleCompletedHistory.rate.value}
          price={singleCompletedHistory.price}
          date={singleCompletedHistory.createdAt}
          paymentStatus={singleCompletedHistory.paymentStatus}
        />
      </View>
      <View style={styles.ratingContainer}>
        <View style={styles.driverImageBase}>
          <Image />
        </View>
        <View style={styles.driverRating}>
          <Text style={styles.driverName}>Your Trip for {singleCompletedHistory.userData.name}</Text>
          <Text style={styles.date}>{getDate(singleCompletedHistory.createdAt)}</Text>
          <View style={styles.rightStar}>
            {singleCompletedHistory.rate.value.map(( item, index ) => {
              return (
                <Star key={index} color={item === 'true' ? colors.gold : colors.historyBorder} disabled />
              )
            })}
          </View>
        </View>
      </View>
      <View style={styles.paymentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Payment</Text>
        </View>
        <View style={styles.paymentOptionContainer}>
          <PayOptCard
            width={wp(335)}
            title={singleCompletedHistory.paymentType}
            type={singleCompletedHistory.paymentType}
            price={singleCompletedHistory.price}
            titleSize={wp(16)}
            paymentStatus={singleCompletedHistory.paymentStatus}
            disabled
          />
        </View>
      </View>
      <View style={styles.needHelpContainer}>
        <ContentHeader title={'Need Help'} height={hp(45)} />
        <View style={styles.helpData}>
          <FlatList
            data={completedTripHelpData}
            style={styles.data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={SupportOptSeperator}
            renderItem={({ item }) => (
              <SupportOpt key={item.id} title={item.title} onPress={() => handleSupportNavigation(item)} />
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.blackBg,
  },
  historyContainer: {
    marginTop: hp(16),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: wp(16),
    width: wp(360),
    height: hp(96),
    marginTop: hp(16),
    backgroundColor: colors.contentHeader,
  },
  driverImageBase: {
    width: hp(52),
    height: hp(52),
    backgroundColor: colors.grey,
    borderRadius: hp(52) /2,
  },
  driverRating: {
    // alignSelf: 'flex-start',
    marginLeft: hp(10),
  },
  driverName: {
    fontSize: wp(14),
    fontWeight: '700',
    color: colors.text.white,
  },
  date: {
    fontSize: wp(9),
    fontWeight: '700',
    color: colors.mainColor,
  },
  rightStar: {
    flexDirection: 'row',
    marginTop: hp(3),
  },
  paymentContainer: {
    // alignItems: 'center',
    marginTop: hp(8),
    // width: wp(360),
  },
  titleContainer: {
    // paddingHorizontal: wp(16),
    // backgroundColor: 'red',
  },
  title: {
    fontSize: wp(14),
    fontWeight: '400',
    color: colors.text.white,
  },
  paymentOptionContainer: {
    marginTop: hp(8), 
  },
  needHelpContainer: {
    flex: 1,
    marginTop: hp(8),
    alignItems: 'center',
  },
  helpData: {
    flex: 1,
    alignItems: 'center',
    width: wp(360),
    paddingBottom: hp(20)
  },
  data: {
    marginTop: hp(8),
  },
})

export default CompleteDetails;
