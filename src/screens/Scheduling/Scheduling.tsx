import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { StatusBar, Alert } from 'react-native'
import { useTheme } from 'styled-components'
import { format, parseISO } from 'date-fns'

import { BackButton } from '../../components/BackButton/BackButton'
import { Button } from '../../components/Button/Button'
import { 
  Calendar,
  DayProps,
  generateInterval, 
  MarkedDateProps
} from '../../components/Calendar/Calendar'

import { RoutesEnum, RouteParams } from '../../routes/types'

import { RentalPeriodData } from '../../models/rentalPeriod'

import ArrowSvg from '../../assets/arrow.svg'

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles'

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps)
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodData>({} as RentalPeriodData)

  const theme = useTheme()
  const navigation = useNavigation()
  const route = useRoute()
  const { car } = route.params as RouteParams

  function handleGoBak() {
    navigation.goBack()
  }

  function handleConfirmPeriod() {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert('Select date range to rent')
      return;
    }

    navigation.navigate(RoutesEnum.SCHEDULING_DETAILS, {
      car,
      dates: Object.keys(markedDates)
    })
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let end = date

    if (start.timestamp > end.timestamp) {
      start = end
      end = start
    }

    setLastSelectedDate(end)
    const interval = generateInterval(start, end)
    setMarkedDates(interval)

    const startDate = Object.keys(interval)[0]
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1]

    setRentalPeriod({
      startFormatted: format(parseISO(startDate), 'MM/dd/yyyy'),
      endFormatted: format(parseISO(endDate), 'MM/dd/yyyy'),
    })
  }

  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <BackButton onPress={handleGoBak} color={theme.colors.shape} />

        <Title>
          Choose one{'\n'}
          start date and{'\n'}
          end of rent
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>From</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>To</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar 
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button title="Confirm" onPress={handleConfirmPeriod} />
      </Footer>
    </Container>
  )
}
