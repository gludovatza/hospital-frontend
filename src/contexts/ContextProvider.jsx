import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    toast: {
        message: null,
        show: false,
    },
    setCurrentUser: () => { },
    setUserToken: () => { },
});

export const ContextProvider = ({ children }) => {
    const [currentUser, _setCurrentUser] = useState({});
    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
    const [toast, setToast] = useState({ message: '', show: false })

    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem('TOKEN', token)
        }
        else {
            localStorage.removeItem('TOKEN')
            localStorage.removeItem('ACCESS_TOKEN')
        }
        _setUserToken(token);
    }

    const setCurrentUser = (user) => {
        if (user) {
            localStorage.setItem('USER', user)
        }
        else {
            localStorage.removeItem('USER')
        }
        _setCurrentUser(user);
    }

    const getCurrentUser = () => {
        return JSON.parse(localStorage.getItem('USER'))
    }

    const showToast = (message) => {
        setToast({ message: message, show: true })
        setTimeout(() => {
            setToast({ message: message, show: false })
        }, 5000)
    }

    return (
        <StateContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                getCurrentUser,
                userToken,
                setUserToken,
                toast,
                showToast
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
