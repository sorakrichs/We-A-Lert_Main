import React,{useEffect,useState} from 'react';
import {View,Alert} from 'react-native';
import MapView from './componant/MapView'
import mapRegis from './componant/misc/mapRegis'
import LoginNavigation from './componant/login/LoginNavigation'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthProvider,useAuth} from './providers/AuthProvider'
import {MapProvider} from './providers/MapProvider'
import {AlertProvider} from './providers/AlertProvider'
import {ReportProvider} from './providers/ReportProvider'
import {TrackingProvider} from './providers/TrackingProvider'

import Statistic from './componant/statistic/statisticNavigation';
import ReportStatistic from './componant/statistic/page/ReportStatistic';
import memberProfile from './componant/profile/Profile';
import memberRegis from './componant/register/RegisMemberMain'
import volunteerRegis from './componant/register/RegisVolunteer'
import Report from './componant/report/Report';
import ValidateReport from './componant/report/ValidateReport';
import ViewReport from './componant/report/ViewReport'
import searchSceen from './componant/map/SearchSceen'
import OrganizeProfile from './componant/profile/OrganizeProfile'
import ForgotPassword from './componant/forgot/ForgotPassword';
import PhoneCall from './componant/PhoneCall';
import Setting from './componant/SettingScreen';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import Manual from './componant/manual/Manual'

import * as Sentry from "@sentry/react-native";

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();
Sentry.init({
  dsn: "https://448cd95e467c4d5b9df88ab1475ff317@o1209167.ingest.sentry.io/6342603",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  beforeSend(event) {
    // Modify the event here
    if (event.user) {
      // Don't send user's email address
      delete event.user.email;
    }
    return event;
  },
  environment: "production",
  integrations: [
    new Sentry.ReactNativeTracing({
      // Pass instrumentation to be used as `routingInstrumentation`
      routingInstrumentation,
      beforeNavigate: context => {
        // Decide to not send a transaction by setting sampled = false
        if (context.data.route.name === "Do Not Send") {
          context.sampled = false;
        }

        // Modify the transaction context
        context.name = context.name.toUpperCase();
        context.tags = {
          ...context.tags,
          customTag: "value",
        };

        return context;
      },
    }),
  ],
});

Sentry.configureScope(function(scope) {
  scope.setLevel(Sentry.Severity.Warning);
});

const Stack = createStackNavigator();


const App = () => {

  const navigation = React.useRef();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer 
        ref={navigation}
        onReady={() => {
          // Register the navigation container with the instrumentation
          routingInstrumentation.registerNavigationContainer(navigation);
        }}>
          <AuthProvider>
            <MapProvider>
            <AlertProvider>
              <Stack.Navigator initialRouteName="Map" screenOptions={{headerShown: false }}>
                <Stack.Group>
                  <Stack.Screen name="Map">
                    {(props) => {
                          const { navigation, route } = props;
                          return (
                            <TrackingProvider>
                              <MapView navigation={navigation} route={route} />
                            </TrackingProvider>
                          );
                    }}
                  </Stack.Screen>
                  <Stack.Screen name="Login" component={LoginNavigation} />
                  <Stack.Screen name="MemberRegis" component={memberRegis} />
                  <Stack.Screen name="VolunteerRegis" component={volunteerRegis} />
                  <Stack.Screen name="Profile" component={memberProfile} />
                  <Stack.Screen name="OrganizeProfile" component={OrganizeProfile} />
                  <Stack.Screen name="Statistic">
                    {(props) => {
                        const { navigation, route } = props;
                        const {sessionRef} = useAuth();
                        return (
                            (sessionRef.current.role === 'guest' || !sessionRef.current.role) ? <ReportStatistic navigation={navigation} route={route} /> : <Statistic navigation={navigation} route={route} />
                        );
                    }}
                  </Stack.Screen>
                  <Stack.Screen name="MapRegis" component={mapRegis} />
                  <Stack.Screen name="Manual" component={Manual} />
                  <Stack.Screen name="Forgot" component={ForgotPassword}/>
                  <Stack.Screen name="Phone" component={PhoneCall}/>
                  <Stack.Screen name="Setting" component={Setting}/>
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen name="Search" component={searchSceen} />
                    <Stack.Screen name="Report">
                      {(props) => {
                        const { navigation, route } = props;
                        return (
                          <ReportProvider>
                            <Report navigation={navigation} route={route} />
                          </ReportProvider>
                        );
                      }}
                    </Stack.Screen>
                    <Stack.Screen name="ValidateReport">
                      {(props) => {
                        const { navigation, route } = props;
                        return (
                          <ReportProvider>
                            <ValidateReport navigation={navigation} route={route} />
                          </ReportProvider>
                        );
                      }}
                    </Stack.Screen>
                    <Stack.Screen name="ViewReport">
                      {(props) => {
                        const { navigation, route } = props;
                        return (
                          <ReportProvider>
                            <ViewReport navigation={navigation} route={route} />
                          </ReportProvider>
                        );
                      }}
                    </Stack.Screen>
                </Stack.Group>
              </Stack.Navigator>
              </AlertProvider>
            </MapProvider>
          </AuthProvider>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Sentry.withTouchEventBoundary(App);