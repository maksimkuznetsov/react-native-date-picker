import {
  Dimensions,
  Platform,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

const winY = Dimensions.get('screen').height;

export interface DatePickerViewStylesOptions {
  container?: ViewStyle;
  header?: ViewStyle;
  header__title?: TextStyle;
  keys_container?: ViewStyle;
  weekDays_container?: ViewStyle;
  weekDays?: TextStyle;
  keys?: ViewStyle;
  footer?: ViewStyle;
  btn_box?: ViewStyle;
  btn?: ViewStyle;
  btn_text?: TextStyle;
  changeMonthTO?: ViewStyle;
}

export const styles = StyleSheet.create({
  modal: {
    flex: Platform.OS === 'web' ? 1 : 0,
    height: winY,
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header__title: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  keys_container: {
    width: 300,
    height: 264,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  weekDays_container: {
    display: 'flex',
    flexDirection: 'row',
  },
  weekDays: {
    fontSize: 14,
  },
  keys: {
    width: 34,
    height: 30,
    borderRadius: 10,
    marginTop: 4,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    width: 300,
    height: 52,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btn_box: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'space-between',
  },
  btn: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_text: {
    fontSize: 18,
    color: '#777',
  },
  changeMonthTO: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    padding: 4,
    borderColor: 'black',
  },
});
