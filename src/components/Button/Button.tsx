import React from 'react'
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'
import { RectButtonProps } from 'react-native-gesture-handler'

import {
  Container,
  Title,
} from './styles'

type ButtonProps = {
  title: string;
  color?: string;
  loading?: boolean
}

export function Button({ title, color, enabled = true, loading = false, ...rest }: ButtonProps & RectButtonProps){
  const theme = useTheme()

  return (
    <Container 
      color={color || theme.colors.main}
      enabled={enabled}
      style={{ opacity: (!enabled || loading) ? .5 : 1 }}
      {...rest}
    >
      <Title>
        {
          loading
            ? <ActivityIndicator color={theme.colors.shape} />
            : title
        }
      </Title>
    </Container>
  )
}