# Instyl
Fronted InStyl Documentation

App.js (Instyl/App.js) (main file)
->Navigation (Instyl/navigation/)
    ->index.js
	Functions
	->Splash Stack
->Auth Stack
->Root Stack
->Splash Stack
   Logo and login state (if user logged in and reopen the app, he directly go to Root Stack)	
->Auth Stack
   ->PhoneauthScreen (Instyl/screens/PhoneauthScreen.js)
   ->OTPScreen (Instyl/screens/OTPScreen.js)
->Root Stack
 	->Root page (Instyl/navigation/BottomTabNavigaotor.js) 
	         ->RootStack (BottomTabNavigaotor.js)
		->HomeScreen (Instyl/screens/HomeScreen.js)
		->GroupScreen (Instyl/screens/GroupScreen.js)
->ProfileScreen (Instyl/screens/ProfileScreen.js)
	{Below all screens in Root Stack explained after root stack with their flows}
	->ProductPage (Instyl/screens/ProductScreen.js) 
	->ShoppingBag (Instyl/screens/ShoppingBagScreen.js)
	->ShoppingBagGroup (Instyl/screens/ShoppingBagScreen.js)
	->AddGroup screen (Instyl/screens/AddGroup.js)
->GroupCart (Instyl/screens/GroupCartScreen.js)
->Activity (Instyl/screens/Activity.js)
->EditProfile (Instyl/screens/ EditProfileScreen.js)
->Adress (Instyl/screens/Adress.js)
->AddAdress (Instyl/screens/Addnewadress.js)
->ContactUs (Instyl/screens/ContactusScreen.js)
->Myorders (Instyl/screens/MyOrders.js)
->Saved (Instyl/screens/Saved.js)

Work Flows for 3 tabs Seperately (HOME,GROUP,PROFILE)
	HomeScreen -> ProductPage {Two options (Buy Alone,Buy With Friends }
{If Buy Alone Selected}  -> ShoppingBag
{If Buy with Friends Selected}  -> ShoppingBagGroup -> AddGroup
	GroupScreen -> GroupCart -> Activity
	ProfileScreen
-> EditProfile
-> Saved
->Adress->AddAdress (After adding, go again to Adress}
->Myorders
->ContactUs





