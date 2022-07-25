import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import CardInput from './components/CardInput';
import creditcardutils from 'creditcardutils';
import Button from '../../components/Button';

function NewCard({navigation}) {
  const [cCNumIcon, setCCNumIcon] = React.useState();
  const [cardNum, setCardNum] = React.useState();
  const [cardType, setCardType] = React.useState();

  //haandle credit card number input
  const onChangeCCNum = (text) => {
    setCCNumIcon('close')
    setCardType(creditcardutils.parseCardType(text));
    setCardNum(creditcardutils.formatCardNumber(text))
  }
  return (
    <View style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: 'New Card', color: colors.text.white }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.creditCardContainer}>
            <CardInput 
            cardType={cardType}
            iconName={'card-outline'}
            placeholder={'Please enter credit card number'}
            onChangeText={(text) => onChangeCCNum(text)}
            value={cardNum}
            rightIconName={cCNumIcon}
            />
            <View style={styles.creditCardBottom}>
            <CardInput placeholder={'expiry date'} width={wp(147)} />
            <CardInput placeholder={'CVV'} width={wp(147)} />
            </View>
          </View>
          <View  style={styles.buttonTop}>
            <Text style={styles.buttonTopText}>Flog may charge a small amount to confirm you card details. This is immediately refunded</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button title={'Add Card'} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.blackBg,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(46),
  },
  creditCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(16)
  },
  buttonTop: {
    marginTop: hp(197),
    marginLeft: wp(26),
    marginRight: wp(30),
  },
  buttonTopText: {
    fontSize: wp(16),
    textAlign: 'left',
    color: colors.text.white,
    lineHeight: hp(18.75),
  },
  buttonContainer: {
    marginTop: hp(16),
  },
})

export default NewCard;
