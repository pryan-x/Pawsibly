import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    RefreshControl,
    Platform,
    LayoutAnimation,
    UIManager,
    Button,
    TouchableOpacity,
    AsyncStorage,
    ImageBackground
} from 'react-native'
import MultiSelect from '../components/MultiSelect'
import Slider from "@brlja/react-native-slider";
import { updateUser, updateUserBreeds } from '../services/ApiMethods'

const maxBreeds = 6

export default class FilterSearch extends Component {
    constructor() {
        super();
        this.state = {
            selectedBreeds: [],
            user: {},
            confirmText: `0/${maxBreeds}`,
            value: 10,
            colorMale: '#795ACE',
            colorFemale: '#795ACE',
            male: false,
            female: false
        };
    }

    componentDidMount = () => {
        this.setState({ user: this.props.navigation.getParam('user') });
        // this.checkForPreexistingFilters
    }

    onPressColorChange = (gender) => {
        if(gender === 'male') {
            this.state.colorMale === '#795ACE' ? this.setState({ colorMale: '#4C6DD0', male: true }) : this.setState({ colorMale: '#795ACE', male: false });
            
        } else {
            this.state.colorFemale === '#795ACE' ? this.setState({ colorFemale: 'salmon', female: true }) : this.setState({ colorFemale: '#795ACE', female: false });
        }
    }

    onSelectedItemsChange = (selectedBreeds) => {
        if ( selectedBreeds.length > maxBreeds ) {
          return;
        }
        this.setState({confirmText:`${selectedBreeds.length}/${maxBreeds}`})
        this.setState({ selectedBreeds })
      }

    saveUserFilters = async () => {
        const { navigation } = this.props

        let id = navigation.getParam('user').id
        console.log(id)
        let token = await AsyncStorage.getItem('userToken')
        
        let gender = []

        if (this.state.male) {
            gender.push('male')
        } 
        if (this.state.female) {
            gender.push('female')
        }

        try {
            await updateUser( this.state.value, gender, id, token)
            console.log(this.state.selectedBreeds)
            await updateUserBreeds( this.state.selectedBreeds, id )
            navigation.goBack()
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <ImageBackground
            source={require('../resources/dogBackground.jpg')} style={[styles.background, {width: '100%', height: '100%'}]}
            >
                <View style={styles.container}>
                <MultiSelect 
                selectedBreeds={this.state.selectedBreeds} onSelectedItemsChange={this.onSelectedItemsChange}confirmText={this.state.confirmText}/>
    
                <View style={{marginVertical: 25}}>
                    <Text style={[styles.text]}>Show dogs in the radius of: </Text>
                    {/* <Slider
                        style={{width: 200, height: 40}}
                        minimumValue={10}
                        maximumValue={250}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                    /> */}
                    <View>
                        <Slider
                            value={this.state.value}
                            minimumValue={10}
                               maximumValue={200}
                
                               step={1}
                            //    trackStyle={iosStyles.track}
                            //    thumbStyle={iosStyles.thumb}
                               minimumTrackTintColor='#1073ff'
                               maximumTrackTintColor='#b7b7b7'
              
                            onValueChange={value => this.setState({ value })}
                        />
                        <Text style={styles.text}>
                            {this.state.value} Miles
                        </Text>
                    </View>
                </View>
                {/* <View>
                    <Text style={[styles.text]}>Show dogs from the ages: </Text>
                </View> */}
                <View style={{alignItems: 'center'}}>
                    <Text style={[styles.text, {marginTop: 5} ]}>Gender: </Text>
                    {/* <Button style={{fontSize: 20}} value='yo' title='Male' onPress={() => {this.onPressColorChange('male')}} color={`${this.state.colorMale}`}></Button>
                    <Button title='Female' onPress={() => {this.onPressColorChange('female')}} color={`${this.state.colorFemale}`}></Button>
                     */}
                    <TouchableOpacity style={styles.genderToggle} onPress={() => {this.onPressColorChange(`male`)}}>
                        <Text style={{color: `${this.state.colorMale}`, fontSize: 25, fontFamily: 'quicksandBold', textAlign: 'center'}}>Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.genderToggle} onPress={() => {this.onPressColorChange(`female`)}}>
                        <Text style={{color: `${this.state.colorFemale}`, fontSize: 25, fontFamily: 'quicksandBold', textAlign: 'center'}}>Female</Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.button} onPress={this.saveUserFilters}>
                        <Text style={{color: 'white', fontSize: 25, fontFamily: 'quicksandBold'}}>Save Filters</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: '#9078D1',
        fontFamily: 'quicksandBold',
        fontSize: 25
    },
    background: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundImage: 
    },
    container: {
        width: '85%',
        // height: '80%',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingTop: 20,
        backgroundColor: 'rgba(244,240,255,1)',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 8,
        borderColor: '#69BAC6',
        backgroundColor: '#69BAC6',
        paddingVertical: 10,
        marginVertical: 33,
        width: '70%'
    },
    genderToggle: {
        marginVertical: 12,
        paddingVertical: 8,
        borderWidth: 1,
        backgroundColor: 'rgba(105,186,198,.35)',
        borderColor: 'rgba(244,240,255,1)',
        borderRadius: 10,
        width: '40%'
    }
})
