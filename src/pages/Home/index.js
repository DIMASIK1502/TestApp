import React, {Component} from 'react';
import {View} from 'react-native';
import style from './styles';
import Cart from '../../components/Cart';

export default class Home extends Component {
  render() {
    return (
      <View style={style.container}>
        <Cart />
      </View>
    );
  }
}
