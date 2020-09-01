import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  Button,
  Picker,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import Colors from '../../constants/Colors';
import {connect} from 'react-redux';
import {Avatar} from 'react-native-elements';
import Tab from '../../components/UI/tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toolbar from '../../components/UI/Toolbar';
const ProductDetailScreen = (props) => {
  const [isAdd, setAdd] = useState(true);
  const [isRemove, setRemove] = useState(false);
  const [favorite, setfavorite] = useState(false);
  const [isCount, setcount] = useState(1);
  const [images, setImages] = useState([]);
  const [data, setData] = useState('');
  const [checkApp, setcheckApp] = useState(false);
  const [checkCount, secheckCounta] = useState(true);
  const [top_products, setTop_products] = useState('');
  const [offers, setoffers] = useState([]);
  const [selectedValue, setSelectedValue] = useState('kg');

  const dispatch = useDispatch();

  return (
    <View>
      <Toolbar
        name={props.navigation.state.params.item.full_name}
        iconname="ios-arrow-back"
      />
      <ScrollView>
        <View style={{flex: 1}}>
          <View
            style={{
              padding: 10,
              backgroundColor: 'white',
            }}>
            <Avatar
              rounded
              size="xlarge"
              resizeMode="contain"
              source={{
                uri: props.navigation.state.params.item.profile_pic_url,
              }}
            />
            <View>
              <View style={{backgroundColor: 'white'}}>
                <View style={styles.actions}>
                  <View>
                    <Text style={styles.title}>
                      {props.navigation.state.params.item.full_name}
                    </Text>
                    <Text style={styles.price}>
                      {props.navigation.state.params.item.contact}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                      {props.navigation.state.params.item.email_id}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 14,
                      }}>
                      {props.navigation.state.params.item.address}
                    </Text>
                    <Text>{props.navigation.state.params.item.list_year}</Text>

                    <View style={{flexDirection: 'row'}}>
                      <Text>
                        {props.navigation.state.params.item.membership_number}
                      </Text>
                    </View>
                  </View>
                  <View></View>
                </View>
              </View>
            </View>
          </View>

          <View style={{marginTop: 10, backgroundColor: 'white', height: 200}}>
            <Tab
              Description={props.navigation.state.params.item.designation}
              Description2={props.navigation.state.params.item.designation}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    marginVertical: 10,
    justifyContent: 'space-between',
    margin: 10,
    flexDirection: 'row',
  },
  price: {
    fontSize: 15,
    color: 'black',
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    marginLeft: 10,

    textAlign: 'center',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 15,

    color: 'black',
  },
  Highlight: {
    fontSize: 18,
    color: 'black',
  },
  info: {
    fontSize: 18,

    marginLeft: 10,
  },
});

export default ProductDetailScreen;
