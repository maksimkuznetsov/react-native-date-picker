import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    position: 'relative',
  },
  _right: {},
  _down: {
    transform: [{ rotate: '90deg' }],
  },
  _left: {
    transform: [{ rotate: '180deg' }],
  },
  _up: {
    transform: [{ rotate: '270deg' }],
  },
  item1: {
    position: 'absolute',
    top: '26%',
    left: '20%',
    width: '60%',
    height: '10%',
    borderRadius: 100,
    transform: [{ rotate: '45deg' }],
  },
  item2: {
    position: 'absolute',
    top: '63%',
    left: '20%',
    width: '60%',
    height: '10%',
    borderRadius: 100,
    transform: [{ rotate: '-45deg' }],
  },
});
