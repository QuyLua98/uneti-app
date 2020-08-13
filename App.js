import * as React from 'react';
import {StyleSheet} from 'react-native';
import {SplashScreen} from 'expo';
import * as Font from 'expo-font';
import * as encoding from 'text-encoding';
import {Ionicons} from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import LeftDrawerNavigator from './navigation/LeftDrawerNavigator';
import {Container} from 'native-base';
import {Provider} from 'react-redux';
import store from "./store";

export default function App(props) {
    console.disableYellowBox = true
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);
    const containerRef = React.useRef();

    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHide();

                await Font.loadAsync({
                    'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
                    'Roboto': require('native-base/Fonts/Roboto.ttf'),
                    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
                    ...Ionicons.font,
                });
            } catch (e) {
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                SplashScreen.hide();
            }
        }

        loadResourcesAndDataAsync().then();
    }, []);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return null;
    } else {
        return (
            <Provider store={store}>
                <Container style={styles.container}>
                    <NavigationContainer ref={containerRef}>
                        <LeftDrawerNavigator />
                    </NavigationContainer>
                </Container>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: '#5262af',
    },
    container: {
        flex: 1,
    },
    menuButton: {
        marginLeft: 10,
    }
});
