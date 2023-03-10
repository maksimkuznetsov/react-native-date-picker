import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 250,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    // borderWidth: 1,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_text: {
    fontSize: 18,
  },
  yearText: {
    // borderWidth: 1,
    fontSize: 28,
    // fontFamily: 'Roboto_700Bold',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  prevYearText: {
    // borderWidth: 1,
    fontSize: 16,
    // fontFamily: 'Roboto_400Regular',
    color: '#7A7A7A',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  nextYearText: {
    // borderWidth: 1,
    fontSize: 16,
    // fontFamily: 'Roboto_400Regular',
    color: '#7A7A7A',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
});
