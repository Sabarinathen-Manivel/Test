//import liraries
import React, { Component, PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types'; // ES6
import Colors from '../Theme/Colors';
// create a component
class Button extends PureComponent {
    construtor(props) {
        Super(props);
    }

    render() {
        const containersStyle = Object.assign({}, styles.container, this.props.containerStyle);
        const buttonDisable = this.props.disabled;
        const ButtonText = Object.assign({}, styles.text, this.props.containerText);

        return (
            <TouchableOpacity
                disabled={this.props.touchDisable}
                activeOpacity={0.8}
                style={this.props.containerWidth}
                onPress={() => { this.props.buttonPress() }}>
                <View style={[
                    // buttonDisable ? { backgroundColor:Colors.button, opacity: 0.9 } : { backgroundColor:Colors.button },
                    this.props.touchDisable ? { opacity: 0.6 } : {},
                    containersStyle,
                ]}>
                    <Text style={ButtonText}>{this.props.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: Colors.button,
        width: "100%",
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: Colors.white,
        fontSize: 15,
        // fontFamily: Fonts.RegularFont,
        width: '100%',
        textAlign: 'center',
    }
});

Button.propTypes = {
    name: PropTypes.string,
    buttonPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    touchDisable: PropTypes.bool,
    containerWidth: PropTypes.any,
    containerStyle: PropTypes.shape({
        backgroundColor: PropTypes.string,
        width: PropTypes.string
    })
    // containerStyle: PropTypes.shape({
    //     backgroundColor: PropTypes.string.isRequired,
    //     width: PropTypes.string,
    //     height: PropTypes.number,
    //     borderRadius: propTypes.number
    // })
}

Button.defaultProps = {
    name: 'Next',
    containerStyle: styles.container,
    disabled: false,
    touchDisable: false,
    containerWidth: { width: '100%' },

}

//make this component available to the app
export default Button;
