import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Play: {
            screens: {
              PlayScreen: 'two',
            },
          },
          Social: {
            screens: {
              SocialScreen: 'one',
            },
          },
          Stats: {
            screens: {
              TabTwoScreen: 'three',
            },
          },
        },
      },
      NotFound: '*',
    }
  },
};
