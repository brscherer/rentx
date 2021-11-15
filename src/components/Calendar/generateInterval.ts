import { eachDayOfInterval, format, parseISO } from 'date-fns'

import { MarkedDateProps, DayProps } from './Calendar'
import theme from '../../styles/theme'

/**
 * Used for enable different style for start, end, and the range in between
 * @param start DayProps
 * @param end DayProps
 */
export function generateInterval(start: DayProps, end: DayProps): MarkedDateProps {
  return eachDayOfInterval({
    start: parseISO(start.dateString),
    end: parseISO(end.dateString),
  }).reduce((interval, item) => {
    const date = format(item, 'yyyy-MM-dd')
    const color = start.dateString === date || end.dateString === date
      ? theme.colors.main
      : theme.colors.main_light
    const textColor = start.dateString === date || end.dateString === date
      ? theme.colors.main_light
      : theme.colors.main

    return {
      ...interval,
      [date]: {
        color,
        textColor
      }
    }
  }, {})
}