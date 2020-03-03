import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  cartItem: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
  },
  imgWrapper: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 3,
  },
  itemImg: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  itemContent: {
    paddingHorizontal: 16,
    flex: 1,
  },
  itemContentHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 18,
  },
  viewContainer: {
    flexDirection: 'row',
  },
  inputAndroid: {
    top: -14,
    left: 8,
  },
});
