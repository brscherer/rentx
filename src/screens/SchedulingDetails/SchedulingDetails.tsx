import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'

import api from '../../services/api'

import { Accessory } from '../../components/Accessory/Accessory'
import { BackButton } from '../../components/BackButton/BackButton'
import { ImageSlider } from '../../components/ImageSlider/ImageSlider'
import { Button } from '../../components/Button/Button'

import { RentalPeriodData } from '../../models/rentalPeriod'

import { RouteParams, RoutesEnum } from '../../routes/types'

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
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './styles'
import { format, parseISO } from 'date-fns'

export function SchedulingDetails(){
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodData>({} as RentalPeriodData)
  const [loading, setLoading] = useState(false)

  const theme = useTheme()
  const navigation = useNavigation()
  const route = useRoute()
  const { car, dates } = route.params as RouteParams & { dates: string[] } // treat dates property as mandatory

  const rentTotal = dates.length * car.rent.price;

  function handleGoBack() {
    navigation.goBack()
  }

  async function getSchedulesByCar() {
    try {
      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`)

      return schedulesByCar.data.unavailable_dates
    } catch {
      return []
    }
  }

  async function handleConfirmRental() {
    setLoading(true)

    try {
      await api.post(`/schedules_byuser`, {
        car,
        user_id: 1, // @TODO: implement social login and use correct id;
        startDate: format(parseISO(dates[0]), 'MM/dd/yyyy'),
        endDate: format(parseISO(dates[dates.length - 1]), 'MM/dd/yyyy'),
      })

      const schedulesByCar = await getSchedulesByCar()

      const unavailable_dates = [
        ...schedulesByCar,
        ...dates
      ]

      if (schedulesByCar.length) {
        await api.put(`/schedules_bycars/${car.id}`, {
          id: car.id,
          unavailable_dates
        })
      } else {
        await api.post(`/schedules_bycars`, {
          id: car.id,
          unavailable_dates
        })
      }

      navigation.navigate(RoutesEnum.SCHEDULING_COMPLETE)
    } catch (error) {
      Alert.alert('Error processing your scheduling')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setRentalPeriod({
      startFormatted: format(parseISO(dates[0]), 'MM/dd/yyyy'),
      endFormatted: format(parseISO(dates[dates.length - 1]), 'MM/dd/yyyy'),
    })
  }, [])

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather 
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>From</DateTitle>
            <DateValue>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <Feather 
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>To</DateTitle>
            <DateValue>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>

        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>$ {car.rent.price} x{dates && dates.length} days</RentalPriceQuota>
            <RentalPriceTotal>$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          title="Rental now"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  )
}