import React, { useEffect, useRef, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Camera, CameraType } from 'expo-camera';

import { Container, ContainerButtonCam, } from '../Container/StyleContainer';
import { Button, ButtonFlip, ButtonPhoto } from '../Button/Button';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { Alert, Image, Modal, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LastPhoto } from './StyleCam';
//para acessar a galeria do celular
import * as ImagePicker from 'expo-image-picker'

export default function Cam({
    visible,
    getMediaLibrary = false,
    setUriPhoto,
    setUriPhotoForm,
    setShowCam,
    setShowCamForm,
    showCamForm,
    ...rest }) {
    const camRef = useRef(null);
    const [typeCam, setTypeCam] = useState(Camera.Constants.Type.front);
    // Estado para armazenar a foto capturada
    const [photo, setPhoto] = useState(null)
    const [capturePhoto, setCapturePhoto] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [lastestPhoto, setLatestPhoto] = useState(null)


    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
            const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
        })();
    }, []);

    useEffect(() => {
        setCapturePhoto(null)

        if (getMediaLibrary) {
            GetLastPhoto();
        }
    }, [visible])

    async function GetLastPhoto() {
        const { assets } = await MediaLibrary.getAssetsAsync({ sortBy: [[MediaLibrary.SortBy.creationTime, false]], first: 1 })
        // console.log(assets);
        if (assets.length > 0) {
            setLatestPhoto(assets[0].uri)
        }
    }

    // Função assíncrona para capturar a foto
    async function CapturePhoto() {
        if (camRef) {
            const photo = await camRef.current.takePictureAsync();
            setCapturePhoto(photo.uri)
            setPhoto(photo.uri)
        }
    }


    // Função assíncrona para limpar a foto
    async function ClearPhoto() {
        setPhoto(null)
    }

    // Função assíncrona para salvar a foto na galeria
    async function SavePhoto() {
        // if (photo) {
        //     await MediaLibrary.createAssetAsync(photo)
        //         .then(() => { Alert.alert('Sucesso', 'Foto salva na galeria') })
        //         .catch(Error => { Alert.alert('Erro', 'Foto não foi salva') })
        //     setOpenModal(false)
        // }
        if (showCamForm) {
            setUriPhotoForm(photo)
            setPhoto(null)
            setShowCamForm(false)
        }
        else {
            setUriPhoto(photo);
            setPhoto(null)
            setShowCam(false) // Fecha o modal inteiro
        }
    }

    async function SelectImageGallery() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }


    }



    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            statusBarTranslucent={true}
            getMediaLibrary={true}
        >


            <Camera
                ref={camRef}
                type={typeCam}
                style={{ flex: 1, justifyContent: 'flex-end', }}
            >

                <ContainerButtonCam>
                    {/* Botão para capturar a foto */}
                    <ButtonFlip onPress={() => CapturePhoto()}>
                        <FontAwesome name='camera' size={30} color={'#FFF'} />
                    </ButtonFlip>

                    <ButtonFlip onPress={() => setTypeCam(typeCam == CameraType.front ? CameraType.back : CameraType.front)}>
                        <MaterialCommunityIcons name='camera-flip' color={'#FFF'} size={40} />
                    </ButtonFlip>
                    <ButtonFlip onPress={() => SelectImageGallery()}>
                        {
                            lastestPhoto != null
                                ? (
                                    <LastPhoto
                                        source={{ uri: lastestPhoto }}
                                    />
                                ) : null
                        }
                    </ButtonFlip>
                </ContainerButtonCam>
            </Camera>

            {/* Modal para exibir a foto capturada */}
            <Modal animationType='slide' transparent={false} visible={photo !== null} statusBarTranslucent={true}>
                <Container >
                    {/* Exibir a foto */}
                    <Image style={{ width: '100%', height: 500, borderRadius: 10 }} source={{ uri: photo }} />

                    {/* Botões para limpar a foto ou salvar na galeria */}
                    <View style={{ margin: 10, flexDirection: 'row', }}>
                        <ButtonPhoto onPress={() => { ClearPhoto() }}>
                            <FontAwesome name='trash' size={50} color={'black'} />
                        </ButtonPhoto>

                        <ButtonPhoto onPress={() => { SavePhoto() }}>
                            <FontAwesome name='save' size={50} color={'#121212'} />
                        </ButtonPhoto>
                    </View>
                </Container>
            </Modal>



        </Modal>
    )
}
