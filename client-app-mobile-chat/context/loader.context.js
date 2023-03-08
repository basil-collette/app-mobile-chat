import React, { useState, createContext, useEffect } from 'react';
import {ActivityIndicator, View} from 'react-native'; 
import FetchIntercept from 'fetch-intercept';
const LoaderContext = createContext();

const LoaderProvider = ({ children }) => {

    const [isLoading, setisLoading] = useState(false);

    
    useEffect(() => {
        FetchIntercept.register({
            request: function(url, config) {
                if(config.headers["X-Chappy-NeedLoader"]) {
                    setisLoading((prevIsLoading) => {
                        return true;
                    });
                }
                delete config.headers["X-Chappy-NeedLoader"];
                return [url, config];
            },
            requestError: function (error) {
                setisLoading((prevIsLoading) => {
                    return false;
                });
                return Promise.reject(error);
            },
            response: function(response) {
                setisLoading((prevIsLoading) => {
                    return false;
                });
                return response;
            },
            responseError: function (error) {
                setisLoading((prevIsLoading) => {
                    return false;
                });
                return Promise.reject(error);
            },
          });
         return () => {
            FetchIntercept.clear();
         }
    },[])


    return(
        <LoaderContext.Provider value={(loadingValue) => {
            setisLoading((prevIsLoading) => {
                return loadingValue;
            })
        }}>
            
            {children}

            {isLoading &&
                <View style = {{
                position:"absolute",width:"100%", height:"100%",backgroundColor:"rgba(0, 0, 0, 0.6)"}} >
                    <View style = {{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }} >
                        <ActivityIndicator size="large" color="white"/>
                    </View>
                </View>
            }
            
        </LoaderContext.Provider>
    );
};

export { LoaderContext, LoaderProvider };