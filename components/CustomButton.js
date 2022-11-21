import { Pressable, StyleSheet, Text, View } from "react-native"

const CustomButton = ({onPress, children, color}) => {
    return <View style={styles.buttonContainer}>
    <Pressable style={[styles.button, {backgroundColor: color}]} onPress={onPress}>
        <Text style={styles.text}>{children}</Text>
    </Pressable>
    </View>
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        paddingVertical: 20
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'orbitron'
    }
})

export default CustomButton