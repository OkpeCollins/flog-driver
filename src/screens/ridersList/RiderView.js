import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView, StatusBar, FlatList, Alert} from 'react-native';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import { useDispatch, useSelector } from 'react-redux';
import ImageModal from '../../components/ImageModal';
import Section from './components/Section';
import { getDate } from '../../services/date.service';
import EarningPercent from './components/EarningPercent';
import { blockRider, deleteRider, unblockRider, getRiderStat, viewDoc } from "./actions/riderList.actions";
import { moneyService } from '../../services/money.service';
import DocumentThumbnail from './components/DocumentThumbnail';
import { riderAction } from '../../constants/staticData';
import RiderActionBtn from './components/RiderActionBtn';
// import { resetState } from '../signUp/actions/signUp.actions';

function RiderView({ navigation }) {
  const state = useSelector(state => state.login);
  const user = useSelector(state => state.login.user);
  const singleRider = useSelector(state => state.riderList.singleRider);
  const riderStat = useSelector(state => state.riderList.riderStat);
  const actionSucces = useSelector(state => state.riderList.actionSucces);
  
  const dispatch = useDispatch();

  let documentsList = [
    {...singleRider.bike.bikePaper, name: 'Bike Paper'},
    {...singleRider.bike.localGovernmentPaper, name: 'Local Government Paper'},
    {...singleRider.profilePicture, name: 'Profile Picture'},
  ]

  React.useEffect(() => {
    if (actionSucces === true) {
      navigation.goBack();
    }
  }, [actionSucces])

  React.useEffect(() => {
    let data = {
      authorization: `bearer ${user.tokens.accessToken}`,
      id: singleRider.id
    }
    dispatch(getRiderStat(data))
  }, [actionSucces])

  const handleImageView = (item) => {
    dispatch(viewDoc(item))
  }

  const handleAction = (type) => {
    let title;
    let message;
    let style;

    switch (type) {
      case 'block rider':
        title = 'You want to block this rider';
        message = 'You can unblock this rider at anytime.';
        style = 'default';
        break;
      case 'delete rider':
        title = 'You want to delete this rider?';
        message = 'Please note that this action is irreversible.';
        style = 'destructive';
        break;
      case 'unblock rider':
        title = 'You want to unblock this rider?';
        message = 'This action will allow the rider to access the account.';
        style = 'default';
        break;
      default:
        break;
    }

    Alert.alert(
      title,
      message,
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => action(type),
          style: style,
        },
      ],
      {
        cancelable: true,
      }
    );
  }

  const action = (type) => {
    console.log('data')
    let data = {
      id: singleRider.id
    }

    switch (type) {
      case 'block rider':
        dispatch(blockRider(data))
        break;
      case 'delete rider':
        dispatch(deleteRider(data))
        break;
      case 'unblock rider':
        dispatch(unblockRider(data))
        break;
      default:
        break;
    }

  }

  let statusColor = singleRider.status.account === 'Pending' ? colors.borderGrey : singleRider.status.account === 'Blocked' ? colors.orange : singleRider.status.account === 'Approved' && colors.green;
  
  return (
    <View style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: `Rider - ${singleRider.fullName}`, color: colors.text.white }}
      />
      <ImageModal />
      <ScrollView style={styles.dataContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.info}>
          <View style={styles.imageContainer}>
            <View style={styles.imageBase}>
              {singleRider.profilePicture &&
                <Image
                  source={{ uri: `data:${singleRider.profilePicture.mimeType.replace(/&#x2F;/g, '/')};base64,${singleRider.profilePicture.value.replace(/&#x2F;/g, '/')}` }}
                  style={styles.image}
                />
              }
            </View>
            <View style={[styles.statusIndicator, {backgroundColor: statusColor}]} />
          </View>
          <View style={styles.personalInfo}>
            <Text style={styles.name}>{singleRider.fullName}</Text>
            <Text style={styles.email}>{singleRider.email.value}</Text>
            <Text style={styles.others}>Created on {getDate(singleRider.createdAt)}</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Section title={'Stat'} paddingTop={hp(14)} paddingBottom={hp(22)}>
            <View style={styles.stats}>
              {riderStat.stat.map((value, index) => (
              <View key={value.name} style={styles.statData}>
                <Text style={styles.statFigure}>{value.value}</Text>
                <Text style={styles.statTitle}>{value.name}</Text>
              </View>
              ))}
            </View>
          </Section>
          <Section title={'Total Earning'} paddingTop={hp(14)} paddingBottom={hp(22)} marginTop={hp(20)}>
            <View style={styles.statData}>
              <Text style={styles.statFigure}>{moneyService.formatMoney(riderStat.earning.totalEarning.value)}</Text>
            </View>
            <View style={[styles.chartData, {marginTop: hp(38)}]}>
              <EarningPercent total={riderStat.earning.totalEarning.value} portion={riderStat.earning.totalCardEarning.value} />
              <Text style={[styles.statTitle, {marginTop: hp(6)}]}>Card earning of {moneyService.formatMoney(riderStat.earning.totalCardEarning.value)}</Text>
            </View>
            <View style={styles.chartData}>
              <EarningPercent total={riderStat.earning.totalEarning.value} portion={riderStat.earning.totalCashEarning} />
              <Text style={[styles.statTitle, {marginTop: hp(6)}]}>Cash earning of {moneyService.formatMoney(riderStat.earning.totalCashEarning.value)}</Text>
            </View>
          </Section>
          <Section title={'Documents'} paddingTop={hp(14)} paddingBottom={hp(22)} marginTop={hp(20)}>
            <View style={styles.documents}>
              <View style={styles.dataViewContainer}>
                <FlatList
                  data={documentsList}
                  style={styles.dataView}
                  keyExtractor={(item) => item.name}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled
                  // snapToAlignment={'center'}
                  scrollEventThrottle={20}
                  renderItem={({ item, index }) => (
                    <DocumentThumbnail
                      key={item.name}
                      mimeType={item.mimeType}
                      imageValue={item.value}
                      title={item.name}
                      onPress={() => handleImageView(item)}
                    />
                  )}
                />
              </View>
            </View>
          </Section>
          <Section title={'Actions'} paddingTop={hp(14)} paddingBottom={hp(22)} marginTop={hp(20)}>
            <View style={styles.stats}>
              {riderAction.map((value, index) => (
                <RiderActionBtn
                  key={value.title}
                  title={value.title}
                  iconName={value.iconName}
                  backgroundColor={value.color}
                  onPress={() => handleAction(value.title)}
                  disabled={singleRider.status.account === value.name && true || singleRider.status.account === 'Pending'}
                />
              ))}
            </View>
          </Section>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    height: hp(720) + StatusBar.currentHeight,
    width: wp(360),
    backgroundColor: colors.blackBg,
  },
  info: {
    alignItems: 'center',
  },
  imageContainer: {
    // marginTop: hp(10),
    // backgroundColor: 'red',
  },
  imageBase: {
    width: wp(162),
    height: wp(162),
    borderRadius: wp(162) / 2,
    overflow: 'hidden',
    backgroundColor: colors.grey,
  },
  statusIndicator: {
    position: 'absolute',
    top: hp(17),
    left: wp(131),
    width: wp(15),
    height: wp(15),
    borderRadius: wp(15) / 2,
    backgroundColor: colors.green,
  },
  image: {
    width: wp(162),
    height: wp(162),
  },
  personalInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: wp(18),
    fontWeight: '700',
    color: colors.text.white,
  },
  email: {
    fontSize: wp(10),
    fontWeight: '500',
    color: colors.mainColor,
  },
  others: {
    fontSize: wp(9),
    fontWeight: '500',
    color: colors.text.grey,
  },
  content: {
    marginTop: hp(16),
    paddingBottom: hp(20),
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(20),
  },
  statData: {
    alignItems: 'center',
    marginTop: hp(12),
  },
  statFigure: {
    fontSize: wp(24),
    fontWeight: '500',
    color: colors.mainColor,
  },
  statTitle: {
    fontSize: wp(14),
    fontWeight: '500',
    color: colors.text.grey,
    textTransform: 'capitalize',
  },
  chartData: {
    alignItems: 'center',
    marginTop: hp(16),
  },
  documents: {
    alignItems: 'center',
    marginTop: hp(16),
  },
  dataViewContainer: {
    flex: 1,
    alignItems: 'center',
    // width: wp(317),
    // backgroundColor: 'red'
  },
  dataView: {
    flex: 1,
    width: wp(317),
    // paddingHorizontal: wp(83),
    // paddingLeft: wp(83),
    // paddingRight: wp(83),
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(30),
    marginTop: hp(12),
  },
})

export default RiderView;
