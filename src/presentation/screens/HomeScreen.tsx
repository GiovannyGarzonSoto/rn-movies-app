import React from 'react'
import { Text, View } from 'react-native'
import { useMovies } from '../hooks/useMovies'
import { ScrollView } from 'react-native-gesture-handler'
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context'
import { PosterCarousel } from '../components/movies/PosterCarousel'
import { HorizontalCarousel } from '../components/movies/HorizontalCarousel'

const HomeScreen = () => {
  const { top } = useSafeAreaInsets()

  const { isLoading, popular, nowPlaying, topRated, upcoming, popularNextPage } = useMovies()

  if (isLoading) {
    return (<Text>...Cargando</Text>)
  }

  return (
    <ScrollView>
      <View style={{ marginTop: top + 20, paddingBottom: 30 }}>
        <PosterCarousel movies={nowPlaying} />

        <HorizontalCarousel movies={popular} title='Populares' loadNextPage={popularNextPage} />
        <HorizontalCarousel movies={topRated} title='Mejor puntuadas' />
        <HorizontalCarousel movies={upcoming} title='Proximas a estrenar' />

      </View>
    </ScrollView>
  )
}

export default HomeScreen
