import React, { FC, useCallback } from 'react';
import format from '../../dateformat';
import { getTranslation, i18nLanguages } from '../../lib/lib';
import { useState, useEffect } from 'react';
import { ChangeYearModal, ChangeYearModalColorOptions } from '../ChangeYearModal';
import useDaysOfMonth from '../../hooks/useDaysOfMonth';
import {
  TouchableOpacity,
  View,
  Text,
  I18nManager,
  ColorValue,
  ViewStyle,
} from 'react-native';
import { styles, DatePickerViewStylesOptions } from './styles';
import { DatePickerMode, DateStringOptions, Day } from '../../types';
import { DayItem, Output } from '../DayItem';
import { DayItemStylesOptions } from '../DayItem/styles';
import { ArrowIcon } from '../ArrowIcon';

I18nManager.allowRTL(false);
/**
 * Change window height to screen height due to an issue in android.
 *
 * @issue https://github.com/react-native-modal/react-native-modal/issues/147#issuecomment-610729725
 */

export type DatePickerViewColorOptions = {
  /** The background color of date picker and that of change year modal. */
  backgroundColor?: ColorValue;
  /** The background color of header. */
  headerColor?: ColorValue;
  /** The color of texts and icons in header. */
  headerTextColor?: ColorValue;
  /** The color of icons in header. */
  headerIconsColor?: ColorValue;
  /** The text color of week days (like Monday, Tuesday ...) which shown below header. */
  weekDaysColor?: ColorValue;
  /** The text color of all the displayed date when not being selected.
   *
   * @abstract Only six-digits HEX code colors (like #ffffff. #fff won't work) are allowed because I do something like this behind the scene.
   */
  dateTextColor?: ColorValue;
  /** The text color of all the displayed date when being selected.
   *
   * @abstract Only six-digits HEX code colors (like #ffffff. #fff won't work) are allowed because I do something like this behind the scene.
   */
  selectedDateTextColor?: ColorValue;
  /** The background color of all the displayed date when being selected.
   *
   * @abstract Only six-digits HEX code colors (like #ffffff. #fff won't work) are allowed because I do something like this behind the scene.
   */
  selectedDateBackgroundColor?: ColorValue;
  /** The text color of the confirm Button. */
  confirmButtonColor?: ColorValue;

  changeYearModal?: ChangeYearModalColorOptions;
};

export type DatePickerViewProps = {
  /**
   * The colorOptions prop contains several color settings. It helps you customize the date picker.
   *
   * @default { backgroundColor: '#ffffff',
   * headerColor: '#4682E9',
   * headerTextColor: '#ffffff',
   * changeYearModalColor: '#4682E9',
   * weekDaysColor: '#4682E9',
   * dateTextColor: '#000000',
   * selectedDateTextColor: '#ffffff',
   * selectedDateBackgroundColor: '#4682E9',
   * confirmButtonColor: '#4682E9'
   * }
   */
  colorOptions?: DatePickerViewColorOptions;

  stylesOptions?: DatePickerViewStylesOptions & DayItemStylesOptions;
  /**
   * Specify the format of dateString. e.g.'yyyyMMdd', 'dd-MM-yyyy'
   *
   * @borrows This property use dateFormat library. you can find more information here: https://github.com/felixge/node-dateformat#mask-options but you can only use the mask part.
   */
  dateStringFormat?: DateStringOptions;
  /**
   * Set this prop to a date if you need to set a limit date when opening the date picker the first time. Only works with 'range' mode.
   */
  endDate?: Date | null;
  /**
   * When it is the first time that the user open this date picker, it will show the month which initialDate is in.
   */
  initialDate?: Date;
  /**
   * Avaliable languages:
   *
   * @enum 'en' | 'cn' | 'de' | 'es' | 'fr' | 'pt'
   */
  language?: i18nLanguages;
  /**
   * The lateset date which is allowed to be selected.
   */
  maxDate?: Date;
  /**
   * The earliest date which is allowed to be selected.
   */
  minDate?: Date;
  /**
   * Customized the modal styles.
   *
   * @type Object
   */
  modalStyles?: ViewStyle;
  /**
   * Set the type of date picker selection.
   *
   * @enum 'single' | 'range'
   * @required
   */
  mode: DatePickerMode;
  /**
   * A callback function which will be called when the Android back button is pressed.
   */
  onBackButtonPress?: () => void;
  /**
   * A callback function which will be called when the backdrop is pressed.
   */
  onBackdropPress?: () => void;
  /**
   * This callback will execute when user presses cancel button.
   *
   * @required
   */
  // onCancel: () => void;
  /**
   * This callback will execute when user presses confirm button.
   *
   * this prop passes an argument `output` For 'single' mode, output contains two properties `date`, `dateString`.
   * As for 'range' mode, it contains four properties `startDate`, `startDateString`, `endDate` and `endDateString`
   *
   * @example
   * #### single mode:
   *
   * ```ts
   * const onConfirm = ({ date: Date, dateString: string }) => {
   *   console.log(date.getTime())
   *   console.log(dateString)
   * }
   * ```
   *
   * #### range mode:
   *
   * ```ts
   * const onConfirm = (output) => {
   *   const {startDate, startDateString, endDate, endDateString} = output
   *   console.log(startDate.getTime())
   *   console.log(startDateString)
   *   console.log(endDate.getTime())
   *   console.log(endDateString)
   * }
   * ```
   *
   * @required
   */
  // onConfirm: (arg: Object) => void;

  onChange: (arg: Object) => void;
  /**
   * Set this prop to a date if you need to set an initial starting date when opening the date picker the first time. Only works with 'range' mode.
   */
  startDate?: Date | null;
  /**
   * Set this prop to `true` if you want to pop up the year modal first. This will force the user to select the year before selecting the date.
   */
  chooseYearFirst?: boolean;
};

export const DatePickerView: FC<DatePickerViewProps> = ({
  colorOptions,
  dateStringFormat,
  endDate,
  initialDate,
  language,
  maxDate,
  minDate,
  mode,
  // onCancel,
  // onConfirm,
  onChange,
  startDate,
  chooseYearFirst,
  stylesOptions = {},
}: DatePickerViewProps) => {
  const [showChangeYearModal, setShowChangeYearModal] = useState(
    chooseYearFirst || false,
  );
  const sevenDays = language
    ? getTranslation(language).weekDays
    : getTranslation('en').weekDays;

  // displayTime defines which month is going to be shown onto the screen
  // For 'single' mode, displayTime is also the initial selected date when opening DatePicker at the first time.
  const [displayTime, setDisplayTime] = useState(initialDate || new Date());
  const year = displayTime.getFullYear();
  const month = displayTime.getMonth(); // 0-base
  const date = displayTime.getDate();
  const TODAY = new Date(year, month, date);

  // output decides which date should be active.
  const [output, setOutput] = useState<Output>(
    mode === 'single'
      ? { date: TODAY, startDate: null, endDate: null }
      : { date: null, startDate: startDate || null, endDate: endDate || null },
  );

  // If user presses cancel, reset 'output' state to this 'originalOutput'
  const [originalOutput, setOriginalOutput] = useState(output);

  const minTime = minDate?.getTime();
  const maxTime = maxDate?.getTime();

  // useDaysOfMonth returns an array that having several objects,
  //  representing all the days that are going to be rendered on screen.
  // Each object contains five properties, 'year', 'month', 'date', 'isCurrentMonth' and 'disabled'.
  const daysArray = useDaysOfMonth(year, month, minTime, maxTime);

  // const onCancelPress = () => {
  //   onCancel();
  //   setTimeout(() => {
  //     // reset output to originalOutput
  //     setOutput(originalOutput);

  //     // originalOutput.startDate will be null only when the user hasn't picked any date using RANGE DatePicker.
  //     // If that's the case, don't reset displayTime to originalOutput but initialDate/new Date()
  //     if (mode === 'range' && !originalOutput.startDate)
  //       return setDisplayTime(initialDate || new Date());

  //     // reset displayTime
  //     return mode === 'single'
  //       ? setDisplayTime(originalOutput.date as Date)
  //       : setDisplayTime(originalOutput.startDate as Date);
  //   }, 300);
  // };

  const autoCompleteEndDate = () => {
    // set endDate to startDate
    output.endDate = output.startDate;

    // After successfully passing arguments in onConfirm, in next life cycle set endDate to null.
    // Therefore, next time when user opens DatePicker he can start from selecting endDate.
    setOutput({ ...output, endDate: null });
  };

  // const onConfirmPress = () => {
  //   if (mode === 'single') {
  //     const dateString = format(output.date as Date, dateStringFormat);
  //     const newOutput = {
  //       ...output,
  //       dateString,
  //       startDate: null,
  //       startDateString: null,
  //       endDate: null,
  //       endDateString: null,
  //     };
  //     onConfirm(newOutput);
  //   } else {
  //     // If have not selected any date, just to onCancel
  //     if (mode === 'range' && !output.startDate) {
  //       return onCancel();
  //     }

  //     //  If have not selected endDate, set it same as startDate
  //     if (!output.endDate) {
  //       autoCompleteEndDate();
  //     }
  //     const startDateString = format(
  //       output.startDate as Date,
  //       dateStringFormat,
  //     );
  //     const endDateString = format(output.endDate as Date, dateStringFormat);
  //     const newOutput = {
  //       ...output,
  //       startDateString,
  //       endDateString,
  //       date: null,
  //       dateString: null,
  //     };
  //     onConfirm(newOutput);
  //   }

  //   // Because the selected dates are confirmed, originalOutput should be updated.
  //   setOriginalOutput({ ...output });

  //   // reset displayTime
  //   setTimeout(() => {
  //     return mode === 'single'
  //       ? setDisplayTime(output.date as Date)
  //       : setDisplayTime(output.startDate as Date);
  //   }, 300);
  // };

  const [btnDisabled, setBtnDisabled] = useState(false);

  console.log('daysArray', daysArray);

  // move to previous month
  const onPrev = () => {
    setBtnDisabled(true);
    setDisplayTime(new Date(year, month - 1, date));
  };

  // move to next month
  const onNext = () => {
    setBtnDisabled(true);
    setDisplayTime(new Date(year, month + 1, date));
  };

  const changeHandler = useCallback(value => {
    setOutput(value);
    if (onChange) {
      onChange(value);
    }
  }, []);

  // Disable Prev & Next buttons for a while after pressing them.
  // Otherwise if the user presses the button rapidly in a short time
  // the switching delay of the calendar is not neglectable
  useEffect(() => {
    if (btnDisabled) {
      setTimeout(setBtnDisabled, 300, false);
    }
  }, [btnDisabled]);

  // destructure colorOptions
  const {
    backgroundColor,
    headerColor,
    headerTextColor,
    headerIconsColor,
    weekDaysColor,
    dateTextColor,
    selectedDateTextColor,
    selectedDateBackgroundColor,
    changeYearModal: changeYearModalColors,
  } = { ...defaultColorOptions, ...colorOptions };

  useEffect(() => {
    setOutput(
      mode === 'single'
        ? { date: TODAY, startDate: null, endDate: null }
        : {
            date: null,
            startDate: startDate || null,
            endDate: endDate || null,
          },
    );
  }, [mode]);

  return (
    <View
      style={[styles.container, { backgroundColor }, stylesOptions.container]}>
      <View
        style={[
          styles.header,
          { backgroundColor: headerColor },
          stylesOptions.header,
        ]}>
        {/* last month */}
        <TouchableOpacity
          style={[styles.changeMonthTO, stylesOptions.changeMonthTO]}
          onPress={onPrev}
          disabled={btnDisabled}>
          <ArrowIcon
            direction="left"
            size={16}
            color={headerIconsColor || headerTextColor}
          />
        </TouchableOpacity>

        {/* displayed year and month */}
        <TouchableOpacity
          onPress={() => {
            setShowChangeYearModal(true);
          }}>
          <Text
            style={[
              styles.header__title,
              { color: headerTextColor },
              stylesOptions.header__title,
            ]}>
            {daysArray.length !== 0 &&
              (language
                ? (getTranslation(language).months as any)[daysArray[10].month]
                : (getTranslation('en').months as any)[
                    daysArray[10].month
                  ])}{' '}
            {daysArray.length !== 0 && daysArray[10].year}
          </Text>
        </TouchableOpacity>

        {/* next month */}
        <TouchableOpacity
          style={[styles.changeMonthTO, stylesOptions.changeMonthTO]}
          onPress={onNext}
          disabled={btnDisabled}>
          <ArrowIcon
            direction="right"
            size={16}
            color={headerIconsColor || headerTextColor}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.keys_container, stylesOptions.keys_container]}>
        {/* week days  */}
        <View
          style={[styles.weekDays_container, stylesOptions.weekDays_container]}>
          {sevenDays.map((weekDay: string, index: number) => (
            <View
              style={[styles.keys, stylesOptions.keys]}
              key={index.toString()}>
              <Text
                style={[
                  styles.weekDays,
                  stylesOptions.weekDays,
                  { color: weekDaysColor },
                ]}>
                {weekDay}
              </Text>
            </View>
          ))}
        </View>

        {/* every days */}
        {daysArray.map((day: Day, i: number) => (
          <DayItem
            key={day.year.toString() + day.month.toString() + i.toString()}
            day={day}
            mode={mode}
            output={output}
            setOutput={changeHandler}
            colorOptions={{
              dateTextColor,
              backgroundColor,
              selectedDateTextColor,
              selectedDateBackgroundColor,
            }}
            styleOptions={{
              day: stylesOptions.day,
              day_text: stylesOptions.day_text,
            }}
          />
        ))}
      </View>
      <ChangeYearModal
        isVisible={showChangeYearModal}
        dismiss={() => {
          setShowChangeYearModal(false);
        }}
        displayTime={displayTime}
        setDisplayTime={setDisplayTime}
        colorOptions={changeYearModalColors}
      />
    </View>
  );
};

DatePickerView.defaultProps = {
  dateStringFormat: 'yyyy-mm-dd',
  modalStyles: { justifyContent: 'center' },
};

// Notice: only six-digit HEX values are allowed.
const defaultColorOptions = {
  backgroundColor: '#FFFFFF',
  headerColor: '#FFFFFF',
  headerTextColor: '#222222',
  headerIconsColor: '#A7A7A7',
  changeYearModalColor: '#4682E9',
  weekDaysColor: '#A7A7A7',
  dateTextColor: '#000000',
  selectedDateTextColor: '#FFFFFF',
  selectedDateBackgroundColor: '#4682E9',
  confirmButtonColor: '#4682E9',
};
