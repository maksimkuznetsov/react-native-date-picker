import React from 'react';
import { useState } from 'react';
import { ColorValue, Text, TouchableOpacity, View } from 'react-native';
import Modal, { ModalProps } from 'react-native-modal';
import type { Dispatch, SetStateAction, FC } from 'react';
import { styles } from './styles';
import { ArrowIcon } from '../ArrowIcon';

export interface ChangeYearModalColorOptions {
  backgroundColor?: ColorValue;
  icons?: ColorValue;
  year?: ColorValue;
  currentYear?: ColorValue;
}

export type ChangeYearModalProps = {
  /**
   * The color of texts, icons and the background color of change year modal.
   * @param primary: The color of texts and icons in change year modal.
   * @param backgroundColor:The background color of change year modal.
   */
  colorOptions?: ChangeYearModalColorOptions;
  /**
   * the functiont o excute when the modal is closed.
   */
  dismiss: () => void;
  // The current date to show in the modal.
  displayTime: Date;
  // Prop to know if the modal is visible or not.
  isVisible: boolean;
  /**
   * Function to change the year.
   */
  setDisplayTime: Dispatch<SetStateAction<Date>>;

  /**
   * This is a extension from `ModalProps` from `react-native-modal` library.
   * If you want to know more about this prop, please visit:
   *
   * {@link https://github.com/react-native-modal/react-native-modal/blob/master/src/modal.tsx}
   */
  changeYearModalProps?: Omit<ModalProps, 'children'>;
};

/**
 * This is a component to change the year.
 * @param {ChangeYearModalProps.colorOptions} colorOptions - Is an object that receives two keys: `primary` and `backgroundColor`, their values change the color of the texts, icons and background of the modal.
 * @param {ChangeYearModalProps.dismiss} dismiss - Is a function that is executed when the modal is closed.
 * @param {ChangeYearModalProps.displayTime} displayTime - Is the current date to show in the modal.
 * @param {ChangeYearModalProps.isVisible} isVisible - Is a prop to know if the modal is visible or not.
 * @param {ChangeYearModalProps.setDisplayTime} setDisplayTime - Is a function to change the year.
 * @param {ChangeYearModalProps.changeYearModalProps} changeYearModalProps - Is a prop that extends the `ModalProps` from `react-native-modal` library.
 * @returns {JSX.Element} Returns a JSX.Element.
 */
export const ChangeYearModal: FC<ChangeYearModalProps> = props => {
  const {
    colorOptions = {},
    dismiss,
    displayTime,
    isVisible,
    setDisplayTime,
    changeYearModalProps,
  } = props;
  const {
    backgroundColor = '#FFFFFF',
    icons = '#A7A7A7',
    year: yearColor = '#A7A7A7',
    currentYear: currentYearColor = '#4682E9',
  } = colorOptions;
  const [year, setYear] = useState(displayTime.getFullYear());
  const onDismiss = () => {
    dismiss();
    const newDate = new Date(
      year,
      displayTime.getMonth(),
      displayTime.getDate(),
    );
    setDisplayTime(newDate);
  };

  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver
      hideModalContentWhileAnimating
      onBackButtonPress={onDismiss}
      onBackdropPress={onDismiss}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      style={styles.modal}
      {...changeYearModalProps}>
      <View style={[styles.container, { backgroundColor }]}>
        <TouchableOpacity
          onPress={() => {
            setYear(prev => prev - 1);
          }}
          style={styles.btn}>
          <ArrowIcon direction="up" size={24} color={icons} />
          <Text style={[styles.prevYearText, { color: yearColor }]}>
            {year - 1}
          </Text>
        </TouchableOpacity>
        <Text style={[styles.yearText, { color: currentYearColor }]}>
          {year}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setYear(prev => prev + 1);
          }}
          style={styles.btn}>
          <Text style={[styles.nextYearText, { color: yearColor }]}>
            {year + 1}
          </Text>
          <ArrowIcon direction="down" size={24} color={icons} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
