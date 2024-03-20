import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home } from "../Home/Home";
import { Profile } from "../Profile/Profile";
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { ContentIcon, TextIcon } from "./StyleMain";

const BottomTab = createBottomTabNavigator();
export const Main = () => {
    return (

        <BottomTab.Navigator

            initialRouteName="Home"
            screenOptions={({ route }) => ({

                tabBarStyle: { backgroundColor: "#FFFFFF", height: 80, paddingTop: 10 },
                tabBarActiveBackgroundColor: "transparent",
                tabBarShowLabel: false,
                headerShown: false,
                tabBarIcon: ({ focused }) => {

                    if (route.name === "Home") {
                        return (
                            <ContentIcon tabBarActiveBackgroundColor={focused ? "#ECF2FF" : "transparent"}>
                                <FontAwesome5 name="calendar-check" size={22} color="#607EC5" />

                                {focused && <TextIcon>Agenda</TextIcon>}

                            </ContentIcon>
                        )
                    }
                    else {
                        return (
                            <ContentIcon tabBarActiveBackgroundColor={focused ? "#ECF2FF" : "transparent"}>
                                <FontAwesome5 name="user-circle" size={22} color="#607EC5" />

                                {focused && <TextIcon>Profile</TextIcon>}

                            </ContentIcon>
                        )

                    }
                }
            })}
        >

            {/* Criar Rota Home  */}

            <BottomTab.Screen
                name="Home"
                component={Home}
            />
            <BottomTab.Screen
                name="Profile"
                component={Profile}
            />

            {/* Criar Rota Perfil  */}
        </BottomTab.Navigator>
    )
}