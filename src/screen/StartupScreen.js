//Import React and Hooks we needed
import React from 'react';
import {ActivityIndicator, View, StyleSheet, Image, Text} from 'react-native';

class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve('result');
      }, 1000),
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.replace('Login');
    }
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <Text style={styles.textStyles}>Quantum</Text>
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
};

export default SplashScreen;
