import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Accessory } from '../../components/Accessory/Accessory'
import { BackButton } from '../../components/BackButton/BackButton'
import { ImageSlider } from '../../components/ImageSlider/ImageSlider'

import { CarDTO } from '../../dtos/CarDTO'

import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

import { 
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
} from './styles'
import { Button } from '../../components/Button/Button'

import { RoutesEnum, RouteParams } from '../../routes/types'

export function CarDetails(){
  const navigation = useNavigation()
  const route = useRoute()
  const { car } = route.params as RouteParams

  function handleGoBak() {
    navigation.goBack()
  }

  function handleChooseRentalPeriod() {
    navigation.navigate(RoutesEnum.SCHEDULING, { car })
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBak} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>
      
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory
                key={accessory.type} 
                name={accessory.name} 
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
        </Accessories>

        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button title="Choose rental period" onPress={handleChooseRentalPeriod} />
      </Footer>
    </Container>
  )
}