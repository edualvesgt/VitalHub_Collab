import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { mapskey } from '../../utils/keyApiMaps';

export default function Map() {
    // Referência para o mapa
    const mapReference = useRef(null);
    // Estado para armazenar a posição inicial do usuário
    const [initialPosition, setInitialPosition] = useState(null);
    // Estado para armazenar a posição final (destino)
    const [finalPosition, setFinalPosition] = useState({ latitude: -23.515797, longitude: -46.590664 });

    // Função para capturar a localização atual do usuário
    async function CapturarLocalizacao() {
        const { granted } = await requestForegroundPermissionsAsync();

        if (granted) {
            const captureLocation = await getCurrentPositionAsync();
            setInitialPosition(captureLocation);
        }
    }

    // Função para recarregar a visualização do mapa, ajustando a região para incluir tanto a posição inicial quanto o destino
    async function RecarregarVizualizacaoMapa() {
        if (mapReference.current && initialPosition) {
            await mapReference.current.fitToCoordinates(
                [
                    { latitude: initialPosition.coords.latitude, longitude: initialPosition.coords.longitude },
                    { latitude: finalPosition.latitude, longitude: finalPosition.longitude },
                ],
                {
                    edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },
                    animated: true
                }
            )
        }
    }

    // Efeito para capturar a localização quando o componente é montado
    useEffect(() => {
        CapturarLocalizacao();
    }, []);

    // Efeito para recarregar a visualização do mapa sempre que a posição inicial for atualizada
    useEffect(() => {
        if (initialPosition) {
            RecarregarVizualizacaoMapa();
        }
    }, [initialPosition]);

    return (
        <View style={styles.container}>
            {
                initialPosition != null
                    ? (
                        <MapView
                            ref={mapReference}
                            style={styles.map}
                            initialRegion={{
                                latitude: initialPosition?.coords?.latitude,
                                longitude: initialPosition?.coords?.longitude,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005,
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: initialPosition?.coords?.latitude,
                                    longitude: initialPosition?.coords?.longitude,
                                }}
                                title='Posição inicial'
                                description='Estou aqui'
                                pinColor={'purple'}
                            />
                            <MapViewDirections
                                origin={initialPosition?.coords}
                                destination={{
                                    latitude: finalPosition.latitude,
                                    longitude: finalPosition.longitude,
                                }}
                                strokeWidth={5}
                                strokeColor='#496BBA'
                                apikey={mapskey}
                            />
                            <Marker
                                coordinate={{
                                    latitude: finalPosition.latitude,
                                    longitude: finalPosition.longitude,
                                }}
                                title='Destino'
                                description='Preciso ir pra lá'
                                pinColor={'red'}
                            />
                        </MapView>
                    ) : (
                        <>
                            <Text>Localização não encontrada</Text>
                            <ActivityIndicator />
                        </>
                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        flex: 1,
        width: "100%"
    }
});
