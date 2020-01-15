import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { Primary, Secondary } from '../../colors'

export default ({ onChangeText, value, name, checkPassword }) => {

    const nameCapitalized = name.slice(0,1).toUpperCase() + name.slice(1, name.length);

    return(
        <View style={styles.inputWrapper}>
            <TextInput 
            style={styles.input}
            name={name} 
            value={value} 
            secureTextEntry={checkPassword}
            onChangeText={(text) => onChangeText(name, text)} 
            placeholder={`Enter your ${nameCapitalized}`}
            placeholderTextColor='grey'
            // onEndEditing
            />
        </View>
    )
} 

const styles = StyleSheet.create({
    inputWrapper: {
        borderColor: '#000000',

        borderWidth: 2
    },
    input: {
        color: '#000000'
    }
})