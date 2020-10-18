import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

// everything between <StoreProvider/> are children components
const StoreProvider = ({ value = [], ...props}) => {
    const [state, dispatch] = useProductReducer({
        products: [],
        categories: [],
        currentCategory: '',
    });
    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;
}

// custom react hook
const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };