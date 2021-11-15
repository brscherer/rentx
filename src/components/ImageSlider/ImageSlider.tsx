import React, { useState, useRef } from 'react'
import { FlatList, ViewToken } from 'react-native'

import { 
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from './styles'

type ImageSliderProps = {
  imagesUrl: string[]
}

type ChangeImageProps = {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: ImageSliderProps){
  const [activeIndex, setActiveIndex] = useState(0)

  const indexChanged = useRef((info: ChangeImageProps) => {
    const { index } = info.viewableItems[0]

    setActiveIndex(index ?? 0)
  })

  return (
    <Container>
      <ImageIndexes>
        {
          imagesUrl.map((_, index) => (
            <ImageIndex
              key={String(index)}
              active={activeIndex === index}
            />
          ))
        }
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={key => key}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage
              source={{ uri: item }}
              resizeMode="contain"
            />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  )
}