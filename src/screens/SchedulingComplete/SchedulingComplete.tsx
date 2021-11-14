import React from 'react'
import { useWindowDimensions } from 'react-native'

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

export function SchedulingComplete(){
  const { width } = useWindowDimensions()

  return (
    <Container>
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
        <ConfirmButton title="OK" />
      </Footer>
    </Container>
  )
}
