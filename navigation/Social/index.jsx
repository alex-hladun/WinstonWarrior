import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import SocialHome from "./SocialHome";
import SocialPost from "./SocialPost";

export default function NavigationSocial({ colorScheme }) {
  return (
    <NavigationContainer independent={true}>
      <SocialNavigator />
    </NavigationContainer>
  );
}

// THIS IS NOT USED, ONLY IN BOTTOMTABNAVIGATOR
// THIS IS NOT USED, ONLY IN BOTTOMTABNAVIGATOR
// THIS IS NOT USED, ONLY IN BOTTOMTABNAVIGATOR
// THIS IS NOT USED, ONLY IN BOTTOMTABNAVIGATOR
// THIS IS NOT USED, ONLY IN BOTTOMTABNAVIGATOR
// THIS IS NOT USED, ONLY IN BOTTOMTABNAVIGATOR
// THIS IS NOT USED, ONLY IN BOTTOMTABNAVIGATOR

const SocialStack = createStackNavigator();

function SocialNavigator() {
  return (
    <SocialStack.Navigator
      screenOptions={{ headerShown: true, headerTransparent: true }}
    >
      <SocialStack.Screen name="Winstagram" component={SocialHome} />
      <SocialStack.Screen name="Post" component={SocialPost} />
    </SocialStack.Navigator>
  );
}
