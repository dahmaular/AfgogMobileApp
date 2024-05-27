import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {primary, secondary, white} from '@/theme/colorPatte';
import Spacer from '@/components/layout/Spacer';
import Header from '@/components/Header';
import {Formik, FormikHelpers} from 'formik';
import Button from '@/components/Button/button';
import {addPropertyValidationSchema} from '@/utils/tab-validations';
import CustomInput from '@/components/layout/CustomInput';
import ErrorText from '@/components/typography/ErrorText';
import {categories} from './index';
import {Icon} from '@/assets/svg/Icon';
import {useCreatePropertyMutation} from '@/services/property/service';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';
import CustomText from '@/components/typography/CustomText';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {FileType} from '@/utils/tab-types';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import {PropertyHomeNavigationProps} from '@/navigation/types';

const {width, height} = Dimensions.get('window');

type CountProps = {
  room: string;
  bath: string;
  sitting: string;
};

const AddProperty = ({
  navigation,
}: PropertyHomeNavigationProps<'Apartment'>) => {
  const initialValues = {
    title: '',
    description: '',
    houseType: '',
    address: '',
    size: '',
    model: '',
    carYear: '',
  };

  const [createProperty, {isLoading}] = useCreatePropertyMutation();

  const agent = useSelector((state: RootState) => state.user.authData);
  const [roomCount, setRoomCount] = useState<number>(0);
  const [bathCount, setBathCount] = useState<number>(0);
  const [sittingRoomCount, setSittingRoomCount] = useState<number>(0);
  const [showPickerModal, setShowPickerModal] = useState<boolean>(false);
  const [image, setImage] = useState([]);
  const [imgUrl, setImgUrl] = useState<[]>([]);
  const [successModal, setShowSuccessModal] = useState<boolean>(false);
  const [failureModal, setShowFailureModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [mainImage, setMainImage] = useState<FileType>({
    type: '',
    base64: '',
    fileName: '',
    isEmpty: false,
    uri: '',
  });
  const [otherImage1, setOtherImage1] = useState<FileType>({
    type: '',
    base64: '',
    fileName: '',
    isEmpty: false,
    uri: '',
  });
  const [otherImage2, setOtherImage2] = useState<FileType>({
    type: '',
    base64: '',
    fileName: '',
    isEmpty: false,
    uri: '',
  });
  const [otherImage3, setOtherImage3] = useState<FileType>({
    type: '',
    base64: '',
    fileName: '',
    isEmpty: false,
    uri: '',
  });
  const [otherImage4, setOtherImage4] = useState<FileType>({
    type: '',
    base64: '',
    fileName: '',
    isEmpty: false,
    uri: '',
  });

  const [docType, setDocType] = useState<string>('');
  const [mainImageUrl, setMainImageUrl] = useState<string>('');
  const [propTypeId, setPropTypeId] = useState<number>();
  const [propType, setPropType] = useState<string>('');

  const increaseCounter = (item: CountProps) => {
    switch (item) {
      case 'room':
        setRoomCount(roomCount + 1);
        break;
      case 'bath':
        setBathCount(bathCount + 1);
        break;
      case 'sitting':
        setSittingRoomCount(sittingRoomCount + 1);
        break;
      default:
        return null;
    }
  };

  const decreaseCounter = (props: CountProps) => {
    switch (props) {
      case 'room':
        setRoomCount(roomCount > 0 ? roomCount - 1 : 0);
        break;
      case 'bath':
        setBathCount(bathCount > 0 ? bathCount - 1 : 0);
        break;
      case 'sitting':
        setSittingRoomCount(sittingRoomCount > 0 ? sittingRoomCount - 1 : 0);
        break;
      default:
        return null;
    }
  };

  console.log('img', image);
  console.log('manin', mainImageUrl);

  const uploadImage = async (response: ImagePickerResponse, type: string) => {
    const {uri} = response.assets[0];
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    try {
      const imageRef = storage().ref(`property/${filename}`);
      await imageRef.putFile(uploadUri, {contentType: 'image/jpg'});
      const url = await imageRef.getDownloadURL();

      console.log('ulr', url);
      if (type === 'mainImage') {
        setMainImageUrl(url);
      } else {
        setImage(img => [...img, url]);
      }
      return url;
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (type: string) => {
    console.log('Id upload');
    let options = {
      // cameraType: 'back',
      mediaType: 'photo',
      quality: 0.5,
      includeBase64: true,
      // maxWidth: 500,
      // maxHeight: 500,
    };
    type === 'library' &&
      launchImageLibrary(
        {mediaType: 'photo', quality: 0.5, includeBase64: true},
        response => {
          if (response.didCancel) {
          } else if (response.didCancel) {
          } else {
            switch (docType) {
              case 'main':
                console.log('main upload', response.assets[0].uri);

                setMainImage({
                  uri: response.assets![0].uri,
                  base64: response.assets![0].base64,
                  type: response.assets![0].type!,
                  fileName: response.assets![0].fileName,
                });
                uploadImage(response, 'mainImage');
                break;
              case 'others1':
                setOtherImage1({
                  uri: response.assets![0].uri,
                  base64: response.assets![0].base64,
                  type: response.assets![0].type!,
                  fileName: response.assets![0].fileName,
                });
                uploadImage(response, 'others1');
                break;
              case 'others2':
                setOtherImage2({
                  uri: response.assets![0].uri,
                  base64: response.assets![0].base64,
                  type: response.assets![0].type!,
                  fileName: response.assets![0].fileName,
                });
                uploadImage(response, 'others2');
                break;
              case 'others3':
                setOtherImage3({
                  uri: response.assets![0].uri,
                  base64: response.assets![0].base64,
                  type: response.assets![0].type!,
                  fileName: response.assets![0].fileName,
                });
                uploadImage(response, 'others3');
                break;
              case 'others4':
                setOtherImage4({
                  uri: response.assets![0].uri,
                  base64: response.assets![0].base64,
                  type: response.assets![0].type!,
                  fileName: response.assets![0].fileName,
                });
                uploadImage(response, 'others4');
                break;
            }
          }
        },
      );
    type === 'capture' &&
      launchCamera(
        {
          saveToPhotos: false,
          cameraType: 'back',
          mediaType: 'photo',
        },
        response => {
          if (response.didCancel) {
          } else if (response.errorCode) {
          } else {
            switch (docType) {
              case 'main':
                console.log('main upload', response.assets[0].uri);

                setMainImage({
                  uri: response.assets![0].uri,
                  base64: response.assets![0].base64,
                  type: response.assets![0].type!,
                  fileName: response.assets![0].fileName,
                });
                uploadImage(response, 'mainImage');
                break;
              case 'others1':
                setOtherImage1({
                  uri: response.assets![0].uri,
                  base64: response.assets![0].base64,
                  type: response.assets![0].type!,
                  fileName: response.assets![0].fileName,
                });
                uploadImage(response, 'others1');
                break;
              case 'others2':
                setOtherImage2({
                  uri: response.assets![0].uri,
                  base64: response.assets![0].base64,
                  type: response.assets![0].type!,
                  fileName: response.assets![0].fileName,
                });
                uploadImage(response, 'others2');
                break;
              case 'others3':
                setOtherImage3({
                  uri: response.assets![0].uri,
                  base64: response.assets![0].base64,
                  type: response.assets![0].type!,
                  fileName: response.assets![0].fileName,
                });
                uploadImage(response, 'others3');
                break;
              case 'others4':
                setOtherImage4({
                  uri: response.assets![0].uri,
                  base64: response.assets![0].base64,
                  type: response.assets![0].type!,
                  fileName: response.assets![0].fileName,
                });
                uploadImage(response, 'others4');
                break;
            }
          }
        },
      );
    // } catch (error) {
    //   console.log('libraryError', error);
    // }
  };

  const handleOnSubmit = async (
    values: typeof initialValues,
    {setSubmitting}: FormikHelpers<typeof initialValues>,
  ) => {
    setSubmitting(true);
    console.log('value', values, roomCount);
    try {
      const propData = {
        address: values.address,
        agentId: agent._id,
        categoryId: '64d78670d66e8ea17943de2b',
        title: values.title,
        bathroom: bathCount.toString(),
        bedroom: roomCount.toString(),
        description: values.description,
        price: '200000',
        mainImage: mainImageUrl,
        images: image,
        carModel: values.model,
        carYear: values.carYear,
        type: propType,
      };
      console.log('proRequest', propData);
      const dataConst = await createProperty(propData).unwrap();

      if (dataConst.isSuccess) {
        setMessage(dataConst.message);
        setShowSuccessModal(true);
      } else {
        setMessage(dataConst.message);
        setShowFailureModal(true);
      }
      console.log('create', dataConst);
    } catch (error) {
      console.log('err', error);
      //   setMessage(dataConst.message);
      setShowFailureModal(true);
      throw error;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spacer size={20} />
      <Header hasBackIcon title="Add Property" />
      <Spacer size={20} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Formik
            validationSchema={addPropertyValidationSchema}
            initialValues={initialValues}
            onSubmit={handleOnSubmit}>
            {formikProps => (
              <>
                <Spacer size={30} />
                <View>
                  <View>
                    <CustomInput
                      placeholder="Title"
                      placeholderTextColor="#00000066"
                      value={formikProps.values.title}
                      onChangeText={formikProps.handleChange('title')}
                      returnKeyType="next"
                      style={styles.inputs}
                    />
                    <ErrorText
                      error={formikProps.errors.title}
                      touched={formikProps.touched.title}
                    />
                  </View>
                </View>
                <Spacer size={20} />
                <View style={styles.descriptionView}>
                  <TextInput
                    multiline
                    value={formikProps.values.description}
                    onChangeText={formikProps.handleChange('description')}
                    numberOfLines={5}
                    scrollEnabled
                    textAlignVertical="top"
                    placeholder="Description"
                    placeholderTextColor="#00000066"
                    style={styles.inputs}
                  />
                </View>
                <Spacer size={20} />
                <View>
                  <Text style={styles.inputs}>Property Type</Text>
                  <Spacer size={20} />
                  <View style={styles.category}>
                    {categories.map(category => (
                      <View
                        style={{
                          paddingHorizontal: 7,
                          padding: 3,
                          borderRadius: 60,
                          borderWidth: 0.5,
                          borderColor: primary,
                          marginHorizontal: 5,
                          backgroundColor:
                            category.id === propTypeId ? primary : white,
                        }}
                        key={category.id}>
                        <TouchableOpacity
                          onPress={() => {
                            setPropTypeId(category.id),
                              setPropType(category.title);
                          }}>
                          <Text
                            style={[
                              styles.catText,
                              {
                                color:
                                  category.id === propTypeId ? white : '#000',
                              },
                            ]}>
                            {category.title}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>
                <Spacer size={20} />
                {/* <View>
                  <Text style={styles.inputs}>Action:</Text>
                </View>
                <Spacer size={20} /> */}
                {propTypeId === 1 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View style={{alignItems: 'center', width: '35%'}}>
                      <Text style={styles.inputs}>Rooms</Text>
                      <Spacer size={10} />
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableWithoutFeedback
                          onPress={() => decreaseCounter('room')}>
                          <Icon name="chevronDown" />
                        </TouchableWithoutFeedback>
                        <Spacer size={5} />
                        <Text style={styles.catText}>{roomCount}</Text>
                        <Spacer size={5} />

                        <TouchableWithoutFeedback
                          onPress={() => increaseCounter('room')}>
                          <Icon name="chevronUp" />
                        </TouchableWithoutFeedback>
                      </View>
                    </View>
                    <Spacer size={5} />
                    <View style={{alignItems: 'center', width: '35%'}}>
                      <Text style={styles.inputs}>Bathrooms</Text>
                      <Spacer size={10} />
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableWithoutFeedback
                          onPress={() => decreaseCounter('bath')}>
                          <Icon name="chevronDown" />
                        </TouchableWithoutFeedback>
                        <Spacer size={5} />
                        <Text style={styles.catText}>{bathCount}</Text>
                        <Spacer size={5} />
                        <TouchableWithoutFeedback
                          onPress={() => increaseCounter('bath')}>
                          <Icon name="chevronUp" />
                        </TouchableWithoutFeedback>
                      </View>
                    </View>
                    <Spacer size={5} />
                    <View style={{alignItems: 'center', width: '35%'}}>
                      <Text style={styles.inputs}>Sitting Rooms</Text>
                      <Spacer size={10} />
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableWithoutFeedback
                          onPress={() => decreaseCounter('sitting')}>
                          <Icon name="chevronDown" />
                        </TouchableWithoutFeedback>
                        <Spacer size={5} />
                        <Text style={styles.catText}>{sittingRoomCount}</Text>
                        <Spacer size={5} />
                        <TouchableWithoutFeedback
                          onPress={() => increaseCounter('sitting')}>
                          <Icon name="chevronUp" />
                        </TouchableWithoutFeedback>
                      </View>
                    </View>
                  </View>
                )}
                {propTypeId === 2 && (
                  <>
                    <View>
                      <Text style={styles.inputs}>
                        Land size (in square meter):
                      </Text>
                    </View>
                    <Spacer size={10} />
                    <CustomInput
                      placeholder="1000 sqm"
                      placeholderTextColor="#00000066"
                      value={formikProps.values.size}
                      onChangeText={formikProps.handleChange('size')}
                      returnKeyType="next"
                      style={styles.inputs}
                    />
                    <Spacer size={20} />
                  </>
                )}
                {propTypeId === 3 && (
                  <>
                    <View>
                      <Text style={styles.inputs}>Car Model:</Text>
                    </View>
                    <Spacer size={10} />
                    <CustomInput
                      placeholder="Toyota Corolla"
                      placeholderTextColor="#00000066"
                      value={formikProps.values.model}
                      onChangeText={formikProps.handleChange('model')}
                      returnKeyType="next"
                      style={styles.inputs}
                    />
                    <Spacer size={10} />
                    <CustomInput
                      placeholder="2020"
                      placeholderTextColor="#00000066"
                      value={formikProps.values.carYear}
                      onChangeText={formikProps.handleChange('carYear')}
                      returnKeyType="next"
                      style={styles.inputs}
                    />
                    <Spacer size={20} />
                  </>
                )}
                <Spacer size={30} />
                <View>
                  <View>
                    <CustomInput
                      placeholder="Address"
                      placeholderTextColor="#00000066"
                      value={formikProps.values.address}
                      onChangeText={formikProps.handleChange('address')}
                      returnKeyType="next"
                      style={styles.inputs}
                    />
                    <ErrorText
                      error={formikProps.errors.address}
                      touched={formikProps.touched.address}
                    />
                  </View>
                </View>
                <Spacer size={20} />
                <Text style={styles.inputs}>
                  Upload Property Picture ( Max 8 photos)
                </Text>
                <Spacer size={20} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <View style={styles.image}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setDocType('main'), setShowPickerModal(true);
                      }}>
                      {mainImage.uri ? (
                        <Image
                          source={{uri: mainImage.uri}}
                          style={{width: '100%', height: 170, borderRadius: 10}}
                        />
                      ) : (
                        <Icon name="imagePlaceholder" />
                      )}
                    </TouchableWithoutFeedback>
                    <Spacer size={5} />
                  </View>
                  <Spacer size={10} />
                  <View>
                    <View style={[styles.image, {width: 94, height: 82}]}>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          setDocType('others1'), setShowPickerModal(true);
                        }}>
                        {otherImage1.uri ? (
                          <Image
                            source={{uri: otherImage1.uri}}
                            style={{
                              width: '100%',
                              height: 82,
                              borderRadius: 10,
                            }}
                          />
                        ) : (
                          <Icon name="imagePlaceholder" />
                        )}
                      </TouchableWithoutFeedback>
                    </View>
                    <Spacer size={5} />
                    <View style={[styles.image, {width: 94, height: 82}]}>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          setDocType('others2'), setShowPickerModal(true);
                        }}>
                        {otherImage2.uri ? (
                          <Image
                            source={{uri: otherImage2.uri}}
                            style={{
                              width: '100%',
                              height: 82,
                              borderRadius: 10,
                            }}
                          />
                        ) : (
                          <Icon name="imagePlaceholder" />
                        )}
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                  <Spacer size={5} />
                  <View>
                    <View style={[styles.image, {width: 94, height: 82}]}>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          setDocType('others3'), setShowPickerModal(true);
                        }}>
                        {otherImage3.uri ? (
                          <Image
                            source={{uri: otherImage3.uri}}
                            style={{
                              width: '100%',
                              height: 82,
                              borderRadius: 10,
                            }}
                          />
                        ) : (
                          <Icon name="imagePlaceholder" />
                        )}
                      </TouchableWithoutFeedback>
                    </View>
                    <Spacer size={5} />
                    <View style={[styles.image, {width: 94, height: 82}]}>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          setDocType('others4'), setShowPickerModal(true);
                        }}>
                        {otherImage4.uri ? (
                          <Image
                            source={{uri: otherImage4.uri}}
                            style={{
                              width: '100%',
                              height: 82,
                              borderRadius: 10,
                            }}
                          />
                        ) : (
                          <Icon name="imagePlaceholder" />
                        )}
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                </View>
                <Spacer size={50} />
                <View>
                  <View style={{width: '90%', alignSelf: 'center'}}>
                    <Button
                      onPress={formikProps.submitForm}
                      text="Submit"
                      bgColor={primary}
                      containerStyle={{backgroundColor: primary}}
                      loading={isLoading}
                    />
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
        <Spacer size={300} />
        <Modal
          animationType="slide"
          transparent={true}
          visible={showPickerModal}>
          <View style={styles.modal}>
            <View>
              <View style={styles.modalBody}>
                <View style={styles.modalTitle}>
                  <View>
                    <CustomText style={styles.ModalTitleText}>
                      Choose Image type
                    </CustomText>
                  </View>
                  <Spacer size={10} />
                </View>
                <Spacer size={30} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '70%',
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: primary,
                      width: '50%',
                      height: 40,
                      alignItems: 'center',
                      borderRadius: 10,
                    }}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        handleUpload('library'), setShowPickerModal(false);
                      }}>
                      <Text style={styles.imageTypeText}>Library</Text>
                    </TouchableWithoutFeedback>
                  </View>
                  <Spacer size={20} />
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: secondary,
                      width: '50%',
                      height: 40,
                      alignItems: 'center',
                      borderRadius: 10,
                    }}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        handleUpload('camera'), setShowPickerModal(false);
                      }}>
                      <Text style={styles.imageTypeText}>Camera</Text>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <Modal transparent visible={successModal}>
          <View style={styles.modalView}>
            <View
              style={{
                backgroundColor: 'white',
                height: 300,
                margin: 25,
                width: '80%',
                borderRadius: 15,
                padding: 22,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <TouchableWithoutFeedback>
                  <Icon name="close" />
                </TouchableWithoutFeedback>
              </View>
              <Spacer size={30} />
              <View style={{alignItems: 'center'}}>
                <View>
                  <Icon
                    name="statement-success"
                    color="white"
                    width={60}
                    height={60}
                  />
                </View>
                <Spacer size={30} />
                <CustomText style={{color: '#000'}}>{message}</CustomText>
                <Spacer size={20} />
                <View style={{alignItems: 'center'}}>
                  <View style={{width: '90%', justifyContent: 'center'}}>
                    <Button
                      onPress={() => {
                        setShowSuccessModal(false),
                          navigation.navigate('HomeScreen');
                      }}
                      text="Ok, got it"
                      bgColor={primary}
                      containerStyle={{backgroundColor: primary}}
                      //   loading={isLoading}
                    />
                  </View>
                </View>
              </View>
              <Spacer size={14} />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProperty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    // height: Dimensions.get('window').height,
  },
  descriptionView: {
    width: '100%',
    backgroundColor: white,
    height: '25%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
  },
  inputs: {
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'AirbnbCereal_W_Bk',
    // height: '40%',
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  image: {
    backgroundColor: white,
    borderRadius: 10,
    width: '40%',
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    width: '100%',
    height: 50,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBody: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '80%',
    height: height / 4.5,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    // marginTop: height / 4,
    // marginVertical: 20,
    alignItems: 'center',
  },
  ModalTitleText: {
    fontFamily: 'AirbnbCereal_W_Bd',
    color: '#000',
    lineHeight: 22,
    fontWeight: '600',
    // marginTop: 10,
    fontSize: 18,
  },
  imageTypeText: {
    fontFamily: 'AirbnbCereal_W_Bd',
    color: '#fff',
    lineHeight: 22,
    fontWeight: '400',
    // marginTop: 10,
    fontSize: 14,
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  catText: {
    fontFamily: 'AirbnbCereal_W_Md',
    color: '#000000',
    fontSize: 13,
    fontWeight: '500',
  },
});
