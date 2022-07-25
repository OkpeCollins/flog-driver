import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../components/Button';
import { colors } from '../../../../constants/colors';
import { hp, wp } from '../../../../constants/dimension';
import { naira } from '../../../../constants/staticData';
import { getThreeMonthBalance } from '../../actions/earning.action';

function PastThreeMonth({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login.user);
  const balanceThreeMonth = useSelector(state => state.earning.balanceThreeMonth);

  React.useEffect(() => {
    let data = {
      authorization: `bearer ${user.tokens.accessToken}`,
      id: user.id,
      token: user.tokens.accessToken,
      fleetOwner: user.fleetOwner,
    }
    
    dispatch(getThreeMonthBalance(data));
  }, [])

  return (
    <View style={styles.main}>
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Transfer funds to flog</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoIconContainer}>
            <Ionicons name={'warning'} color={colors.text.white} />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoText}>After making payment, there could be a delay (up to 12h) until it is reflected in the balance</Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button
            title={'Pay To Flog'}
            fontSize={hp(16)}
            width={wp(240)}
            height={hp(48)}
            borderRadius={wp(20)}
            onPress={() => navigation.navigate('PayToFlog')}
          />
        </View>
      </View>
      <View style={styles.balanceContainer}>
        <View style={styles.balContainer}>
          <Text style={styles.balInfo}>Starting Balance</Text>
          <Text style={styles.balMoney}>-{naira + balanceThreeMonth.firstThreeMonthPay}</Text>
        </View>
        <View style={styles.seperationLine} />
        <View style={styles.balContainer}>
          <Text style={styles.balInfo}>Ending Balance</Text>
          <Text style={styles.balMoney}>-{naira + balanceThreeMonth.lastThreeMonthPay}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.blackBg,
    alignItems: 'center',
  },
  mainContainer: {
    alignItems: 'center',
    width: wp(321),
    height: hp(212),
    borderRadius: wp(20),
    marginTop: hp(40),
    backgroundColor: colors.contentHeader,
  },
  titleContainer: {
    marginTop: hp(18),
  },
  title: {
    fontSize: wp(14),
    color: colors.text.white,
  },
  infoContainer: {
    flexDirection: 'row',
    width: wp(278),
    height:72,
    marginTop: hp(26),
    backgroundColor: colors.offlineScreenGrey,
    borderRadius: wp(5),
    paddingHorizontal: wp(8),
    paddingVertical: hp(14),
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: wp(8),
  },
  infoText: {
    fontSize: wp(13),
    lineHeight: hp(15.23),
    color: colors.text.white,
  },
  btnContainer: {
    marginTop: hp(16),
  },
  balanceContainer: {
    justifyContent: 'center',
    width: wp(321),
    height: hp(86),
    paddingLeft: wp(18),
    paddingRight: wp(11),
    borderRadius: wp(20),
    marginTop: hp(40),
    backgroundColor: colors.contentHeader,
  },
  balContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balInfo: {
    fontSize: wp(10),
    fontWeight: '300',
    color: colors.text.white,
  },
  balMoney: {
    fontSize: wp(16),
    fontWeight: '700',
    color: colors.mainColor,
  },
  seperationLine: {
    marginTop: hp(8),
    marginBottom: hp(8),
    borderBottomColor: colors.borderGrey,
    borderBottomWidth: hp(0.5),
  },
})

export default PastThreeMonth;