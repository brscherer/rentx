import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../screens/Home/Home'
import { CarDetails } from '../screens/CarDetails/CarDetails'
import { Scheduling } from '../screens/Scheduling/Scheduling'
import { SchedulingDetails } from '../screens/SchedulingDetails/SchedulingDetails'
import { SchedulingComplete } from '../screens/SchedulingComplete/SchedulingComplete'
import { MyCars } from '../screens/MyCars/MyCars'
import { RoutesEnum } from './types'

const { Navigator, Screen } = createNativeStackNavigator()

export function StackRoutes(){
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={RoutesEnum.HOME} component={Home} />
      <Screen name={RoutesEnum.CAR_DETAILS} component={CarDetails} />
      <Screen name={RoutesEnum.SCHEDULING} component={Scheduling} />
      <Screen name={RoutesEnum.SCHEDULING_DETAILS} component={SchedulingDetails} />
      <Screen name={RoutesEnum.SCHEDULING_COMPLETE} component={SchedulingComplete} />
      <Screen name={RoutesEnum.MY_CARS} component={MyCars} />
    </Navigator>
  )
}