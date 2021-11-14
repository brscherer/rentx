import React from "react";
import { StatusBar } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg'

import { Car } from "../../components/Car/Car";

import {
  Container,
  Header,
  HeaderContent,
  TotalCars
} from "./styles";

export function Home(){
  const carData = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'per day',
      price: 120,
    },
    thumbnail: 'https://pngimg.com/uploads/audi/audi_PNG99491.png'
  }

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
      <Car data={carData}></Car>
    </Container>
  )
}