import { SelectedMap } from "../../tmd/components/picker/MapPicker";
import { GalleryItem } from "../../tmd/types";
import { OrderCustomer } from "../models/customer/Customer";
import { OrderModel } from "../models/order/Order";
import { EventModel } from "../models/store/Event";
import { ProductDetailModel, ProductFeedItem } from "../models/store/Product";
import { TeamModel } from "../models/team/Team";

type AppNavigationType = {
  //utils
  GalleryListScreen: {
    images: GalleryItem[],
    title?: string
  },
  //end utils
  SplashScreen: undefined,
  LoginScreen: undefined,
  RegisterScreen: undefined,
  RecordMutationScreen: undefined,
  BudgetScreen: undefined,
  MainTabNavigation: MainTabNavigationType
};

export type MainTabNavigationType = {
  HomeScreen: undefined,
  HistoryScreen: undefined,
  AccountScreen: undefined
}

export default AppNavigationType;
