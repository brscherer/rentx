import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { useTheme } from 'styled-components'

import { BackButton } from '../../components/BackButton/BackButton'
import { Button } from '../../components/Button/Button'
import { Calendar } from '../../components/Calendar/Calendar'

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
import { RoutesEnum } from '../../routes/types'

export function Scheduling() {
  const theme = useTheme()
  const navigation = useNavigation()

  function handleGoBak() {
    navigation.goBack()
  }

  function handleConfirmPeriod() {
    navigation.navigate(RoutesEnum.SCHEDULING_DETAILS)
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
            <DateValue selected={false}></DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>To</DateTitle>
            <DateValue selected={false}></DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title="Confirm" onPress={handleConfirmPeriod} />
      </Footer>
    </Container>
  )
}
