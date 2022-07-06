const initialState = {
    cartitems: [],
    user: {},
    admin: {},
    loggedIn: false,
    adminStatus: false,
    quantity: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                // cartitems: [...state.cartitems, action.payload]
                cartitems: action.payload
            }


        case 'DELETE_FROM_CART': {
            return {
                ...state,
                cartitems: state.cartitems.filter((cartItem) => cartItem.productId !== action.payload.productId)
            }
        }

        case 'CLEAR_ALL_CART':
            return {
                ...state,
                cartitems: action.payload
            }
        case 'currentUser':
            return {
                ...state,
                user: action.payload
            }
        case 'adminHome':
            return {
                ...state,
                admin: action.payload
            }
        case 'setLoggedIn':
            return {
                ...state,
                loggedIn: action.loggedIn
            }
        case 'setLoggedOut':
            return {
                ...state,
                loggedIn: action.loggedIn,
                adminStatus: action.adminStatus
            }
        case 'setAdmin':
            return {
                ...state,
                adminStatus: action.adminStatus
            }
        default:
            return state
    }
}

export default cartReducer;