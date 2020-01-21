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
    AsyncStorage,
} from 'react-native'



// img1={this.state.dogListData[0].photos[0].large}
// age={this.state.dogListData[0].age}
// gender={this.state.dogListData[0].gender}
// breeds={[this.state.dogListData[0].breeds.primary, this.state.dogListData[0].breeds.secondary, this.state.dogListData[0].breeds.mixed]}
// distance={this.state.dogListData[0].distance}
// contact={[this.state.dogListData[0].contact.email,
//   this.state.dogListData[0].contact.phone]}

export default class Card extends Component {
    state = {
    }
    render() {
        const { img1, name, age, gender, breeds, distance, contact, size } = this.props
        return (
            <View style={[styles.flexRow]}>
                <Image
                    style={[styles.image]}
                    source={{ uri: `${img1}` }} />
                <View style={{width: 250}}>
                    <View>
                        <Text style={{flexDirection:'row', flex: 1, flexWrap: 'wrap', width: 240, textAlign: 'center'}}>{name}</Text>
                    </View>
                    <View style={[styles.flexRow]}>
                        <View>
                            <Text style={[styles.dogDetails, styles.text]}>
                                {gender}
                            </Text>
                            <Text style={[styles.dogDetails, styles.text]}>
                                {distance.toFixed(2)} miles away
                            </Text>
                        </View>
                        <View style={{paddingLeft: 15, flex: 1, justifyContent: 'center'}}>
                            <Text style={[styles.dogDetails]}>
                                Size: {size === 'xLarge' ? 'Very Large' : size}
                            </Text>
                            <Text style={[styles.dogDetails]}>
                                Age: {age === 'Baby' ? 'Puppy' : age}
                            </Text>
                        </View>

                    </View>
                    <View>
                        <View>
                            <Text>
                                Breeds:
                            </Text>
                        </View>
                        <View>
                            <Text style={[styles.text]}>
                                {`${breeds[0]}${breeds[1] ? `,\n${breeds[1]}` : ''}`}
                            </Text>
                            <Text style={[styles.text]}>
                                {breeds[3] === true ? 'Not Mixed' : 'Mixed'}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text>
                            Contact:
                        </Text>
                        <Text style={[styles.text]}>{`${contact[0]}\n${contact[1]}`}
                        </Text>
                    </View>
                </View>


            </View>
        );
    }
}
const styles = StyleSheet.create({
    text: {
        textAlign: 'center'
    },
    flexRow: {
        flexDirection: 'row',
    },
    justifyContent: {
        justifyContent: 'space-around'
    },
    dogDetails: {
        // alignSelf: "flex-start"
    },
    image: {
        margin: 5,
        marginRight: 15,
        width: 150,
        height: 150
    }
})
