import { combineReducers } from "redux";
import { HomeReducer } from "./slices/homeSlices";
import { AboutReducer } from "./slices/aboutSlices";
import { ContactReducer } from "./slices/contactSlices";
import { ProductsReducer } from "./slices/productsSlices";
import { ServicesReducer } from "./slices/servicesSlices";
import { BasketReducer } from "./slices/basketSlice";
import { LoginReducer } from "./slices/loginSlices";
import { LoaderReducer } from "./slices/loaderSlice";


const rootReducer = combineReducers({
  home: HomeReducer,
  about: AboutReducer,
  contact: ContactReducer,
  products: ProductsReducer,
  services: ServicesReducer,
  basket: BasketReducer,
  login: LoginReducer,
  loader: LoaderReducer
});

export default rootReducer;
