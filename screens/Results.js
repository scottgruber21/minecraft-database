import { View, Text, Button, StyleSheet } from "react-native"
import { useEffect, useState } from "react"
import PlaceList from "../components/PlaceList"
import { Place } from "../models/place"
import { useGlobalContext } from "../context/GlobalContext"
import CustomButton from "../components/CustomButton"

const Results = ({navigation}) => {

    const goToAdd = () => {
        navigation.navigate('ItemForm')
    }

    const goToSearch = () => {
        navigation.navigate('Search')
    }

    const {places, searchedPlaces} = useGlobalContext()

    if(!places.length && !searchedPlaces.length){
        return <>
        <View style={styles.warning}>
            <Text style={styles.warningText}>Looks like you don't have any locations saved!</Text>
        </View>
        <CustomButton onPress={goToAdd} color={'green'}>Add a location</CustomButton>
        </>
    }

    else if(!searchedPlaces.length){
        return <>
        <View style={styles.warning}>
            <Text style={styles.warningText}>No results</Text>
        </View>
        <CustomButton onPress={goToSearch} color={'green'}>Return to search</CustomButton>
        </>
    }

    return <PlaceList placeListData={searchedPlaces} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 36
    },
    button: {
        marginVertical: 30
    },
    warning: {
        paddingTop: 50,
        paddingBottom: 20,
        alignItems: 'center'
    },
    warningText: {
        width: '80%',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'orbitronBold'
    }
})

export default Results