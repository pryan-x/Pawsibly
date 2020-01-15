import { createStackNavigator} from 'react-navigation-stack';
import Login from '../views/login/Login';
import ProfileSettings from '../views/ProfileSettings'

const AppNavigator = createStackNavigator({
  Login: { screen: Login },
  ProfileSettings: { screen: ProfileSettings}
});

export default AppNavigator;