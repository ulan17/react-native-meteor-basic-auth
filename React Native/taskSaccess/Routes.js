import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from '.components/screens/Home';

const AppNavigator = createStackNavigator({
 Home: {
   screen: Home
 }
});

export default createAppContainer(AppNavigator);