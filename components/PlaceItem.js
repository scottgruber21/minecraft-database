import { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons'
import { useGlobalContext } from "../context/GlobalContext"
import AwesomeAlert from 'react-native-awesome-alerts';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {COLORS} from '../utils/colors'

const PlaceItem = ({placeData}) => {

    const [warning, setWarning] = useState(false)

    const {deletePlace} = useGlobalContext()

    const navigation = useNavigation()

    const handleEdit = () => {
        navigation.navigate('ItemForm', {placeData})
    }

    const handleDelete = () => {
        setWarning(true)
    }


    return (
      <View style={styles.container}>
                <View style={[styles.typeContainer, {backgroundColor: COLORS[placeData.type]}]}>
          <Text style={styles.type}>
             {placeData.type.replace(placeData.type[0], placeData.type[0].toUpperCase())}
          </Text>
        </View>
        <View>
          <Text style={styles.title}>{placeData.title}</Text>
        </View>
        <View style={styles.coordContainer}>
          <View>
            <Text style={styles.coords}>
              <Text style={styles.bold}>X:</Text> {placeData.x}
            </Text>
          </View>
          <View>
            <Text style={styles.coords}>
              <Text style={styles.bold}>Y:</Text> {placeData.y}
            </Text>
          </View>
          <View>
            <Text style={styles.coords}>
              <Text style={styles.bold}>Z:</Text> {placeData.z}
            </Text>
          </View>
        </View>
        {placeData.description && <View>
          <Text style={styles.description}>{placeData.description}</Text>
        </View>}
        <View style={styles.iconContainer}>
          <Pressable style={[styles.icon, {borderColor: '#000080'}]} onPress={handleEdit}>
            <Ionicons name="pencil-outline" size={32} color="#000080" />
          </Pressable>
          <Pressable style={[styles.icon, {borderColor: '#B22222'}]} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={32} color="#B22222" />
          </Pressable>
        </View>
        <View style={styles.spacer}></View>
        <AwesomeAlert
        {...alertStyles}
          show={warning}
          showProgress={false}
          title="Are You Sure?"
          message="This item will be deleted"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancel"
          confirmText="Delete"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            setWarning(false)
          }}
          onDismiss={() => {
            setWarning(false)
          }}
          onConfirmPressed={() => {
            deletePlace(placeData.id)
            setWarning(false)
          }}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 20
    },
    title: {
      fontFamily: 'orbitronExtra',
        fontSize: 22,
        marginBottom: 10
    },
    typeContainer: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 10,
      marginBottom: 20
    },
    type: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'orbitronExtra'
    },
    coordContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-around',
        paddingVertical: 20
    },
    coords: {
        fontSize: 18,
        fontFamily: 'orbitron'
    },
    bold: {
        fontFamily: 'orbitronBold'
    },
    description: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
        lineHeight: 30,
        fontFamily: 'orbitron'
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '40%',
        paddingTop: 10
    },
    icon: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    spacer: {
      height: 2,
      backgroundColor: 'black',
      width: '80%',
      marginTop: 20
    }
})

const alertStyles = {
  titleStyle: {
    fontSize: 22,
    fontFamily: 'orbitronBold'
  },
  messageStyle:{
    width: '80%',
    lineHeight: 26,
    fontSize: 18,
    fontFamily: 'orbitron'
  },
  contentContainerStyle: {
    borderRadius: 20
  },
  cancelButtonStyle: {
    backgroundColor: '#477a1e',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  cancelButtonTextStyle: {
    fontSize: 18,
    fontFamily: 'orbitron'
  },
  confirmButtonStyle: {
    backgroundColor: '#B22222',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  confirmButtonTextStyle: {
    fontSize: 18,
    fontFamily: 'orbitron'
  }
}

export default PlaceItem