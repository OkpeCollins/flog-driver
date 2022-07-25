import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import Button from '../../../components/Button';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';

function UploadFileList({ onPress, title, data }) {
  const [uploaded, setUploaded] = React.useState(false)
  const state = useSelector(state => state.riderList)

  React.useEffect(() => {
    switch (data.type) {
      case 'localGovernmentPaper':
        if (state.riderData.localGovernmentPaperValue) {
          setUploaded(true);
        }
        break;
      case 'bikePaper':
        if (state.riderData.bikePaperValue) {
          setUploaded(true);
        }
        break;
      case 'profilePhoto':
        if (state.riderData.profilePhotoValue) {
          setUploaded(true);
        }
      case 'guarantorPhotoId':
        if (state.riderData.guarantorPhotoValue) {
          setUploaded(true);
        }
        break;
      default:
        setUploaded(false);
        break;
    }
  }, [state.riderData])
  return (
    <View style={styles.main}>
      <Text style={styles.asteriks}>*</Text>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconContainer}>
        {uploaded && (
          <Ionicons name={'checkmark-circle'} size={hp(18)} color={colors.green} />
        )}
      </View>
      <Button
        width={wp(103)}
        height={wp(32)}
        title={'+ Upload file'}
        fontSize={hp(10)} fontWeight={'700'}
        borderRadius={wp(10)}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  asteriks: {
    fontSize: wp(18),
    color: colors.text.red,
  },
  title: {
    flex: 0.7,
    fontSize: wp(10),
    marginLeft: wp(6),
    color: colors.text.white,
  },
  iconContainer: {
    alignItems: 'flex-start',
    flex: 0.1,
  }
})

export default UploadFileList;
