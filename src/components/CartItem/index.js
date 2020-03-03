import React, {Component} from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import RNPickerSelect from 'react-native-picker-select';
import styles from './styles';

const pickerOptions = [
  {
    label: 'RUB',
    value: 'RUB',
  },
  {
    label: 'USD',
    value: 'USD',
  },
  {
    label: 'EUR',
    value: 'EUR',
  },
];

export default class CartItem extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  handlePickerChange = (value, index) => {
    const {onChange, data} = this.props;
    let newItem = Object.assign({}, data);
    newItem = {
      ...newItem,
      currency: value,
    };
    if (onChange) onChange(newItem, this.props.itemKey);
  };

  render() {
    const {
      data: {img, name, quantity, price, currency},
    } = this.props;
    return (
      <View style={styles.cartItem}>
        <View styles={styles.imgWrapper}>
          <FastImage
            style={styles.itemImg}
            resizeMode={FastImage.resizeMode.contain}
            source={{uri: img}}
          />
        </View>

        <View style={styles.itemContent}>
          <View style={styles.itemContentHeader}>
            <Text style={styles.itemTitle}>{name}</Text>
            <RNPickerSelect
              value={currency}
              useNativeAndroidPickerStyle={false}
              placeholder={{}}
              Icon={() => {
                return (
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      borderTopWidth: 5,
                      borderTopColor: 'gray',
                      borderRightWidth: 5,
                      borderRightColor: 'transparent',
                      borderLeftWidth: 5,
                      borderLeftColor: 'transparent',
                      width: 0,
                      height: 0,
                      top: 8,
                      right: -20,
                    }}
                  />
                );
              }}
              style={{
                inputAndroid: styles.inputAndroid,
                viewContainer: styles.viewContainer,
              }}
              items={pickerOptions}
              onValueChange={this.handlePickerChange}
            />
          </View>
          <View>
            <Text>Колличество: {quantity}</Text>
            <Text>Цена: {price}</Text>
          </View>
        </View>
      </View>
    );
  }
}
