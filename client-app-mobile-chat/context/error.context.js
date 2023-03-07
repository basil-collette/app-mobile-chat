import React, { useState, createContext, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import RNRestart from 'react-native-restart';
import { setJSExceptionHandler } from "react-native-exception-handler";
import { ToastContext, ChappyToast, ToastTypeEnum, setFallback, setMaxToastCount } from 'rn-toaster-stack';

const ErrorContext = createContext();

export default function ErrorProvider({ children }) {

    const addToast = useContext(ToastContext);

    const [error, setError] = useState();

    useEffect(() => {
        setJSExceptionHandler((error, isFatal) => {
            handleError(error, isFatal);
        }, true);

        setMaxToastCount(10);
        setFallback(() => {
            Alert.alert(
                'Toast Alert occured',
                `Max toaster count : 10`,
                [{
                    text: 'Restart',
                    onPress: () => {
                        RNRestart.Restart();
                    }
                }]
            );
        });
    }, []);

    useEffect(() => {
        if (error) {
            addToast(new ChappyToast(ToastTypeEnum.error, error.message));

            clearError();
        }
    }, [error]);

    const handleSimpleError = (error) => {
        setError((currentError) => {
            return(error);
        });
    }

    const handleFatalError = (error) => {
        Alert.alert(
            'Unexpected error occurred',
            `${error.name}:
            ${error.message}. Thrown on "${error.origin}".

            We will need to restart the app.`,
            [{
                text: 'Restart',
                onPress: () => {
                    RNRestart.Restart();
                }
            }]
        );
    }

    const logError = (error, isFatal) => {
        //
    };

    const handleError = (error, isFatal) => {
        isFatal = isFatal || false;

        logError(error, isFatal);

        if (isFatal) {
            handleFatalError(error);
        } else {
            handleSimpleError(error);
        }
    }

    const clearError = () => {
        setError((currentError) => {
            return(null);
        });
    }

    return (
        <ErrorContext.Provider
            value={{
                error,
                handleError,
                clearError,
            }}
        >
            {children}
        </ErrorContext.Provider>
    );
};

export { ErrorContext, ErrorProvider };