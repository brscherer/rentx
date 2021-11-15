import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar, useWindowDimensions } from 'react-native'

import { ConfirmButton } from '../../components/ConfirmButton/ConfirmButton'

import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'

import {
  Container,
  Content,
  Title,
  Message,
  Footer,
} from './styles'
import { RoutesEnum } from '../../routes/types'

export function SchedulingComplete(){
  const { width } = useWindowDimensions()
  const navigation = useNavigation()

  function handleConfirm() {
    navigation.navigate(RoutesEnum.HOME)
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Car rented!</Title>

        <Message>
          Now you just need to go{'\n'}
          to the RENTX dealership{'\n'}
          pick up your car.
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </Footer>
    </Container>
  )
}
