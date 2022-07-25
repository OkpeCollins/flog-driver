import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, FlatList} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from '../../../components/Button';
import RegSelector from '../../../components/RegSelector';
import SupportOptSeperator from '../../../components/SupportOptSeperator';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';
import { fileUploadData } from '../../../constants/staticData';
import UploadFileList from './UploadFileList';
import { useDispatch, useSelector } from 'react-redux';
import DayModal from './DayModal';
import { riderData, showModal } from '../actions/riderList.actions';

function DocumentsUpload({ onPressNext, errorRiderCardDetails, errorRiderCards, loading, disabled }) {
  const [uploadList, setUploadList] = React.useState({localGovernmentPaper: false, bikePaper: false, profilePhoto: false});
  const state = useSelector(state => state.riderList);
  const dispatch = useDispatch()

  const handleFileUpload = async (type) => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    })
      .then((response) => {
        let mimeType = response.base64[0] === '/' ? 'image/jpg' : 'image/png';
        let signUpValues = state.riderData;
        switch (type) {
          case 'localGovernmentPaper':
            signUpValues = {...signUpValues, localGovernmentPaperValue: response.base64, localGovernmentPaperMimeType: mimeType}
            dispatch(riderData(signUpValues))
            break;
          case 'bikePaper':
            signUpValues = {...signUpValues, bikePaperValue: response.base64, bikePaperMimeType: mimeType}
            dispatch(riderData(signUpValues))
            break;
          case 'profilePhoto':
            signUpValues = {...signUpValues, profilePhotoValue: response.base64, profilePhotoMimeType: mimeType}
            dispatch(riderData(signUpValues))
            break;
          default:
            break;
        }
      })
    .catch(error => console.log(error))
  }

  const handleDate = (type) => {
    dispatch(showModal(type))
  }

  const handleDone = (type) => {
    switch (type) {
      case 'localGovernmentPaper':
        if (state.riderData.localGovernmentPaper) {
          return true
        }
      case 'bikePaper':
        signUpValues = {...signUpValues, bikePaperValue: response.base64, bikePaperMimeType: 'image/jpeg;base64'}
        dispatch(riderData(signUpValues))
        break;
      case 'profilePhoto':
        signUpValues = {...signUpValues, profilePhotoValue: response.base64, profilePhotoMimeType: 'image/jpeg;base64'}
        dispatch(riderData(signUpValues))
        break;
      default:
        break;
    }
  }

  return (
    <View>
      <DayModal/>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Documents</Text>
        <Text style={styles.desc}>We are legally required to ask you for some documents to sign up as a rider. Document scans and quality photos are accepted</Text>
      </View>
      <View style={styles.form}>
          {errorRiderCardDetails && <Text style={styles.errorHint}>{errorRiderCardDetails}</Text>}
        <View style={styles.cardDetailsContainer}>
          <View style={styles.cardDetailsHeader}>
            <Text style={styles.formInfoWhite}>Rider’s Card Details</Text>
            <Text style={[styles.formInfoWhite, {color: colors.text.red, fontSize: wp(16)}]}>*</Text>
          </View>
          <View style={styles.cardDetailsContent}>
            <Text style={styles.formInfoGreen}>Riders card number</Text>
            <RegSelector text={state.riderData.riderCardDay ? state.riderData.riderCardDay : 'Day'} marginTop={hp(4)} onPress={() => handleDate('day')} />
            <RegSelector text={state.riderData.riderCardMonth ? state.riderData.riderCardMonth : 'Month'} marginTop={hp(8)} onPress={() => handleDate('month')} />
            <RegSelector text={state.riderData.riderCardYear ? state.riderData.riderCardYear : 'Year'} marginTop={hp(8)} onPress={() => handleDate('year')} />
          </View>
          <View style={styles.btnContainer}>
            <Button width={wp(103)} height={32} title={'+ Upload file'} fontSize={hp(10)} fontWeight={'700'} borderRadius={wp(10)} />
          </View>
        </View>
        {errorRiderCards && <Text style={styles.errorHint}>{errorRiderCards}</Text>}
        <View style={styles.cardDetailsBottom}>
          <FlatList
            data={fileUploadData}
            style={styles.data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={SupportOptSeperator}
            renderItem={({ item }) => (
              <UploadFileList key={item.id} title={item.title} onPress={() => handleFileUpload(item.type)} data={item} />
            )}
          />
        </View>
        <View style={{marginTop: hp(26)}}>
          <Button
            width={wp(103)}
            height={32}
            title={'Add Rider'}
            fontSize={hp(10)}
            fontWeight={'700'}
            borderRadius={wp(10)}
            onPress={onPressNext}
            loading={loading}
            disabled={disabled}
          />
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    // flex: 0.1,
    width: wp(360),
    marginTop: hp(16),
    paddingHorizontal: wp(48),
  },
  title: {
    fontSize: wp(22),
    fontWeight: '700',
    color: colors.text.white,
    textAlign: 'center',
    marginBottom: hp(1),
  },
  desc: {
    fontSize: wp(16),
    fontWeight: '400',
    color: colors.text.white,
    textAlign: 'center',
  },
  formInfoContainer: {
    alignItems: 'flex-start',
    marginTop: hp(60),
    marginHorizontal: wp(20),
  },
  formInfoWhite: {
    fontSize: wp(16),
    fontWeight: '400',
    color: colors.text.white,
    textAlign: 'left',
  },
  formInfoGreen: {
    fontSize: wp(12),
    fontWeight: '400',
    color: colors.mainColor,
    textAlign: 'left',
  },
  form: {
    alignItems: 'center',
    marginTop: hp(26),
    width: wp(360),
    paddingBottom: hp(10),
  },
  cardDetailsContainer: {
    alignItems: 'center',
    width: wp(279),
    height: hp(224),
    borderRadius: wp(10),
    borderColor: colors.white,
    borderWidth: hp(1),
    paddingTop: hp(13),
    paddingLeft: hp(16),
    paddingRight: hp(23),
    marginTop: hp(16),
  },
  errorHint: {
    alignSelf: 'flex-start',
    marginLeft: wp(21),
    marginRight: wp(21),
    marginTop: wp(5),
    fontSize: wp(14),
    color: colors.text.lightGrey,
  },
  cardDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardDetailsContent: {
    marginTop: hp(8),
  },
  cardDetailsBottom: {
    alignItems: 'center',
    marginTop: hp(16),
    backgroundColor: colors.contentHeader,
    width: wp(321),
    height: hp(125),
    borderRadius: wp(20),
    paddingTop: hp(8),
  },
  btnContainer: {
    marginTop: hp(8)
  },
})

export default React.memo(DocumentsUpload);
