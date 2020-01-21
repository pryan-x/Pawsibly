import { createStackNavigator } from 'react-navigation-stack';
import React from 'react'
import Home from '../views/Home'
import ProfileSettings from '../views/ProfileSettings'
import FilterSearch from '../views/FilterSearch'
import DogList from '../views/DogList'
import LogoTitle from '../components/shared/LogoTitle'

const HomeStack = createStackNavigator({
  Home: { screen: Home },
  FilterSearch: { screen: FilterSearch },
  ProfileSettings: { screen: ProfileSettings },
  // UserList: { screen: UserList },
  DogList: { screen: DogList }

},
  {
    initialRouteName: "Home",
    defaultNavigationOptions: () => ({
      headerTitle: <LogoTitle />,
      headerStyle: {
        backgroundColor: '#F4F0FF',
      },
    }),
  },


);

export default HomeStack;