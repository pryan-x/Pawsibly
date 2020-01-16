import { createStackNavigator } from 'react-navigation-stack';

import Home from '../views/Home'
import ProfileSettings from '../views/ProfileSettings'
import FilterSearch from '../views/FilterSearch'

const HomeStack = createStackNavigator({
  Home: { screen: Home },
  FilterSearch: { screen: FilterSearch },
  ProfileSettings: { screen: ProfileSettings},
  // UserList: { screen: UserList },
  // DogList: { screen: DogList }

},
{
  initialRouteName: "Home"
}
);

export default HomeStack;