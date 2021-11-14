import React from "react";
import { StatusBar } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg'

import { Car } from "../../components/Car/Car";

import {
  CarList,
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

      <CarList
        data={[1,2,3,4,5,6,7,8]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => <Car data={carData}></Car>}
      />
        
    </Container>
  )
}