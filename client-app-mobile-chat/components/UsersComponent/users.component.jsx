import React, { useState, useEffect, useContext } from 'react';
import UsersTemplate from "./users.template.jsx";
import { request } from '../../services/RequestService';
import { SocketContext } from '../../context/socket.context';
import * as StoreService from '../../services/StoreService';
import { ENDPOINT_API } from '@env'

export default function UsersComponent(props) {
    
  return (<UsersTemplate/>);
};