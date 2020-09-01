import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Text,
  CheckBox,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/AntDesign';
import HeaderButton from '../../components/UI/HeaderButton';
import {Avatar} from 'react-native-elements';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Toolbar from '../../components/UI/Toolbar';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isSelected, setSelection] = useState(false);
  const [icon, setIcon] = useState(
    Platform.OS === 'android' ? 'md-create' : 'ios-create',
  );
  const [isEditable, setEditable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [estado, setEstado] = useState(false);
  const [error, setError] = useState();
  const [check, setcheck] = useState(false);
  const [data, setData] = useState('');
  const [age, setAge] = useState('');
  const [imageSource, setImageSource] = useState(null);
  const [image, setImage] = useState(false);

  //const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      address: '',
      contact: '',
      full_name: '',
      email_id: '',
      list_year: '',
      designation: '',
      isEditable: false,
    },
    inputValidities: {
      address: false,
      contact: false,
      list_year: false,
      full_name: false,
      email_id: false,
      designation: false,
    },

    formIsValid: false,
  });

  const agregarFavoritos = () => {
    let action;
    const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (formState.inputValues.full_name == '') {
      setError(null);
      setIsLoading(true);
    } else if (formState.inputValues.list_year == '') {
      setError(null);
      setIsLoading(true);
    } else if (formState.inputValues.email_id == '') {
      setError(null);
      setIsLoading(true);
    } else if (formState.inputValues.address == '') {
      setError(null);
      setIsLoading(true);
    } else if (formState.inputValues.designation == '') {
      setError(null);
      setIsLoading(true);
    } else {
      try {
        props.navigation.navigate('Customers');
        console.log('knk');
        //  setEditable(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  function selectImage() {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      noData: true,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};

        // ADD THIS
        setImageSource(source.uri);
      }
    });
  }

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <Toolbar
        name={props.navigation.state.params.item.full_name}
        iconname="ios-arrow-back"
        icon={'md-checkmark'}
        onSelect={() => props.navigation.navigate('Customers')}
      />
      <View style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <View style={styles.logo}>
              <View>
                {imageSource === null ? (
                  <Avatar
                    rounded
                    size="xlarge"
                    resizeMode="contain"
                    source={{
                      uri: props.navigation.state.params.item.profile_pic_url,
                    }}
                  />
                ) : (
                  <Avatar
                    rounded
                    size="xlarge"
                    resizeMode="contain"
                    source={{uri: imageSource}}
                    resizeMode="contain"
                  />
                )}

                {!image && (
                  <TouchableOpacity
                    onPress={selectImage}
                    style={{
                      position: 'absolute',
                      right: 0,
                      borderRadius: 50,
                      width: 50,
                      height: 50,
                      shadowRadius: 8,
                      elevation: 5,
                      backgroundColor: '#FFF',
                      borderColor: 'white',
                      shadowColor: 'black',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                    }}>
                    <Icon name="camera" size={25} color={'red'} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <Text style={{marginTop: 10, fontSize: 20}}>Basic Info</Text>
            <View>
              <Input
                id="full_name"
                label="First Name"
                autoCapitalize="none"
                required
                errorText="Please enter a valid first name."
                onInputChange={inputChangeHandler}
                initialValue={props.navigation.state.params.item.full_name}
                editable={isEditable}
              />

              <Input
                id="email_id"
                label="Email"
                editable={isEditable}
                required
                email
                autoCapitalize="none"
                errorText="Please enter a valid email."
                onInputChange={inputChangeHandler}
                initialValue={props.navigation.state.params.item.email_id}
              />
              <Input
                id="contact"
                label="Phone"
                keyboardType="number-pad"
                required
                mobile
                autoCapitalize="none"
                errorText="Please enter a valid mobile number."
                onInputChange={inputChangeHandler}
                initialValue={props.navigation.state.params.item.contact}
              />
              <Input
                id="address"
                label="Address"
                required
                editable={isEditable}
                autoCapitalize="none"
                errorText="Please enter a valid address."
                onInputChange={inputChangeHandler}
                initialValue={props.navigation.state.params.item.address}
              />
              <Input
                id="list_year"
                label="Year"
                required
                editable={isEditable}
                autoCapitalize="none"
                errorText="Please enter a valid Year."
                onInputChange={inputChangeHandler}
                initialValue={props.navigation.state.params.item.list_year}
              />
              <Input
                id="designation"
                label="Designation"
                required
                editable={isEditable}
                autoCapitalize="none"
                errorText="Please enter a valid address."
                onInputChange={inputChangeHandler}
                initialValue={props.navigation.state.params.item.designation}
              />
            </View>
          </ScrollView>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  gradient: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  authContainer: {
    width: '90%',
    maxWidth: 400,
    maxHeight: '100%',
    padding: 20,
    marginTop: 10,
  },

  buttonContainer: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    color: 'red',
    fontSize: 13,
  },
  headerStyle: {
    resizeMode: 'cover',
    width: 150,
    height: 150,
  },
  containerSideMenu: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default AuthScreen;
