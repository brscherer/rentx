import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize'

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
  TotalCars
} from "./styles";
import { RoutesEnum } from "../../routes/types";

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation()

  function handleCarDetails(car: CarDTO) {
    navigation.navigate(RoutesEnum.CAR_DETAILS, { car })
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
            Total of 12 cars
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
        
    </Container>
  )
}