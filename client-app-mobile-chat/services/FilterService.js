import React, { useContext } from 'react';
import { Text } from "react-native";
import { apiHttpRequest } from '@services/RequestService';
import ChappyError from '@error/ChappyError';
import {getTranslationsURL} from '@endpoint/ApiEndpoint';
//CONTEXT
import { ErrorContext } from '@context/error.context';

export default class FilterService {
  
    errorContext;
    translations;

    constructor() {
        try {
            errorContext = useContext(ErrorContext);
            translations = apiHttpRequest(getTranslationsURL(), 'GET', null, null);
        } catch(err) {
            if (!(err instanceof ChappyError)) err = new ChappyError(err.message, false, "AuthComponent.loginRequest()");
            errorContext.handleError(err, err.isFatal);
        }
    }

    filter(text) {
        let textArray = [];
        let currentIndex;

        while(match = /test/g.exec(text)) {
            console.log(match);
            /*
            textArray.push(text.substring(1, 3));
            currentIndex = match.index + match
            console.log(match.index + ' ' + patt.lastIndex);
            */
        }

        return(
            <Text>

            </Text>
        );

    }

}