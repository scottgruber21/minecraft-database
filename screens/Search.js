import { useState, useEffect } from "react"
import { View, Text, TextInput, StyleSheet, Button, ScrollView } from "react-native"
import DropDownPicker from 'react-native-dropdown-picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useGlobalContext } from "../context/GlobalContext";
import CustomButton from "../components/CustomButton";


const Search = ({navigation}) => {

    const {newSearch, globalTerms} = useGlobalContext()

    DropDownPicker.setMode("BADGE");

    const [searchTerms, setSearchTerms] = useState(globalTerms || {
        x: '',
        y: '',
        type: [],
        searchText: ''
    })

    const [typeItems, setTypeItems] = useState([
        {label: 'All', value: 'all'},
        {label: 'Home', value: 'home'},
        {label: 'Cave', value: 'cave'},
        {label: 'Village', value: 'village'},
        {label: 'Portal', value: 'portal'},
        {label: 'Other', value: 'other'}
    ])

    const [open, setOpen] = useState(false)
    const [dropdownValue, setDropdownValue] = useState(globalTerms.type || [])
    const [showAlert, setShowAlert] = useState(false)
    const [errorString, setErrorString] = useState('')

    const handleValue = value => {
        if(value.includes('all')){
            setDropdownValue(['home', 'cave', 'village', 'other'])
            setSearchTerms({...searchTerms, type: ['home', 'cave', 'village', 'other']})
        }
        else{
            setDropdownValue(value)
            setSearchTerms({...searchTerms, type: value})
        }
    }

    const handleSearch = () => {

        setErrorString('')
        setShowAlert(false)

        if(!searchTerms.x && !searchTerms.y && !searchTerms.z && !searchTerms.type && !searchTerms.searchText ){
            setErrorString('At least one search term is required')
            setShowAlert(true)
            return
        }

        if((!searchTerms.x && searchTerms.y) || (searchTerms.x && !searchTerms.y)){
            setErrorString('X and Y are both required for coordinate searches')
            setShowAlert(true)
            return
        }
        newSearch(searchTerms)
        navigation.navigate('Results')
    }

    const handleClear = () => {
      newSearch({})
      navigation.navigate('Results')
    }

    return (
      <View style={styles.formContainer}>
      <ScrollView nestedScrollEnabled={true} style={styles.scroll}>
        <View>
          <Text style={styles.headerText}>If specifying coordinates, both X and Y are required.</Text>
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Type (Can select multiple)</Text>
          <DropDownPicker
            multiple={true}
            value={dropdownValue}
            items={typeItems}
            setOpen={setOpen}
            open={open}
            setValue={setDropdownValue}
            listMode="SCROLLVIEW"
            placeholder="Select"
            onChangeValue={handleValue}
            textStyle={{fontSize: 16, fontFamily: 'orbitron'}}
            labelStyle={{fontSize: 16, fontFamily: 'orbitron'}}
          />
        </View>
          <View style={styles.columnsFields}>
        <View style={[styles.formControl, styles.formControlColumn]}>
          <Text style={styles.label}>X</Text>
          <TextInput
            style={styles.textField}
            keyboardType={"numeric"}
            value={searchTerms.x}
            onChangeText={(e) => setSearchTerms({ ...searchTerms, x: e })}
          />
        </View>
        <View style={[styles.formControl, styles.formControlColumn]}>
          <Text style={styles.label}>Y</Text>
          <TextInput
            style={styles.textField}
            keyboardType={"numeric"}
            value={searchTerms.y}
            onChangeText={(e) => setSearchTerms({ ...searchTerms, y: e })}
          />
        </View>
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Search Title and Description</Text>
          <TextInput
            style={styles.textField}
            value={searchTerms.searchText}
            onChangeText={(e) =>
              setSearchTerms({ ...searchTerms, searchText: e })
            }
          />
        </View>
        <View style={styles.columnsButtons}>
          <CustomButton onPress={handleSearch} color='green'>Search</CustomButton>
          <CustomButton onPress={handleClear} color='red'>Clear All</CustomButton>
        </View>
        <AwesomeAlert
        {...alertStyles}
          show={showAlert}
          showProgress={false}
          title="Information Missing!"
          message={errorString}
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
    headerText: {
      fontFamily: 'orbitronBold',
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 10
    },
    columnsButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    columnsFields: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    formControlColumn: {
      width: '45%'
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

export default Search