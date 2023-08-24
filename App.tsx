import * as React from 'react';
import {
  Button,
  StyleSheet,
  Image,
  View,
  Text,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import Disc from './discount/disbanner';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';

function DetailsScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <>
        <View style={styles.container}>
          <View style={styles.topSection}>
            <View style={styles.logoContainer}>
              <Image
                source={{uri: 'https://reactjs.org/logo-og.png'}}
                style={styles.logo}
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>مطعم</Text>
              <Text style={styles.subtitle}>.........</Text>
            </View>
          </View>
          <View style={styles.bottomSection}>
            <View style={styles.infoRow}>
              <Text style={[styles.infoValue, {color: '#e06666'}]}> %10</Text>
              <Text style={styles.infoLabel}>نسبة الخصم:</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoValue}>14</Text>
              <Text style={styles.infoLabel}>تاريخ الانتهاء:</Text>
            </View>
          </View>
        </View>
      </>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  React.useEffect(() => {
    requestNotificationPermission();
  }, []);
  const requestNotificationPermission = async () => {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Disc" component={Disc} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20,
    borderWidth: 1,
    width: 300,
  },
  header: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ecf0f1',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#12355a',
  },
  infoContainer: {
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 20,
    margin: 6,
    borderRadius: 4,
    writingDirection: 'rtl',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginRight: 20,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#12355a',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#d3dae3',
  },
  bottomSection: {
    marginTop: 20,
    textAlign: 'right',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,

    marginRight: 5,
    marginLeft: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#0693E3',
    textDecorationLine: 'underline',
  },
});
