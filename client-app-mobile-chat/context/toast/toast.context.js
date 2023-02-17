import React, { useState, createContext, useEffect, useRef } from 'react';
import { Alert, Animated } from "react-native";
import RNRestart from 'react-native-restart';
import { easeOutAnimation } from '@assets/animation';
import ToastTemplate from '@comp/ToastComponent/toast.template';

const ToastContext = createContext();

const ToastProvider = ({ children }) => {

    const TOAST_ENUMS = {
        ANIMATION_DURATION: 500,
        ONE_SECONDS: 1000, //units in milliseconds
        NB_ITERATE: 3,
        MAX_TOAST_COUNT: 10
    }

    const translateValue = useRef(new Animated.Value(-100)).current;

    const [toastStack, setToastStack] = useState([]);

    const [state, setState] = useState({
        available: true,
        count: TOAST_ENUMS.NB_ITERATE
    });

    useEffect(() => {
        if (toastStack.length > 0 && state.available == true) {

            if (toastStack.length > TOAST_ENUMS.MAX_TOAST_COUNT) {
                Alert.alert(
                    'Unexpected error occurred',
                    `Max toaster count : ${toastStack.length}`,
                    [{
                        text: 'Restart',
                        onPress: () => {
                            RNRestart.Restart();
                        }
                    }]
                );
            }

            setState((currentState) => {
                return({
                    ...currentState,
                    available: false,
                });
            });

            toastCycle();
        }

    }, [toastStack, state.available]);

    const addToast = (toast) => {
        setToastStack((currentToastStack) => {
            return(
                [...currentToastStack, toast]
            );
        });
    }

    // TOAST CYCLE _______________________________________________________________________________________ TOAST CYCLE

    const toastCycle = () => {
        showToast();

        var countDownIntervalID = setInterval(() => {

            if (state.count <= 0) {
                clearInterval(countDownIntervalID);

                hideToast();
                
                setTimeout(() => {
                    shiftToastStack();

                    setState((currentState) => {
                        return({
                            ...currentState,
                            available: true,
                            count: TOAST_ENUMS.NB_ITERATE
                        });
                    });
                }, TOAST_ENUMS.ANIMATION_DURATION);

            } else {
                setState((currentState) => {
                    return({
                        ...currentState,
                        available: false,
                        count: state.count--
                    });
                });
            }
        }, TOAST_ENUMS.ONE_SECONDS);
    }

    const shiftToastStack = () => {
        setToastStack((currentToastStack) => {
            let newToastStack = [...currentToastStack];
            newToastStack.shift();

            return(
                [...newToastStack]
            );
        });
    }

    const showToast = () => {
        easeOutAnimation(translateValue, TOAST_ENUMS.ANIMATION_DURATION, 0, 0);
    }

    const hideToast = () => {
        easeOutAnimation(translateValue, TOAST_ENUMS.ANIMATION_DURATION, 0, -100);
    }

    // TEMPLATE RETURN _____________________________________________________________________________________ TEMPLATE RETURN

    return(
        <ToastContext.Provider value={addToast}>
            
            {children}

            {(toastStack && toastStack.length > 0) &&
                <ToastTemplate type={toastStack[0].type} message={toastStack[0].message} translateValue={translateValue} />
            }
            
        </ToastContext.Provider>
    );
};

export { ToastContext, ToastProvider };