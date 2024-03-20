import React, { useEffect, useRef, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Camera, CameraType } from 'expo-camera';

import { Container, ContainerButtonCam, } from '../Container/StyleContainer';
import { Button, ButtonFlip, ButtonPhoto } from '../Button/Button';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { Alert, Image, Modal, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function Cam({ }) {
    const camRef = useRef(null);
    const [typeCam, setTypeCam] = useState(Camera.Constants.Type.front);
    // Estado para armazenar a foto capturada
    const [photo, setPhoto] = useState(null)
    const [capturePhoto, setCapturePhoto] = useState(null)
    const [openModal, setOpenModal] = useState(false)


    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
            const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
        })();
    }, []);


    // Função assíncrona para capturar a foto
    async function CapturePhoto() {
        if (camRef) {
            const photo = await camRef.current.takePictureAsync();
            await setCapturePhoto(photo.uri)
            setPhoto(photo.uri)
            console.log(photo);
            setOpenModal(true)

        }
    }


    // Função assíncrona para limpar a foto
    async function ClearPhoto() {
        setPhoto(null)
        setOpenModal(false)

    }

    // Função assíncrona para salvar a foto na galeria
    async function SavePhoto() {
        if (photo) {
            await MediaLibrary.createAssetAsync(photo)
                .then(() => { Alert.alert('Sucesso', 'Foto salva na galeria') })
                .catch(Error => { Alert.alert('Erro', 'Foto não foi salva') })
            setOpenModal(false)
        }
    }



    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={true}
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
                </ContainerButtonCam>
            </Camera>

            {/* Modal para exibir a foto capturada */}
            <Modal animationType='slide' transparent={false} visible={photo !== null}>
                <Container >
                    {/* Exibir a foto */}
                    <Image style={{ width: '100%', height: 500, borderRadius: 10 }} source={{ uri: photo }} />

                    {/* Botões para limpar a foto ou salvar na galeria */}
                    <View style={{ margin: 10, flexDirection: 'row', }}>
                        <ButtonPhoto onPress={() => { ClearPhoto(); setOpenModal(false) }}>
                            <FontAwesome name='trash' size={50} color={'#ff0000'} />
                        </ButtonPhoto>

                        <ButtonPhoto onPress={() => { SavePhoto(); setOpenModal(false) }}>
                            <FontAwesome name='save' size={50} color={'#121212'} />
                        </ButtonPhoto>
                    </View>
                </Container>
            </Modal>



        </Modal>
    )
}
