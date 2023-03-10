import React, { FC } from 'react';
import { ColorValue, View } from 'react-native';
import { styles } from './styles';

export interface ArrowIconProps {
  direction: 'up' | 'right' | 'down' | 'left';
  size?: number;
  color?: ColorValue;
}

export const ArrowIcon: FC<any> = props => {
  const { direction = 'right', size = 16, color = '#ccc' } = props;

  let directionStyle = styles._right;
  if (direction === 'down') {
    directionStyle = styles._down;
  }
  if (direction === 'left') {
    directionStyle = styles._left;
  }
  if (direction === 'up') {
    directionStyle = styles._up;
  }

  return (
    <View style={[styles.root, directionStyle, { width: size, height: size }]}>
      <View style={[styles.item1, { backgroundColor: color }]} />
      <View style={[styles.item2, { backgroundColor: color }]} />
    </View>
  );
};
