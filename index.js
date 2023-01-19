//function CreateBank (bankName){
 // console.log("create person")
//}

let currentCustomerId = 0
let currentCreditId = 0
let currentSavingsId = 0
let currentCustomers = []

//Issue: If application works in several servers it would lead to error -> Could use instances (customerID.serverID -> 232.24)

function addCustomer (name, phone, email, homeCity){
  currentCustomerId++;
  let customer = {customerId:currentCustomerId,customerName:name,customerPhone: phone, customerEmail: email, customerHomeCity: homeCity};
  currentCustomers.push(customer);
}

function addSavingsProduct (clientId,amount){
  const searchCustomer = currentCustomers.find((customer) => customer.customerId == clientId); 
  currentSavingsId++;
  let accountId = "savingsAccountId"+currentSavingsId ;
  let savingProduct = {savingsAccountId:currentSavingsId,savingsAmount:amount};
  searchCustomer[accountId] = savingProduct;
}

function addCreditProduct(clientId,expiration,currentDebt,maxDebt){
  const searchCustomer = currentCustomers.find((customer) => customer.customerId == clientId);
  currentCreditId++;
  let accountId = "creditId"+currentCreditId;
  let creditProduct ={creditAccountId:currentCreditId,creditExpiration:expiration,currentDebt:currentDebt,maxDebt:maxDebt};
  searchCustomer[accountId] = creditProduct;
}

function showCityAverageSavedAmount(city){
  let savedAmountPerCustomer = []
  for (let i = 0; i < currentCustomers.length; i++){
    if (currentCustomers[i].customerHomeCity == city){
      let customerSavings = 0
        for (let key in currentCustomers[i]) {         
          if (key.includes("savingsAccountId")){
            customerSavings+= currentCustomers[i][key].savingsAmount;
          }           
      }
      savedAmountPerCustomer.push(customerSavings)
    };
  }
  let totalSavedAmount = 0;
  for (let j = 0; j < savedAmountPerCustomer.length; j++){
    totalSavedAmount += savedAmountPerCustomer[j];
  };
  let totalAverage = totalSavedAmount / (savedAmountPerCustomer.length);
  console.log(totalAverage);
}

function showCustomersExpiredCards(){
  var customerIdExpiredCards = [];
  var currentDate = new Date();
  var actualYear = new Date().getFullYear().toString().slice(-2);
  var actualMonth = currentDate.getMonth()+1; 
  console.log(actualMonth+"/"+actualYear)
  for (let i = 0; i < currentCustomers.length; i++){
      for (let key in currentCustomers[i]) {         
        if (key.includes("creditId")){
          var cardExpirationDate = currentCustomers[i][key].creditExpiration;
          var month = cardExpirationDate.slice(0,2);
          var year = cardExpirationDate.slice(-2);
          if (parseInt(year) < parseInt(actualYear)){
            if (!customerIdExpiredCards.includes(currentCustomers[i].customerId)) {
            customerIdExpiredCards.push(currentCustomers[i].customerId);
            }
          }
          else {
            if (parseInt(month) < parseInt(actualMonth)){
              if (!customerIdExpiredCards.includes(currentCustomers[i].customerId))                  {
                   customerIdExpiredCards.push(currentCustomers[i].customerId);
                 }
            }
          }
            
          console.log(customerIdExpiredCards);
        }; 
    }
  }
}

function moreSavingsThanDebt(){
  var customerExtraSavings = [];
  for (let i = 0; i < currentCustomers.length; i++){
        var customerSavings = 0;
        var customerDebt = 0;
      for (let key in currentCustomers[i]) {      
        if (key.includes("creditId")){ 
          customerDebt += currentCustomers[i][key].currentDebt;
        }
        else if (key.includes("savingsAccountId")){ 
          customerSavings += currentCustomers[i][key].savingsAmount;          
        }
    }
    if ((customerSavings-customerDebt)>0){
      if (!customerExtraSavings.includes(currentCustomers[i].customerId))                  {
          var customerData = currentCustomers[i].customerName + " - " + currentCustomers[i].customerPhone
          customerExtraSavings.push(customerData);
        }
    }
  }
  console.log(customerExtraSavings);
}

var persona1 = new addCustomer("Pedro",235654,"casa@gmail.com","Atlanta");
var persona2 = new addCustomer("Alex",235654,"cas5a@gmail.com","Oregon");
var persona3 = new addCustomer("Luis",5462321,"casa3@gmail.com","Atlanta");

addSavingsProduct(1,250);
addSavingsProduct(1,500);
addSavingsProduct(2,220);
addSavingsProduct(3,120);
addCreditProduct(1,"07/26",600,1200);
addCreditProduct(2,"03/20",800,2000);
addCreditProduct(3,"12/18",800,2000);

console.log(currentCustomers);
moreSavingsThanDebt();
showCustomersExpiredCards();
showCityAverageSavedAmount("Atlanta");
