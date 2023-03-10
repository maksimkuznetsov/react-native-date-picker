import React from 'react';
import { TouchableOpacity, Text, ColorValue } from 'react-native';
import type { Dispatch, FC, SetStateAction } from 'react';
import { DatePickerMode, Day } from '../../types';
import { DayItemStylesOptions, styles } from './styles';

export type Output = {
  date: Date | null;
  startDate: Date | null;
  endDate: Date | null;
};
type colorOptions = {
  dateTextColor: ColorValue;
  backgroundColor: ColorValue;
  selectedDateTextColor: ColorValue;
  selectedDateBackgroundColor: ColorValue;
};

export interface DayItemProps {
  colorOptions: colorOptions;
  styleOptions?: DayItemStylesOptions;
  day: Day;
  mode: DatePickerMode;
  output: Output;
  setOutput: Dispatch<SetStateAction<Output>>;
}

export const DayItem: FC<DayItemProps> = ({
  colorOptions,
  day,
  mode,
  output,
  setOutput,
  styleOptions = {},
}) => {
  const {
    dateTextColor,
    backgroundColor,
    selectedDateTextColor,
    selectedDateBackgroundColor,
  } = colorOptions;
  const singleMode = mode === 'single';
  const rangeMode = mode === 'range';

  const onKeyPress = () => {
    if (day.disabled) {
      return;
    }

    const newDate = new Date(day.year, day.month, day.date);

    const shouldSetStartDate =
      !output.startDate ||
      output.endDate ||
      newDate.getTime() < output.startDate?.getTime();

    if (singleMode) {
      const newOutPut = { ...output, date: newDate };
      setOutput(newOutPut);
      return;
    }

    if (rangeMode) {
      if (shouldSetStartDate) {
        const newOutPut = { ...output, startDate: newDate, endDate: null };
        setOutput(newOutPut);
      } else {
        const newOutPut = { ...output, endDate: newDate };
        setOutput(newOutPut);
      }
    }
  };

  const getColor = () => {
    const selectedColors = {
      bgc: selectedDateBackgroundColor,
      text: selectedDateTextColor,
    };
    const notSelectedColors = { bgc: backgroundColor, text: dateTextColor };
    const disabledColors = {
      bgc: backgroundColor,
      text: `${dateTextColor.toString()}55`,
    };

    if (day.isCurrentMonth === false) {
      selectedColors.bgc = selectedDateBackgroundColor.toString() + '22';
      notSelectedColors.text = dateTextColor.toString() + '22';
      disabledColors.text = dateTextColor.toString() + '22';
    }

    const timeOfThisKey = new Date(day.year, day.month, day.date).getTime();

    if (day.disabled) {
      return disabledColors;
    }
    /**
     * If the mode is single, then this conditional will be true
     */
    if (singleMode) {
      const date = output.date as Date;
      const isThisDateSelected = timeOfThisKey === date.getTime();
      return isThisDateSelected ? selectedColors : notSelectedColors;
    }

    /**
     * Is the conditional above is false, then the mode is range and this piece of code will be executed.
     * As you can see, I delete an unnecessary extra conditional.
     */
    if (!output.endDate) {
      return timeOfThisKey === output.startDate?.getTime()
        ? selectedColors
        : notSelectedColors;
    }

    const startDate = output.startDate as Date;
    const isThisDayInSelectedRange =
      timeOfThisKey >= startDate.getTime() &&
      timeOfThisKey <= output.endDate.getTime();
    return isThisDayInSelectedRange ? selectedColors : notSelectedColors;
  };

  const { bgc, text: textColor } = getColor();

  return (
    <TouchableOpacity
      onPress={onKeyPress}
      style={[styles.day, { backgroundColor: bgc }, styleOptions.day]}>
      <Text
        style={[styles.day_text, { color: textColor }, styleOptions.day_text]}>
        {' '}
        {day.date}{' '}
      </Text>
    </TouchableOpacity>
  );
};
