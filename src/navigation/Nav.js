import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Dashboard from '../screens/Dashboard';

const LoginStack = createStackNavigator({
    Login: {
        screen: Login,
    },
    SignUp: {
        screen: SignUp
    }
});
const SwitchNavigator = createSwitchNavigator({
    Splash: {
        screen: Splash,
    },
    Login: {
        screen: LoginStack,
    },
    Dashboard: {
        screen: Dashboard,
    }
});
export default createAppContainer(SwitchNavigator);
