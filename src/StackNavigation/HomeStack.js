import React from 'react';
import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../constants';
import {Icon} from 'react-native-elements';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from '../Tabs/HomeScreen';
import CategoriesScreen from '../Tabs/Categories/CategoriesScreen';
import ProfileScreen from '../Tabs/ProfileScreen';
import TermsCondition from '../ProfileComponents/TermsCondition';
import ProfileDetails from '../ProfileComponents/UserDetails/ProfileDetails';
import ProfileSettings from '../ProfileComponents/ProfileSettings';
import BusinessInfo from '../ProfileComponents/BusinessComponents/BusinessInfo';
import ServiceInfo from '../ProfileComponents/ServiceComponents/ServiceInfo';
import ContactUs from '../ProfileComponents/ContactUs';
import BusinessDetails from '../ProfileComponents/BusinessComponents/BusinessDetails';
import BusinessSaved from '../ProfileComponents/BusinessComponents/BusinessSaved';
import CustomDrawer from '../Components/CustomDrawer';
import Committee from '../Tabs/Drawer/Committee';
import HouseOwners from '../Tabs/HouseOwner/HouseOwners';
import Helpline from '../Tabs/Helpline';
import SearchScreen from '../Tabs/SearchScreen';
import BusinessListed from '../ProfileComponents/BusinessComponents/BusinessListed';
import RoomsFlats from '../Tabs/HouseOwner/RoomsFlats';
import Addroom from '../Tabs/HouseOwner/Addroom';
import EditProfile from '../ProfileComponents/UserDetails/EditProfile';
import FeedBacks from '../Tabs/../ProfileComponents/FeedBacks';
import ServiceEdit from '../ProfileComponents/ServiceComponents/ServiceEdit';
import ServiceSaved from '../ProfileComponents/ServiceComponents/ServiceSaved';
import Notification from '../Tabs/Notification';
import AllRoomsHostals from '../Tabs/HouseOwner/AllRoomsHostals';
import BusinessEdit from '../ProfileComponents/BusinessComponents/BusinessEdit';
import HostelListed from '../Tabs/HouseOwner/HostelListed';
import ServiceAddDetails from '../ProfileComponents/ServiceComponents/ServiceAddDetails';
import ServiceList from '../Tabs/../ProfileComponents/ServiceComponents/CategoriesScreens/ServiceList';
import ServiceInformation from '../Tabs/../ProfileComponents/ServiceComponents/CategoriesScreens/ServiceInformation';
import BusinessInformation from '../ProfileComponents/BusinessComponents/BusinessInformation';
import SearchResult from '../Tabs/SearchScreens/SearchResult';
import AddMembers from '../Tabs/Members/AddMembers';
import AddMembersDetails from '../Tabs/Members/AddMembersDetails';
import MemberInfo from '../Tabs/Members/MemberInfo';
import EditMember from '../Tabs/Members/EditMember';
import MMFemale from '../Tabs/Matrimonial/MMFemale';
import MMMale from '../Tabs/Matrimonial/MMMale';
import Events from '../ProfileComponents/EventsComponets/Events';
import Gallery from '../ProfileComponents/GalleryComponents/Gallery';
import MoreImg from '../ProfileComponents/GalleryComponents/MoreImg';
import EventInfo from '../ProfileComponents/EventsComponets/EventInfo';
import SearchBus from '../Tabs/SearchScreens/SearchBus';
import SearchBusResult from '../Tabs/SearchScreens/SearchBusResult';
import HOServiceEdit from '../Tabs/HouseOwner/HOServiceEdit';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const TopTab = createMaterialTopTabNavigator();

const HomeStack = () => {
  const arr = [
    {name: 'Feed', component: MyDrawer, headerShown: false},
    {
      name: 'Terms & Condition',
      component: TermsCondition,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'Personal Details',
      component: ProfileDetails,
      headerShown: false,
    },
    {
      name: 'Settings',
      component: ProfileSettings,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
      title: 'Change Password',
    },
    {
      name: 'Contact Us',
      component: ContactUs,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'Committee',
      component: Committee,
      headerShown: false,
    },
    {
      name: 'Service List',
      component: ServiceList,
      headerShown: false,
    },
    {
      name: 'House Owners',
      component: HouseOwners,
      headerShown: false,
    },
    {
      name: 'Helpline',
      component: Helpline,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'Feedback',
      component: FeedBacks,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'Search',
      component: SearchScreen,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'Search Result',
      component: SearchResult,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'Business listed',
      component: BusinessListed,
      headerShown: false,
    },
    {
      name: 'Rooms/Flats',
      component: MyTopTabs,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
      headerShown: true,
      title: 'Rooms/PG',
    },
    {
      name: 'Add room',
      component: Addroom,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'Edit Personal Details',
      component: EditProfile,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'Notification',
      component: Notification,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'ServiceAddDetails',
      component: ServiceAddDetails,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
      title: 'Service Details',
    },
    {
      name: 'Business Infoo',
      component: BusinessInfo,
      headerShown: false,
    },
    {
      name: 'Service Info',
      component: ServiceInfo,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
      title: 'Add Service Provider',
    },
    {
      name: 'Business Details',
      component: BusinessDetails,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'ServiceEdit',
      component: ServiceEdit,
      title: 'Service Edit',
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'BusinessEdit',
      component: BusinessEdit,
      title: 'Business Edit',
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'Business Saved',
      component: BusinessSaved,
      headerShown: false,
    },
    {
      name: 'Service Information',
      component: ServiceInformation,
      headerShown: false,
    },
    {
      name: 'Business Information',
      component: BusinessInformation,
      headerShown: false,
    },
    {
      name: 'ServiceSaved',
      component: ServiceSaved,
      headerShown: false,
    },
    {
      name: 'Add Members',
      component: AddMembers,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'Add Members Details',
      component: AddMembersDetails,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
      title: 'Members Details',
    },
    {
      name: 'Edit Member Details',
      component: EditMember,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'Member Information',
      component: MemberInfo,
      headerShown: false,
    },
    {
      name: 'Matrimonial',
      component: MyMatrimonial,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
      headerShown: true,
    },
    {
      name: 'Gallery',
      component: Gallery,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
    {
      name: 'MoreImg',
      component: MoreImg,
      headerShown: false,
    },
    {
      name: 'Events',
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
      component: Events,
    },
    {
      name: 'EventInfo',
      component: EventInfo,
      headerShown: false,
    },
    {
      name: 'Search Business',
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
      component: SearchBus,
    },
    {
      name: 'SearchBusResult',
      component: SearchBusResult,
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
      title: 'Search Result',
    },
    {
      name: 'HOServiceEdit',
      component: HOServiceEdit,
      title: 'Service Edit',
      headerTitleStyle: styles.headerStyle,
      headerTintColor: COLORS.textColor,
      headerShadowVisible: false,
    },
  ];

  return (
    <Stack.Navigator screenOptions={{animation: 'fade_from_bottom'}}>
      {arr.map(data => (
        <Stack.Screen
          key={data.name}
          name={data.name}
          component={data.component}
          options={() => ({
            headerShown: data.headerShown,
            headerTransparent: data.headerTransparent,
            headerTitleStyle: data.headerTitleStyle,
            headerTintColor: data.headerTintColor,
            headerShadowVisible: data.headerShadowVisible,
            headerBackVisible: data.headerBackVisible,
            title: data.title,
            headerStyle: data.headerStyle,
          })}
        />
      ))}
    </Stack.Navigator>
  );
};

function MyTopTabs() {
  const TopTabsArr = [
    {component: AllRoomsHostals, name: 'All', ID: '0'},
    {component: HostelListed, name: 'Hostel', ID: '4'},
    {component: RoomsFlats, name: '1 BHK', ID: '1'},
    {component: RoomsFlats, name: '2 BHK', ID: '2'},
    {component: RoomsFlats, name: '3 BHK', ID: '3'},
  ];
  return (
    <TopTab.Navigator>
      {TopTabsArr.map(data => {
        return (
          <TopTab.Screen
            key={data.name}
            name={data.ID}
            component={data.component}
            options={{
              tabBarActiveTintColor: COLORS.primary,
              tabBarInactiveTintColor: COLORS.textColor,
              tabBarLabelStyle: {fontSize: 14, fontFamily: FONTS.InterMedium},
              tabBarIndicatorStyle: {backgroundColor: COLORS.primary},
              tabBarPressColor: '#f2f2f2',
              tabBarItemStyle: {width: 90},
              tabBarScrollEnabled: true,
              title: data.name,
            }}
          />
        );
      })}
    </TopTab.Navigator>
  );
}
function MyMatrimonial() {
  const TopTabsArr = [
    {component: MMFemale, name: 'Female', ID: 'Female'},
    {component: MMMale, name: 'Male', ID: 'Male'},
  ];
  return (
    <TopTab.Navigator>
      {TopTabsArr.map(data => {
        return (
          <TopTab.Screen
            key={data.name}
            name={data.ID}
            component={data.component}
            options={{
              tabBarActiveTintColor: COLORS.primary,
              tabBarInactiveTintColor: COLORS.textColor,
              tabBarLabelStyle: {fontSize: 14, fontFamily: FONTS.InterMedium},
              tabBarIndicatorStyle: {backgroundColor: COLORS.primary},
              tabBarPressColor: '#f2f2f2',
              title: data.name,
            }}
          />
        );
      })}
    </TopTab.Navigator>
  );
}
function MyTabs() {
  const tabArr = [
    {
      name: 'Homee',
      component: HomeScreen,
      headerShown: false,
      iconName: 'home',
    },
    {
      name: 'categories',
      component: CategoriesScreen,
      headerShown: false,
      iconName: 'grid',
      type: 'ionicon',
    },
    {
      name: 'Profile',
      component: ProfileScreen,
      headerShown: false,
      iconName: 'person',
      type: 'ionicon',
    },
  ];
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveBackgroundColor: 'white',
      }}>
      {tabArr.map(data => (
        <Tab.Screen
          key={data.name}
          name={data.name}
          component={data.component}
          options={{
            headerShown: data.headerShown,
            tabBarIcon: ({focused}) => (
              <Icon
                size={25}
                name={data.iconName}
                color={focused ? COLORS.white : COLORS.secondary}
                containerStyle={styles.iconContainer(focused)}
                type={data.type}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerInactiveBackgroundColor: COLORS.transparent,
        drawerActiveBackgroundColor: COLORS.transparent,
        drawerLabelStyle: styles.drawerLabelStyle,
        drawerInactiveTintColor: COLORS.textColor,
        drawerActiveTintColor: COLORS.textColor,
        drawerStyle: styles.drawerStyle,
        swipeEnabled: false,
      }}>
      <Drawer.Screen
        name="Home"
        component={MyTabs}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default HomeStack;

const styles = StyleSheet.create({
  iconContainer: focused => ({
    backgroundColor: focused ? COLORS.primary : COLORS.white,
    padding: 10,
    borderRadius: 10,
  }),
  headerStyle: {
    color: COLORS.textColor,
    fontSize: 18,
    fontFamily: FONTS.InterSemiBold,
  },
  tabBarStyle: {
    height: '9%',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  drawerLabelStyle: {
    fontSize: 16,
    fontFamily: FONTS.InterRegular,
    marginLeft: -15,
  },
  drawerStyle: {
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    width: '67%',
  },
});
