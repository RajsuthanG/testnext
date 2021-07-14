import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

// Import Slices
import accountReducer from "./account";
import contributionReducer from "./contribution";
import generalReducer from "./general";
import stepperReducer from "./stepper";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["account", "contribution", "general", "stepper"],
};

const rootReducer = combineReducers({
  account: accountReducer,
  contribution: contributionReducer,
  general: generalReducer,
  stepper: stepperReducer,
});

export { rootPersistConfig, rootReducer };
