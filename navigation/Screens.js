// import React from "react";

// function AppStack(props) {
//   return (
//     <Drawer.Navigator
//       style={{ flex: 1 }}
//       drawerContent={props => (
//         <CustomDrawerContent {...props} profile={profile} />
//       )}
//       drawerStyle={{
//         backgroundColor: "white",
//         width: width * 0.8
//       }}
//       drawerContentOptions={{
//         activeTintColor: "white",
//         inactiveTintColor: "#000",
//         activeBackgroundColor: materialTheme.COLORS.ACTIVE,
//         inactiveBackgroundColor: "transparent",
//         itemStyle: {
//           width: width * 0.74,
//           paddingHorizontal: 12,
//           // paddingVertical: 4,
//           justifyContent: "center",
//           alignContent: "center",
//           // alignItems: 'center',
//           overflow: "hidden"
//         },
//         labelStyle: {
//           fontSize: 18,
//           fontWeight: "normal"
//         }
//       }}
//       initialRouteName="Home"
//     >
//       <Drawer.Screen
//         name="Home"
//         component={HomeStack}
//         options={{
//           drawerIcon: ({ focused }) => (
//             <Icon
//               size={16}
//               name="shop"
//               family="GalioExtra"
//               color={focused ? "white" : materialTheme.COLORS.MUTED}
//             />
//           )
//         }}
//       />
//       <Drawer.Screen
//         name="Woman"
//         component={ProScreen}
//         options={{
//           drawerIcon: ({ focused }) => (
//             <Icon
//               size={16}
//               name="md-woman"
//               family="ionicon"
//               color={focused ? "white" : materialTheme.COLORS.MUTED}
//               style={{ marginLeft: 4, marginRight: 4 }}
//             />
//           )
//         }}
//       />
//       <Drawer.Screen
//         name="Man"
//         component={ProScreen}
//         options={{
//           drawerIcon: ({ focused }) => (
//             <Icon
//               size={16}
//               name="man"
//               family="entypo"
//               color={focused ? "white" : materialTheme.COLORS.MUTED}
//             />
//           )
//         }}
//       />
//       <Drawer.Screen
//         name="Kids"
//         component={ProScreen}
//         options={{
//           drawerIcon: ({ focused }) => (
//             <Icon
//               size={16}
//               name="baby"
//               family="GalioExtra"
//               color={focused ? "white" : materialTheme.COLORS.MUTED}
//             />
//           )
//         }}
//       />
//       <Drawer.Screen
//         name="New Collection"
//         component={ProScreen}
//         options={{
//           drawerIcon: ({ focused }) => (
//             <Icon
//               size={16}
//               name="grid-on"
//               family="material"
//               color={focused ? "white" : materialTheme.COLORS.MUTED}
//             />
//           )
//         }}
//       />
//       <Drawer.Screen
//         name="Profile"
//         component={ProfileStack}
//         options={{
//           drawerIcon: ({ focused }) => (
//             <Icon
//               size={16}
//               name="circle-10"
//               family="GalioExtra"
//               color={focused ? "white" : materialTheme.COLORS.MUTED}
//             />
//           )
//         }}
//       />
//       <Drawer.Screen
//         name="Settings"
//         component={SettingsStack}
//         options={{
//           drawerIcon: ({ focused }) => (
//             <Icon
//               size={16}
//               name="gears"
//               family="font-awesome"
//               color={focused ? "white" : materialTheme.COLORS.MUTED}
//               style={{ marginRight: -3 }}
//             />
//           )
//         }}
//       />
//       <Drawer.Screen
//         name="Components"
//         component={ComponentsStack}
//         options={{
//           drawerIcon: ({ focused }) => (
//             <Icon
//               size={16}
//               name="md-switch"
//               family="ionicon"
//               color={focused ? "white" : materialTheme.COLORS.MUTED}
//               style={{ marginRight: 2, marginLeft: 2 }}
//             />
//           )
//         }}
//       />
//       <Drawer.Screen
//         name="Sign In"
//         component={ProScreen}
//         options={{
//           drawerIcon: ({ focused }) => (
//             <Icon
//               size={16}
//               name="ios-log-in"
//               family="ionicon"
//               color={focused ? "white" : materialTheme.COLORS.MUTED}
//             />
//           )
//         }}
//       />
//       <Drawer.Screen
//         name="Sign Up"
//         component={ProScreen}
//         options={{
//           drawerIcon: ({ focused }) => (
//             <Icon
//               size={16}
//               name="md-person-add"
//               family="ionicon"
//               color={focused ? "white" : materialTheme.COLORS.MUTED}
//             />
//           )
//         }}
//       />
//     </Drawer.Navigator>
//   );
// }

// export default function OnboardingStack(props) {
//   return (
//     <Stack.Navigator mode="card" headerMode="none">
//       <Stack.Screen
//         name="Onboarding"
//         component={OnboardingScreen}
//         option={{
//           headerTransparent: true
//         }}
//       />
//       <Stack.Screen name="App" component={AppStack} />
//     </Stack.Navigator>
//   );
// }
