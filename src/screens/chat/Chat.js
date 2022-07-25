import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {View, Text, StyleSheet, Platform, KeyboardAvoidingView} from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import ContentHeader from '../../components/ContentHeader';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import { hp } from '../../constants/dimension';
import { apiBaseUrl } from '../../constants/staticData';
import { getMessages, saveMessage, setMessages } from './actions/chat.action';

function Chat({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login.user);
  const chatState = useSelector(state => state.chat);
  const messages = useSelector(state => state.chat.messages);

  const socket = React.useMemo(() => io(apiBaseUrl), []);

  React.useEffect(() => {
    socket.emit('joinChatRoom', chatState.tripId)
    return () => {
      socket.disconnect()
    }
  }, [])
  
  console.log('re rendering..........')
  React.useEffect(() => {
    let data = {
      authorization: `bearer ${user.tokens.accessToken}`,
      tripId: chatState.tripId,
    }
    dispatch(getMessages(data));
  }, [])

  const customMessage = props => {
    return (
      <View style={{backgroundColor: colors.mainColor}}>
        <Text style={styles.ChatMessageSystemMessageText}>
          Your chat is secured. Remember to be cautious about what you share
          with others.
        </Text>
      </View>
    );
  };

  const customBubble = props => {
    return <Bubble {...props} 
      wrapperStyle={{
          left: {
            backgroundColor: colors.white,
          },
          right: {
            backgroundColor: colors.mainColor
          }
        }} 

      timeTextStyle={{
        left: {
          color: '#000',
        },
        right: {
          color: '#000',
        },
      }}
      textStyle={{
        left: {
          color: '#000',
        },
        right: {
          color: '#000',
        },
      }}
    />
  };

  const handleSendMesage = (msg) => {
    let msgData = {
      details: {
        tripId: chatState.tripId,
        userId: user.id,
        userName: user.fullName,
        text: msg[0].text
      }
    }
    dispatch(saveMessage(msgData))
    console.log('sending...................')
    // console.log(msg)
    let data = {
      msg,
      userName: user.fullName,
      trip_id: chatState.tripId,
      riderId: chatState.riderId,
      receiverId: chatState.userId,
    }
    socket.emit('chatMessage', data)
  }

  socket.on('chatMessage', (msg) => {
    let newMessages = [...msg, ...messages];
    dispatch(setMessages(newMessages))
    console.log('--------------------------')
    console.log(newMessages)
  })
 
  // const onSend = React.useCallback((messages = []) => {
  //   console.log(messages)
  //   setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  // }, [])
  return (
    <View style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: 'Chat', color: colors.text.white }}
      />
      <View style={styles.content}>
        <ContentHeader title={'Start a conversation'} fontSize={hp(18)} height={hp(80)} />
        <GiftedChat
          messages={messages}
          onSend={messages => handleSendMesage(messages)}
          renderAvatar={null}
          alwaysShowSend
          // renderMessage={(props) =>customMessage(props)}
          user={{
            _id: user.id,
          }}
          renderBubble={customBubble}
        />
        {/* {
          Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
        } */}
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
  content: {
    flex: 1,
    marginTop: hp(6),
  },
})

export default Chat;
