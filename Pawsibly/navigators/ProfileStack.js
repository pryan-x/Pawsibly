import { createStackNavigator } from 'react-navigation-stack';

import ProfileSettings from '../views/ProfileSettings'

const ProfileStack = createStackNavigator({

  ProfileSettings: { screen: ProfileSettings}
},
{
  initialRouteName: "ProfileSettings"
}
);

export default ProfileStack;