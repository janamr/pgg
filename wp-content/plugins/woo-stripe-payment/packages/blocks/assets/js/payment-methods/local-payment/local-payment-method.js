import {useCallback} from '@wordpress/element';
import {useElements, Elements} from "@stripe/react-stripe-js";
import {initStripe as loadStripe, cartContainsSubscription, cartContainsPreOrder} from '../util'
import {useAfterProcessLocalPayment, useValidateCheckout, useCreateSource} from "./hooks";
import {useProcessCheckoutError} from "../hooks";

/**
 * Return true if the local payment method can be used.
 * @param settings
 * @returns {function({billingData: *, [p: string]: *}): *}
 */
export const canMakePayment = (settings, callback = false) => ({billingData, cartTotals, ...props}) => {
    const {currency_code} = cartTotals;
    const {country} = billingData;
    const countries = settings('countries');
    const type = settings('allowedCountries');
    const supports = settings('features');
    let canMakePayment = false;
    if (settings('isAdmin')) {
        canMakePayment = true;
    } else {
        // Check if there are any subscriptions or pre-orders in the cart.
        if (cartContainsSubscription() && !supports.includes('subscriptions')) {
            return false;
        } else if (cartContainsPreOrder() && !supports.includes('pre-orders')) {
            return false;
        }
        if (settings('currencies').includes(currency_code)) {
            if (type === 'all_except') {
                canMakePayment = !settings('exceptCountries').includes(country);
            } else if (type === 'specific') {
                canMakePayment = settings('specificCountries').includes(country);
            } else {
                canMakePayment = countries.length > 0 ? countries.includes(country) : true;
            }
        }
        if (callback && canMakePayment) {
            canMakePayment = callback({settings, billingData, cartTotals, ...props});
        }
    }
    return canMakePayment;
}

export const LocalPaymentIntentContent = (props) => {
    return (
        <Elements stripe={loadStripe}>
            <LocalPaymentIntentMethod {...props}/>
        </Elements>
    )
}

export const LocalPaymentSourceContent = (props) => {
    return (
        <Elements stripe={loadStripe}>
            <LocalPaymentSourceMethod {...props}/>
        </Elements>
    )
}

const LocalPaymentSourceMethod = (
    {
        getData,
        billing,
        shippingData,
        emitResponse,
        eventRegistration,
        getSourceArgs = false,
        element = false
    }) => {
    const {shippingAddress} = shippingData;
    const {onPaymentProcessing, onCheckoutAfterProcessingWithError} = eventRegistration;
    const {responseTypes, noticeContexts} = emitResponse;
    const onChange = (event) => {
        setIsValid(event.complete);
    }
    const {setIsValid} = useCreateSource({
        getData,
        billing,
        shippingAddress,
        onPaymentProcessing,
        responseTypes,
        getSourceArgs,
        element
    });

    if (element) {
        return (
            <LocalPaymentElementContainer
                name={getData('name')}
                options={getData('elementOptions')}
                onChange={onChange}
                element={element}/>
        )
    }
    return null;
}

const LocalPaymentIntentMethod = (
    {
        getData,
        billing,
        emitResponse,
        eventRegistration,
        activePaymentMethod,
        confirmationMethod = null,
        component = null
    }) => {
    const elements = useElements();
    const {billingData} = billing;
    const {onPaymentProcessing, onCheckoutAfterProcessingWithError} = eventRegistration;
    const {responseTypes, noticeContexts} = emitResponse;
    const getPaymentMethodArgs = useCallback(() => {
        if (component) {
            return {
                [getData('paymentType')]: elements.getElement(component)
            }
        }
        return {};
    }, [elements]);
    const {setIsValid} = useValidateCheckout({
            subscriber: onPaymentProcessing,
            responseTypes,
            component
        }
    );

    useAfterProcessLocalPayment({
        getData,
        billingData,
        eventRegistration,
        responseTypes,
        activePaymentMethod,
        confirmationMethod,
        getPaymentMethodArgs
    });
    useProcessCheckoutError({
        responseTypes,
        subscriber: onCheckoutAfterProcessingWithError,
        messageContext: noticeContexts.PAYMENT
    });
    if (component) {
        const onChange = (event) => setIsValid(!event.empty)
        return (
            <LocalPaymentElementContainer
                name={getData('name')}
                options={getData('elementOptions')}
                onChange={onChange}
                element={component}/>
        )
    }
    return null;
}

const LocalPaymentElementContainer = ({name, onChange, element, options}) => {
    const Tag = element;
    return (
        <div className={`wc-stripe-local-payment-container ${name} ${Tag.displayName}`}>
            <Tag options={options} onChange={onChange}/>
        </div>
    )
}