import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  LayoutAnimation,
  Platform,
  Alert,
} from 'react-native';
import axios from 'axios';

import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from '../UI/Card';
import Colors from '../../constants/Colors';
import {add} from 'lodash';
class like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRemove: false,
      favorite: false,
    };
  }

  componentWillMount() {
    const {favorite} = this.props;
    this.setState({favorite});
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  render() {
    const {favorite} = this.state;

    return (
      <TouchableOpacity>
        <Icon
          name={favorite ? 'heart' : 'heart-o'}
          color={favorite ? '#F44336' : 'rgb(50, 50, 50)'}
          size={22}
          onPress={() => this.setState({favorite: !favorite})}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  product: {
    height: 150,
    margin: 5,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '35%',
    height: '80%',
    margin: 10,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
  },
  details: {
    marginLeft: 10,
    marginTop: 5,
    height: '10%',
    width: '100%',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 15,
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 13,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: 10,
  },
});

export default like;
