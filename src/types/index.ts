export type DatePickerMode = 'single' | 'range';

export interface Day {
  date: number;
  disabled: boolean;
  isCurrentMonth: boolean;
  month: number;
  year: number;
}

export type DateStringOptions =
  | 'ddd mmm dd yyyy HH:MM:ss'
  | 'default'
  | 'm/d/yy'
  | 'shortDate'
  | 'mm/dd/yyyy'
  | 'paddedShortDate'
  | 'mmm d, yyyy'
  | 'mediumDate'
  | 'mmmm d, yyyy'
  | 'longDate'
  | 'dddd, mmmm d, yyyy'
  | 'fullDate'
  | 'h:MM TT'
  | 'shortTime'
  | 'h:MM:ss TT'
  | 'mediumTime'
  | 'h:MM:ss TT Z'
  | 'longTime'
  | 'yyyy-mm-dd'
  | 'isoDate'
  | 'HH:MM:ss'
  | 'isoTime'
  | "yyyy-mm-dd'T'HH:MM:sso"
  | 'isoDateTime'
  | "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
  | 'isoUtcDateTime'
  | 'ddd, dd mmm yyyy HH:MM:ss Z'
  | 'expiresHeaderFormat';
