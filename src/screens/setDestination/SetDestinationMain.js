import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AutoCompleteListView from '../../components/AutoCompleteList';
import Button from '../../components/Button';
import ContentHeader from '../../components/ContentHeader';
import Header from '../../components/Header';
import RegInput from '../../components/RegInput';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import { getAutoCompletData, getGeometry } from '../home/actions/home.action';
import SetDestBtn from './components/SetDestBtn';

function SetDestinationMain({ navigation }) {
  const [description, setDescription] = React.useState();

  const homeState = useSelector(state => state.home)
  const user = useSelector(state => state.login.user);
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   if (homeState.geometryData.description) {
  //     navigation.navigate('Home');
  //   }
  // }, [homeState.geometryData])

  const handleAutoCompleteCall = (text) => {
    let data = {
      authorization: `bearer ${user.tokens.accessToken}`,
      address: text,
    }
    if (text.length >= 3) {
      dispatch(getAutoCompletData(data))
    }
  }

  const handleLocationSet = (data) => {
    setDescription(data.description);
    dispatch(getGeometry({placeId: data.place_id}))
    navigation.navigate('Home');
  }

  return (
    <View style={styles.main}>
    <Header
      backgroundColor={colors.blackBg}
      leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
      middleComponent={{ title: 'Set Destination', color: colors.text.white }}
      />
      <RegInput
        width={wp(360)}
        height={hp(80)}
        marginTop={hp(23)}
        borderRadius={wp(0)}
        placeholder={'Enter destination address'}
        fontSize={hp(14)}
        onChangeText={(text) => handleAutoCompleteCall(text)}
        value={description}
      />
      <View style={styles.autoCompleteContainer}>
        <FlatList
          data={homeState.autoCompleteData}
          style={styles.data}
          keyExtractor={(item) => item.id}
          // ItemSeparatorComponent={SupportOptSeperator}
          renderItem={({ item }) => (
            <AutoCompleteListView key={item.place_id} title={item.description} onPress={() => handleLocationSet(item)} />
          )}
        />
      </View>
      {/* <View style={styles.btnContainer}>
        <Button title={'Set Location'} />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.blackBg,
  },
  otherContent: {
    marginTop: hp(16),
  },
  data: {
    width: wp(360),
  },
  title: {
    fontSize: wp(14),
    fontWeight: '700',
    marginLeft: wp(19),
    color: colors.text.white,
  },
  autoCompleteContainer: {
    height: hp(380),
    width: hp(360),
  },
  btnContainer: {
    alignItems: 'center',
    margin: hp(10),
  },
});

export default SetDestinationMain;
