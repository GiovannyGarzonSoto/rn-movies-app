import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import DetailsScreen from '../screens/DetailsScreen'

export type RootStackParams = {
    Home: undefined
    Details: {movieId: number}
}

const Stack = createStackNavigator<RootStackParams>()

export const Navigation =  () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  )
}