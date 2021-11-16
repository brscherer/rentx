import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from 'react-native-responsive-fontsize'
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

import Logo from '../../assets/logo.svg'

import api from '../../services/api'

import { CarDTO } from '../../dtos/CarDTO'

import { Car } from "../../components/Car/Car";
import { Loader } from "../../components/Loader/Loader";

import {
  CarList,
  Container,
  Header,
  HeaderContent,
  TotalCars,
} from "./styles";
import { RoutesEnum } from "../../routes/types";

const AnimatedButton = Animated.createAnimatedComponent(RectButton)

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true)

  const positionY = useSharedValue(0)
  const positionX = useSharedValue(0)

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ]
    } 
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: { [key: string]: number }) {
      ctx.positionX = positionX.value
      ctx.positionY = positionY.value
    },
    onActive(event, ctx) {
      positionX.value = ctx.positionX + event.translationX
      positionY.value = ctx.positionY + event.translationY
    },
    onEnd() {
      positionX.value = withSpring(0)
      positionY.value = withSpring(0)
    },
  })

  const theme = useTheme()
  const navigation = useNavigation()

  function handleCarDetails(car: CarDTO) {
    navigation.navigate(RoutesEnum.CAR_DETAILS, { car })
  }
  
  function handleOpenMyCars() {
    navigation.navigate(RoutesEnum.MY_CARS)
  }

  useEffect(() => {
    async function fetchCars(){
      try {
        const response = await api.get('/cars')
        setCars(response.data)
      } catch (error) {
        // Services such as TrackJS or Datadog could be used for observability and error tracking
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars();
  }, [])

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total of {cars.length} cars
          </TotalCars>
        </HeaderContent>
      </Header>

      {
        loading 
          ? <Loader /> 
          : <CarList
              data={cars}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
            />
      }
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 22,
              right: 22,
            }
          ]}
        >
          <AnimatedButton onPress={handleOpenMyCars} style={[styles.button, { backgroundColor: theme.colors.main }]}>
            <Ionicons
              name="ios-car-sport" 
              size={32}
              color={theme.colors.shape}
            />
          </AnimatedButton>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  )
}