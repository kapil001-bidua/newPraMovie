import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  ScrollView,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import apiCall from '../../api/Api';
import Card from '../../components/UI/Card';
import Icon from 'react-native-vector-icons/AntDesign';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Toolbar from '../../components/UI/Toolbar';
import HeaderButton from '../../components/UI/HeaderButton';
import Like from '../../components/UI/like';
import Accordian from '../../components/UI/Accordian';
const movie = (props) => {
  const [data, setData] = useState('');

  const [logo, setlogo] = useState('star-o');
  const [favorite, setFavorite] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const saveFavourite = (data) => {
    favorite === false
      ? (setlogo(true), setFavorite('star'))
      : (setlogo(false), setFavorite('star-o'));
  };
  const getData = async () => {
    props
      .apiCall('https://api.jsonbin.io/b/5da98dd0120fad237297b2fd')
      .then(() => {
        const data = props.data;
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <Toolbar name="Customer " />
      <FlatList
        data={props.data}
        renderItem={({item}) => (
          <Card style={styles.product}>
            <View style={styles.touchable}>
              <TouchableOpacity useForeground>
                <View>
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.image}
                      source={{uri: item.profile_pic_url}}
                    />
                  </View>

                  <View style={styles.details}>
                    <Like />
                    <Text style={styles.title}>{item.full_name}</Text>
                    <Text style={styles.title}>{item.contact}</Text>
                    <Text style={styles.title}>{item.email_id}</Text>
                    <Text style={styles.title}>{item.membership_number}</Text>
                    <Text style={styles.title}>{item.address}</Text>
                    <Text style={styles.title}>{item.list_year}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.details}>
                <Accordian title={'designation'} data={item.designation} />
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Edit', {item})}
                style={{
                  backgroundColor: 'red',
                  width: '30%',
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: 'red',
                  height: '40%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Details', {item})}
                style={{
                  backgroundColor: 'red',
                  width: '30%',
                  height: '40%',
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Details
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
const mapDispatchToProps = (dispatch) => ({
  apiCall: (url) => dispatch(apiCall(url)),
});

const mapStateToProps = (state) => ({
  data: state.apiReducer.data,
  error: state.apiReducer.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(movie);

const styles = StyleSheet.create({
  product: {
    height: 450,
    width: '80%',
    margin: 35,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '65%',

    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    height: '15%',
    padding: 10,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 13,
    marginVertical: 2,
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20,
  },
});

/*
<Card style={styles.product}>
<View style={styles.touchable}>
  <TouchableOpacity onPress={props.onSelect} useForeground>
    <View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{uri: item.profile_pic_url}}
        />
      </View>

      <View style={styles.details}>
        <Like />
        <Text style={styles.title}>{item.full_name}</Text>

        <Text style={styles.title}>{item.email_id}</Text>
        <Text style={styles.title}>{item.contact}</Text>
        <Text style={styles.title}>{item.membership_number}</Text>
        <Text style={styles.title}>{item.address}</Text>
        <Text style={styles.title}>{item.list_year}</Text>
        <Accordian title={item.full_name} data={item.email_id} />
      </View>
    </View>
  </TouchableOpacity>
</View>
</Card>


*/
