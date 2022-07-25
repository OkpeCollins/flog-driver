import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import { fleetOwnerHomeData } from '../../constants/staticData';
import { mockfleetHomeData, mockRiders } from '../../constants/testData';
import FleetOwnerDataView from './components/FleetOwnerDataView';
import { Ionicons } from '@expo/vector-icons';
import { moneyService } from '../../services/money.service';
import DriverListView from './components/DriverListView';
import { useDispatch, useSelector } from 'react-redux';
import { userCheck } from '../login/actions/login.actions';
import { getFleetOwnerHomeData } from './actions/home.action';
import { getDate } from '../../services/date.service';
import ListEmpty from '../../components/ListEmpty';
import { actionSuccess, resetActionSuccess, singleRider } from '../ridersList/actions/riderList.actions';

function FleetOwnerHome({ navigation }) {
  const [homeDataIndex, setHomeDataIndex] = React.useState(0)

  const dispatch = useDispatch()
  const user = useSelector(state => state.login.user)
  const fleetHomeData = useSelector(state => state.home.fleetHomeData)
  const triggerAPICall = useSelector(state => state.riderList.triggerAPICall);

  const homeDataRef = React.useRef()

  React.useEffect(() => {
    let data = {
      authorization: `bearer ${user.tokens.accessToken}`,
      fleetOwner: user.fleetOwner,
      userId: user.id
    }
    dispatch(userCheck(data))
  }, [])

  React.useEffect(() => {
    let data = {
      authorization: `bearer ${user.tokens.accessToken}`,
      fleetOwner: user.fleetOwner,
      userId: user.id
    }
    dispatch(resetActionSuccess())
    dispatch(getFleetOwnerHomeData(data))
  }, [triggerAPICall])

  const seperator = () => (
    <View style={{height:hp(15)}} />
  )

  const SeeMore = () => (
    <TouchableOpacity style={styles.seeMoreBtn} onPress={() => navigation.navigate('RidersList')}>
      <Text style={{color: colors.mainColor}}>See More...</Text>
    </TouchableOpacity>
  )

  const handleScroll = (type) => {
    switch (type) {
      case 'back':
        if (homeDataIndex === 0) {
        homeDataRef.current.scrollToIndex({ animated: true, index: 2 });
          setHomeDataIndex(2);
        } else {
          homeDataRef.current.scrollToIndex({ animated: true, index: homeDataIndex - 1 });
          setHomeDataIndex(homeDataIndex - 1);
        }
        break;
      case 'forward':
        if (homeDataIndex === 2) {
          homeDataRef.current.scrollToIndex({ animated: true, index: 0 });
          setHomeDataIndex(0);
        } else {
          homeDataRef.current.scrollToIndex({ animated: true, index: homeDataIndex + 1 });
          setHomeDataIndex(homeDataIndex + 1);
        }
        break;
      default:
        break;
    }
  }

  const handleRiderPress = (item) => {
    dispatch(singleRider(item));
    navigation.navigate('RiderView');
  }

  return (
    <View style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        // leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: 'Home', color: colors.text.white }}
      />
      <View style={styles.headerContent}>
        <View style={styles.headerContentTitles}>
          {fleetOwnerHomeData.map((value, index) => (
            <Text key={value.id} style={[styles.headerContentTitle, {color: homeDataIndex === index ? colors.text.white : colors.text.grey}]}>{value.title}</Text>
          ))}
        </View>
        <View style={styles.content}>
          <TouchableOpacity onPress={() => handleScroll('back')}>
            <View style={styles.navBtn}>
              <Ionicons name={'chevron-back'} color={colors.text.white} size={wp(18)} />
            </View>
          </TouchableOpacity>
          <View style={styles.dataViewContainer}>
            <FlatList
              ref={homeDataRef}
              data={fleetHomeData.allDataStat}
              style={styles.dataView}
              keyExtractor={(item) => item.name}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              snapToAlignment={'center'}
              scrollEventThrottle={20}
              renderItem={({ item, index }) => (
                <FleetOwnerDataView
                  key={item.id}
                  value={index === 0 ? moneyService.formatMoney(item.value) : item.value}/>
              )}
            />
          </View>
          <TouchableOpacity onPress={() => handleScroll('forward')}>
            <View style={styles.navBtn}>
              <Ionicons name={'chevron-forward'} color={colors.text.white} size={wp(18)} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={{alignItems: 'center'}} onPress={() => navigation.navigate('AddRider')} >
            <View style={styles.actionBtn}>
              <Ionicons name={'add'} color={colors.text.black} size={wp(20)} />
            </View>
            <Text style={styles.actionTitle}>Add new rider</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}} onPress={() => navigation.navigate('RidersList')} >
            <View style={styles.actionBtn}>
              <Ionicons name={'eye-outline'} color={colors.text.black} size={wp(20)} />
            </View>
            <Text style={styles.actionTitle}>View all rider</Text>
          </TouchableOpacity>          
        </View>
      </View>
      <View style={styles.bottomData}>
        <View style={styles.bottomDataTitleContainer}>
          <Text style={styles.bottomDataTitle}>Your Riders</Text>
        </View>
        <View style={styles.bottomDataContent}>
          <FlatList
            data={fleetHomeData.lastFiveRiders}
            keyExtractor={(item) => item.email.value}
            ItemSeparatorComponent={seperator}
            ListEmptyComponent={ListEmpty}
            ListFooterComponent={SeeMore}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <DriverListView
                name={item.fullName} email={item.email.value}
                date={getDate(item.createdAt)}
                onPress={() => handleRiderPress(item)}
              />
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
  headerContent: {
    width: wp(360),
    height: hp(316),
    backgroundColor: colors.contentHeader,
  },
  headerContentTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(26),
    marginHorizontal: wp(104),
  },
  headerContentTitle: {
    fontSize: wp(11),
    color: colors.grey,
    textTransform: 'capitalize',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(26),
    // marginTop: hp(74),
  },
  navBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(25),
    height: wp(25),
    borderRadius: wp(25) / 2,
    backgroundColor: colors.regInputGrey,
  },
  dataViewContainer: {
    flex: 1,
    alignItems: 'center',
    // width: wp(248),
    // height: wp(50),
    // backgroundColor: 'red'
  },
  dataView: {
    flex: 1,
    width: wp(248),
  },
  actions: {
    flex: 1.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(56),
    // marginTop: hp(64),
  },
  actionBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(45),
    height: wp(45),
    borderRadius: wp(45) / 2,
    backgroundColor: colors.mainColor,
  },
  actionTitle: {
    fontSize: wp(12),
    color: colors.text.white,
    marginTop: hp(6),
  },
  bottomData: {
    flex: 1,
    marginTop: hp(25),
    width: wp(360),
    // height: wp(45),
    // marginLeft: wp(20),
    // marginRight: wp(20),
  },
  bottomDataTitleContainer: {
    alignItems: 'center',
  },
  bottomDataTitle: {
    fontSize: wp(15),
    color: colors.text.white,
    fontWeight: '700',
  },
  bottomDataContent: {
    flex: 1,
    marginTop: hp(12),
    marginBottom: hp(12),
  },
  seeMoreBtn: {
    alignItems: 'flex-end',
    marginTop: hp(10),
    marginHorizontal: wp(20),
  },
})

export default FleetOwnerHome;
