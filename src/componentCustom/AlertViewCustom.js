import React from 'react';
import {Modal, View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const AlertView = () => {
  const [alertVisible, setAlertVisible] = React.useState(true);
  return (
    <View
      style={{
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      }}>
      <Modal animationType="slide" visible={alertVisible} transparent={true}>
        <View
          style={{
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <Text>aaaaaaaaa</Text>
        </View>
      </Modal>
    </View>
  );
};
export default AlertView;
const styles = StyleSheet.create({
  centerView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flex: 1,
  },
  modalView: {
    width: '80%',
    margin: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
  },
});
