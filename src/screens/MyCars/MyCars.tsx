import React, { useState, useEffect } from 'react'
import { FlatList, StatusBar } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/core'

import { BackButton } from '../../components/BackButton/BackButton'
import { Car } from '../../components/Car/Car'
import { LoaderAnimated } from '../../components/LoaderAnimated/LoaderAnimated'

import api from '../../services/api'

import { CarDTO } from '../../dtos/CarDTO'

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles'

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([])
  const [loading, setLoading] = useState(true)

  const theme = useTheme()
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1')
        setCars(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <BackButton onPress={handleGoBack} color={theme.colors.shape} />

        <Title>
          Your appointments,{'\n'}
          are here.
        </Title>

        <SubTitle>
          Comfort, safety and practicality.
        </SubTitle>
      </Header>

      { loading 
          ? <LoaderAnimated />
          : <Content>
              <Appointments>
                <AppointmentsTitle>Confirmed appointments</AppointmentsTitle>
                <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
              </Appointments>
      
              <FlatList 
                data={cars}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <CarWrapper>
                    <Car data={item.car} />
                    <CarFooter>
                      <CarFooterTitle>Period</CarFooterTitle>
                      <CarFooterPeriod>
                        <CarFooterDate>{item.startDate}</CarFooterDate>
                        <AntDesign
                          name="arrowright"
                          size={20}
                          color={theme.colors.title}
                          style={{ marginHorizontal: 10 }}
                        />
                        <CarFooterDate>{item.endDate}</CarFooterDate>
                      </CarFooterPeriod>
                    </CarFooter>
                  </CarWrapper>
      
                )}
              />
            </Content>
      }

    </Container>
  )
}
