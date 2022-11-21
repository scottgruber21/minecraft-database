import { View, Button, StyleSheet } from "react-native"
import { deleteAll, fetchAll, populate } from "../utils/database"

const Admin = () => {

    const viewData = async() => {
        const data = await fetchAll()
        console.log(data)
    }

    const deleteData = () => {
        deleteAll()
    }


    return <View>
        <View style={styles.button}>
        <Button title="CLEAR DATA" onPress={deleteData} />
        </View>
        <View style={styles.button}>
        <Button title="LOAD DATA" onPress={() => console.log('LOAD DATA')} />
        </View>
        <View style={styles.button}>
        <Button title="VIEW DATA" onPress={viewData} />
        </View>
        <View style={styles.button}>
        <Button title="POPULATE TEST DATA" onPress={populate} />
        </View>
    </View>
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 50
    }
})

export default Admin