import { View, Pressable, StyleSheet } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native"

const HeaderIcons = () => {

    const navigation = useNavigation()

    const homePress = () => {
        navigation.navigate('Results')
    }

    const searchPress = () => {
        navigation.navigate('Search')
    }

    const addPress = () => {
        navigation.navigate('ItemForm')
    }

    const adminPress = () => {
        navigation.navigate('Admin')
    }


    return <View style={styles.container}>
        {/* <Pressable onPress={homePress}><Ionicons name="home-outline" size={32} color="black" /></Pressable> */}
        <Pressable onPress={searchPress}><Ionicons name="search-outline" size={32} color="white" /></Pressable>
        <Pressable onPress={addPress}><Ionicons name="add-outline" size={32} color="white" /></Pressable>
        {/* <Pressable onPress={adminPress}><Ionicons name="cog-outline" size={32} color="black" /></Pressable> */}
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 100,
        justifyContent: 'space-between',
        marginRight: 30
    }
})

export default HeaderIcons