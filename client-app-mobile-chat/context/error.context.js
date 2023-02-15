import React, { useState, createContext, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import RNRestart from 'react-native-restart';
import { setJSExceptionHandler } from "react-native-exception-handler";
import { ToastContext, ChappyToast } from '@context/toast.context';

const ErrorContext = createContext();

export default function ErrorProvider({ children }) {

    const addToast = useContext(ToastContext);

    const [error, setError] = useState();

    useEffect(() => {
        setJSExceptionHandler((error, isFatal) => {
            handleError(error, isFatal);
        }, true);
    }, []);

    useEffect(() => {
        if (error) {
            addToast(new ChappyToast('error', error.message));

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
        if (isFatal == undefined) isFatal = false;

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