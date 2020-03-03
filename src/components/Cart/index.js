import React, {Component} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import CartItem from '../CartItem';
import styles from './styles';

export default class Cart extends Component {
  /* Делал без контекста/редакса, ибо считаю что для такого маленького проекта он не нужен.
      Если необходимо, я переделаю.
  */
  state = {
    currenciesList: [],
    loading: false,
    sumEUR: 0,
    sumUSD: 0,
    sumRUB: 0,
    cartList: [
      {
        img:
          'https://m.dom-eda.com/uploads/images/catalog/item/86df51de21/c25c94fe96_1000.jpg',
        name: 'Яблоко',
        quantity: 5,
        price: 30,
        currency: 'RUB',
      },
      {
        img: 'https://pngimg.com/uploads/pear/pear_PNG3429.png',
        name: 'Груша',
        quantity: 10,
        price: 15,
        currency: 'RUB',
      },
      {
        img: 'https://s018.radikal.ru/i502/1201/e3/cd786da7eabc.png',
        name: 'Виноград',
        quantity: 1,
        price: 50,
        currency: 'RUB',
      },
      {
        img: 'https://pngimg.com/uploads/banana/banana_PNG825.png',
        name: 'Банан',
        quantity: 1,
        price: 27,
        currency: 'RUB',
      },
    ],
  };

  sumPrices = (currencies, valute) => {
    const {cartList} = this.state;
    if (valute === 'RUB') {
      return cartList
        .reduce((prev, curr) => {
          if (curr.currency === 'RUB') {
            return prev + curr.price * curr.quantity;
          } else {
            return (
              prev +
              currencies[curr.currency].Value * curr.price * curr.quantity
            );
          }
        }, 0)
        .toFixed(2);
    } else {
      return cartList
        .reduce((prev, curr) => {
          if (curr.currency === 'RUB') {
            return (
              prev + (curr.price * curr.quantity) / currencies[valute].Value
            );
          } else {
            return (
              prev +
              (curr.price * curr.quantity * currencies[curr.currency].Value) /
                currencies[valute].Value
            );
          }
        }, 0)
        .toFixed(2);
    }
  };

  toСount = currencies => {
    const sumEUR = this.sumPrices(currencies, 'EUR');
    const sumUSD = this.sumPrices(currencies, 'USD');
    const sumRUB = this.sumPrices(currencies, 'RUB');
    this.setState({sumEUR, sumUSD, sumRUB, loading: false});
  };

  onItemChange = (data, key) => {
    this.setState((prevState, props) => {
      let newCartList = prevState.cartList;
      newCartList[key] = data;
      return {
        cartList: newCartList,
      };
    });
  };

  handleButton = e => {
    this.setState({loading: true});
    axios
      .get('http://www.cbr-xml-daily.ru/daily_json.js')
      .then(res => {
        this.toСount(res.data.Valute);
      })
      .catch(err => {
        this.setState({loading: false});
      });
  };

  render() {
    const {cartList, loading, sumEUR, sumUSD, sumRUB} = this.state;
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 8,
          justifyContent: loading ? 'center' : 'flex-start',
        }}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <FlatList
              ItemSeparatorComponent={({highlighted}) => (
                <View
                  style={[styles.separator, highlighted && {marginLeft: 0}]}
                />
              )}
              keyExtractor={(item, index) => `cart-item-${index}`}
              data={cartList}
              renderItem={({item, index}) => (
                <CartItem
                  onChange={this.onItemChange}
                  itemKey={index}
                  data={item}
                />
              )}
            />
            <TouchableOpacity onPress={this.handleButton} style={styles.button}>
              <Text style={styles.buttonText}>Посчитать</Text>
            </TouchableOpacity>
            <View style={styles.priceResult}>
              <Text style={styles.priceResultItem}>RUB: {sumRUB}</Text>
              <Text style={styles.priceResultItem}>EUR: {sumEUR}</Text>
              <Text style={styles.priceResultItem}>USD: {sumUSD}</Text>
            </View>
          </>
        )}
      </View>
    );
  }
}
