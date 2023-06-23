import React from 'react';
import socketIO from "socket.io-client";
import { ENDPOINT_API } from '@env'

export const socket = socketIO.connect("http://www.basilcollette.com:3000");

export const SocketContext = React.createContext();