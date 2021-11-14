import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import {
  Container,
  Title
} from './styles'

interface ConfirmButtonProps extends RectButtonProps {
  title: string
}

export function ConfirmButton({ title }: ConfirmButtonProps){
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  )
}