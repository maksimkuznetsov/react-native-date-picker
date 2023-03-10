import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export interface DayItemStylesOptions {
  day?: ViewStyle;
  day_text?: TextStyle;
}

export const styles = StyleSheet.create({
  day: {
    width: 34,
    height: 34,
    borderRadius: 10,
    marginTop: 4,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  day_text: {
    fontSize: 14,
  },
});
