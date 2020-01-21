import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { Primary, Secondary } from '../../colors'

export default ({ onChangeText, value, name, checkPassword, textContentType, numberpad}) => {

    const nameCapitalized = name.slice(0,1).toUpperCase() + name.slice(1, name.length);

    return(
        <View style={styles.inputWrapper}>
            <TextInput 
            style={styles.input}
            name={name} 
            value={String(value)} 
            textContentType={textContentType}
            secureTextEntry={checkPassword}
            keyboardType={numberpad ? numberpad : 'default'}
            onChangeText={(e) => onChangeText(name, e)} 
            placeholder={`Enter your ${nameCapitalized}`}
            placeholderTextColor='grey'
            // onEndEditing
            />
        </View>
    )
} 

const styles = StyleSheet.create({
    inputWrapper: {
        borderColor: '#8096D8',
        backgroundColor: '#ECE5FF',
        borderWidth: 1,
        padding: 5,
        marginVertical: 15,
        marginHorizontal: '8%',
        borderRadius: 6
    },
    input: {
        backgroundColor: '#ECE5FF38',
        color: '#4D4D4D',
        fontSize: 24
    }
})