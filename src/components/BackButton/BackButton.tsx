import React from 'react'
import { BorderlessButtonProps } from 'react-native-gesture-handler'
import { useTheme } from 'styled-components'
import { MaterialIcons } from '@expo/vector-icons'

import { Container } from './styles'

type BackButtonProps = {
  color?: string
}

export function BackButton({ color, ...rest }: BackButtonProps & BorderlessButtonProps){
  const theme = useTheme()

  return (
    <Container {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color || theme.colors.text}
      />
    </Container>
  )
}