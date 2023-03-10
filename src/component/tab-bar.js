import React from 'react'
import { View, Text } from 'react-native';
import Box from './box';
import Button from './button';
import { Search, Bookmark, RotateCcw } from './icons'
import theme from '../utils/theme'
import DropShadow from "react-native-drop-shadow";


function TabBar({ state, descriptors, navigation }) {
    return (
        <DropShadow style={{
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 24,
            shadowOffset:{
                width:0,
                height:4,
            }
        }}>
        <Box
            flexDirection="row"
            bg="white">
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };



                return label === 'SearchHome' ? (
                    <Box key={label} p={15} mt={-15} borderRadius="full" bg="white" >
                        <Button
                            size={56}
                            bg="red"
                            height={56}
                            borderRadius="full"
                            onPress={onPress}
                        >
                            <Search stroke="white" />
                        </Button>
                    </Box>
                ) : (
                    <Button
                        key={label}
                        pt={6}
                        flexDirection="column"
                        flex={1}
                        height={56}
                        onPress={onPress}>
                        {label === 'History' && <RotateCcw stroke={isFocused ? theme.colors.red : theme.colors.textLight} />}
                        {label === 'Favorite' && <Bookmark stroke={isFocused ? theme.colors.red : theme.colors.textLight} />}
                        <Box size={4} bg={isFocused ? "red" : ""} mt={6} borderRadius="full" />
                    </Button>
                )

            })}
        </Box>
        </DropShadow>
    );
}

export default TabBar