import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import useColorScheme from "../hooks/useColorScheme";
import SocialScreen from "../screens/SocialScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import PlayScreen from "../screens/PlayScreen";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";
import { Theme } from "../assets/styles/Theme";
import GolfFlag from "../assets/svg/GolfFlag";
import ChartLogo from "../assets/svg/ChartLogo";
import SocialLogo from "../assets/svg/SocialLogo";
import SocialPost from "./Social/SocialPost";
import SocialComment from "./Social/SocialComment";
import SocialFollow from "./Social/SocialFollow";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Play"
      tabBarOptions={{ activeTintColor: Theme.spinGreen4 }}
    >
      <BottomTab.Screen
        name="Winsta"
        component={SocialNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <SocialLogo />
            // <GolfFlag name="ios-code" color={Theme.spinGreen1} />
          )
        }}
      />
      <BottomTab.Screen
        name="Play"
        component={PlayNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <GolfFlag name="ios-code" color={Theme.spinGreen1} />
          )
        }}
      />
      <BottomTab.Screen
        name="Stats"
        component={StatNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <ChartLogo name="ios-code" color={Theme.spinGreen1} />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const SocialStack = createStackNavigator<TabOneParamList>();

function SocialNavigator() {
  return (
    <SocialStack.Navigator>
      <SocialStack.Screen
        name="Winstagram"
        component={SocialScreen}
        options={({ navigation, route }) => ({
          headerTitle: "Winstagram",
          headerShown: true
        })}
      />
      <SocialStack.Screen
        name="Post"
        component={SocialPost}
        options={({ navigation, route }) => ({
          headerTitle: "Post",
          headerShown: true,
          headerStyle: {
            height: 100,
            backgroundColor: "#white",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 3
          }
        })}
      />
      <SocialStack.Screen
        name="Follow"
        component={SocialFollow}
        options={({ navigation, route }) => ({
          headerTitle: "Follow",
          headerShown: true,
          headerStyle: {
            height: 100,
            backgroundColor: "#white",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 3
          }
        })}
      />
      <SocialStack.Screen
        name="Comment"
        component={SocialComment}
        options={({ navigation, route }) => ({
          headerTitle: "Comment",
          headerShown: true,
          headerStyle: {
            height: 100,
            backgroundColor: "#white",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 3
          }
        })}
      />
    </SocialStack.Navigator>
  );
}

const StatStack = createStackNavigator<TabTwoParamList>();

function StatNavigator() {
  return (
    <StatStack.Navigator>
      <StatStack.Screen
        name="StatScreen"
        component={TabTwoScreen}
        options={({ navigation, route }) => ({
          headerTitle: "Stats",
          headerShown: true
        })}
      />
    </StatStack.Navigator>
  );
}

const PlayStack = createStackNavigator<TabTwoParamList>();

function PlayNavigator() {
  return (
    <PlayStack.Navigator>
      <PlayStack.Screen
        name="PlayScreen"
        component={PlayScreen}
        options={{
          headerTitle: "Play",
          headerShown: false,
          headerTransparent: true
        }}
      />
    </PlayStack.Navigator>
  );
}
