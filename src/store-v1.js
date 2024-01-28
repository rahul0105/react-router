import {combineReducers, createStore} from "redux";

const initialStateAccount={
    balance:0,
    loan: 0,
    loanPurpose: ""
};

const initialStateCustomer={
    fullname: "",
    nationalID: "",
    createdAt: ""
};

function accountReducer(state = initialStateAccount, action){
    switch(action.type){
        case "account/deposit":
            return {
                ...state,
                balance: state.balance + action.payload
            }

        case "account/withdraw":
            return {
                ...state,
                balance: state.balance - action.payload
            } 

        case "account/requestloan":
            if(state.loan > 0) return state;
            
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount
            }
         
        case "account/payloan":
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan
            }    
        
        default:
            return state;
    }
}

function customerReducer(state=initialStateCustomer, action){
    switch(action.type){
        case "customer/createCustomer":
            return {
                ...state,
                fullname: action.payload.fullname,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt
            }

        case "customer/updateName":
            return {
                ...state,
                fullname: action.payload.fullname
            }  
         
        default:
            return state;
    }
}

const rootReducer=combineReducers({
    account: accountReducer,
    customer: customerReducer
})

// const store=createStore(accountReducer);

const store=createStore(rootReducer);

// store.dispatch({type: "account/deposit", payload:500});
// console.log(store.getState());
// store.dispatch({type: "account/withdraw", payload:200});
// console.log(store.getState());
// store.dispatch({type: "account/requestloan", payload:{amount: 1000, purpose: "Buy a Car!"}});
// console.log(store.getState());
// store.dispatch({type: "account/payloan"});
// console.log(store.getState());

store.dispatch(deposit(600));
console.log(store.getState());

function deposit(amount){
    return {type: "account/deposit", payload:amount}
}

function withdraw(amount){
    return {type: "account/withdraw", payload:amount}
}

store.dispatch(withdraw(200));
console.log(store.getState());

function requestloan(amount,purpose){
    return {type: "account/requestloan", payload:{amount, purpose}}
}

store.dispatch(requestloan(1000,"Buy a super cheap car!"));
console.log(store.getState());

function payloan(){
    return {type: "account/payloan"}
}

store.dispatch(payloan());
console.log(store.getState());


function createCustomer(fullname, nationalID){
    return { type: "customer/createCustomer", payload: {fullname, nationalID, createdAt: new Date().toISOString()} };
}

function updateName(fullname){
    return {type: "customer/updateName", payload:fullname};
}

store.dispatch(createCustomer("Rahul chourasia", "2481013790"))
console.log(store.getState());


