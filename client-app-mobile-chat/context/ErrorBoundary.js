import React from 'react';
import { View, Text } from 'react-native';
import ToastComponent from '../components/ToastComponent/toast.component';

export default class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            error: null,
            errorInfo: null,
            toast: {
                show: false,
                toastType: 'error',
                msg: ''
            }
        };
    }
  
    static getDerivedStateFromError(error) {
        catchFunc(error, null, this);
    }

    catchFunc(error, errorInfo, ctx) {
        console.log(error);
        console.log(errorInfo);

        //logErrorToMyService(error, errorInfo);
    
        ctx.setState({
          error: error,
          errorInfo: errorInfo
        })
    }
  
    componentDidCatch = (error, errorInfo) => catchFunc(error, errorInfo, this)
  
    render() {
        if (this.state.error) {
            return (
                <View>
                    <Text>{error.message}</Text>
                </View>
            );
        }
    
        //return this.props.children;
        
        return (
            <>
                {this.state.toast.show && <ToastComponent message={this.state.toast.msg} type={this.state.toast.toastType}></ToastComponent>}
                {this.props.children}
            </>
        );
        
    }
}