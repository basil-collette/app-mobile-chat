import React from 'react';
import socketIO from "socket.io-client";
import { ENDPOINT_API } from '@env'

export const socket = socketIO.connect(ENDPOINT_API);

export const SocketContext = React.createContext();