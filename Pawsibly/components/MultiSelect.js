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
    UIManager
} from 'react-native'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { dogs } from '../resources/dogs.json'

const dogBreeds = [
    {
        children: dogs
    },
]


export default class MultiSelect extends Component {
    constructor() {
        super();
        this.state = {
            selectedBreeds: [],
        };
    }
    // onSelectedItemsChange = (selectedItems) => {
    //     this.setState({ selectedItems });
    //     console.log(selectedItems)
    // };


    render() {
        const { onSelectedItemsChange, selectedBreeds } = this.props
        return (
            <View>
            <SectionedMultiSelect
                items={dogBreeds}
                uniqueKey="id"
                subKey="children"
                selectText="Select Dog Breeds"
                searchPlaceholderText="Search for breeds..."
                subItemsFlatListProps={{initialNumToRender: 35}}
                // showDropDowns={true}
                readOnlyHeadings={true}
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={selectedBreeds}
                showDropDowns={false}
                confirmText={`Confirm - ${this.props.confirmText}`}
            />
        </View>
        );
    }
}