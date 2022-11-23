import { useState, useEffect, useLayoutEffect } from "react"
import { View, Text, TextInput, StyleSheet, Button, ScrollView } from "react-native"
import DropDownPicker from 'react-native-dropdown-picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useGlobalContext } from "../context/GlobalContext";
import CustomButton from "../components/CustomButton";

const ItemForm = ({navigation, route}) => {

    const {addPlace, editPlace} = useGlobalContext()

    const placeData = route?.params?.placeData

    useLayoutEffect(() => {  
      navigation.setOptions({title: placeData ? placeData.title : 'Add Item'})
    }, [])


    const [placeInfo, setPlaceInfo] = useState(placeData || {
        title: '',
        description: '',
        x: '',
        y: '',
        z: '',
        type: '',
        id: Math.random()
    })

    const [typeItems, setTypeItems] = useState([
        {label: 'Home', value: 'home'},
        {label: 'Cave', value: 'cave'},
        {label: 'Village', value: 'village'},
        {label: 'Portal', value: 'portal'},
        {label: 'Other', value: 'other'}
    ])

    const [open, setOpen] = useState(false)
    const [dropdownValue, setDropdownValue] = useState(placeData?.type || placeInfo.type)
    const [showAlert, setShowAlert] = useState(false)
    const [errorString, setErrorString] = useState()

    useEffect(() => {
        setPlaceInfo({...placeInfo, type: dropdownValue})
    }, [dropdownValue])

    const handleSubmit = () => {

        setErrorString('')
        setShowAlert(false)

        const empty = []

        for (let key in placeInfo){
            if(!placeInfo[key] && key !== 'description' && key !== 'combined' && key !== 'id'){
                let caps = key.split('')
                caps[0] = caps[0].toUpperCase()
                caps = caps.join('')
                empty.push(caps)
            }
        }

        if(empty.length){
            let errors = empty.join('\n')
            setErrorString(errors)
            setShowAlert(true)
            return
        }

        const placeToSave = {...placeInfo, x: Number(placeInfo.x), y: Number(placeInfo.y), z: Number(placeInfo.z)}

        if(placeData){
          editPlace(placeToSave)
        }
        else{
          addPlace(placeToSave)
        }
        navigation.navigate('Results')
 }

    return (
    <View style={styles.formContainer}>
      <ScrollView nestedScrollEnabled={true} style={styles.scroll}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.textField}
            value={placeInfo.title}
            onChangeText={(e) => setPlaceInfo({ ...placeInfo, title: e })}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Type <Text style={styles.required}>*</Text></Text>
          <DropDownPicker
            value={dropdownValue}
            items={typeItems}
            setOpen={setOpen}
            open={open}
            setValue={setDropdownValue}
            listMode="SCROLLVIEW"
            placeholder="Select"
            textStyle={{fontSize: 16, fontFamily: 'orbitron'}}
            labelStyle={{fontSize: 16, fontFamily: 'orbitron'}}
          />
        </View>
        <View style={styles.columnsFields}>
        <View style={[styles.formControl, styles.formControlColumn]}>
          <Text style={styles.label}>X <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.textField}
            keyboardType={"numeric"}
            value={String(placeInfo.x)}
            onChangeText={(e) => setPlaceInfo({ ...placeInfo, x: e })}
          />
        </View>
        <View style={[styles.formControl, styles.formControlColumn]}>
          <Text style={styles.label}>Y <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.textField}
            keyboardType={"numeric"}
            value={String(placeInfo.y)}
            onChangeText={(e) => setPlaceInfo({ ...placeInfo, y: e })}
          />
        </View>
        <View style={[styles.formControl, styles.formControlColumn]}>
          <Text style={styles.label}>Z <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.textField}
            keyboardType={"numeric"}
            value={String(placeInfo.z)}
            onChangeText={(e) => setPlaceInfo({ ...placeInfo, z: e })}
          />
        </View>
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textField}
            multiline={true}
            numberOfLines={3}
            value={placeInfo.description}
            onChangeText={(e) => setPlaceInfo({ ...placeInfo, description: e })}
          />
        </View>
        {/* <Button title="Submit" onPress={handleSubmit} /> */}
        <CustomButton onPress={handleSubmit} color={'#477a1e'}>Submit</CustomButton>
        <AwesomeAlert
        {...alertStyles}
          show={showAlert}
          showProgress={false}
          title="Missing Required Fields"
          message={`Please enter:\n${errorString}`}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={true}
          showConfirmButton={false}
          cancelText="OK"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            setShowAlert(false);
          }}
        />
      </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  formContainer: {
    alignItems: 'center'
  },
  scroll: {
    width: '80%',
    paddingTop: 20
  },
    textField: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        fontFamily: 'orbitron'
    },
    formControl: {
      marginVertical: 5
    },
    label: {
      fontFamily: 'orbitronBold',
      fontSize: 16,
      marginBottom: 5
    },
    required:{
      color: 'red',
      fontWeight: 'bold'
    },
    columnsFields: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    formControlColumn: {
      width: '30%'
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
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  cancelButtonTextStyle: {
    fontSize: 18,
    fontFamily: 'orbitron'
  }
}

export default ItemForm