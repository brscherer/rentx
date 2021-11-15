import React from 'react'
import { useTheme } from 'styled-components'
import { RectButtonProps } from 'react-native-gesture-handler'

import {
  Container,
  Title,
} from './styles'

type ButtonProps = {
  title: string;
  color?: string;
}

export function Button({ title, color, ...rest }: ButtonProps & RectButtonProps){
  const theme = useTheme()

  return (
    <Container color={color || theme.colors.main} {...rest}>
      <Title>
        {title}
      </Title>
    </Container>
  )
}