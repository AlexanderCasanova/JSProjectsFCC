let cid=[["PENNY", 5.5], ["NICKEL", 10], ["DIME", 10], ["QUARTER", 10], ["ONE", 10], ["FIVE", 50], ["TEN", 80], ["TWENTY", 80], ["ONE HUNDRED", 200]]
let price=19.5

const currencyNameMap = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    'ONE HUNDRED': 100
  }

const completeClosed=(result) =>{
    const res = {
      QUARTER: result.QUARTER || 0,
      DIME: result.DIME || 0,
      NICKEL: result.NICKEL || 0,
      PENNY: result.PENNY || 0,
    };
  
    return res;
  }
  
const cashRegisterFunction=(price,cash,cid_r)=>{
    let cidObject = cid_r.reduce((obj, [coin, count]) => {
        obj[coin] = Number(count);
        return obj;
      }, {})
    let res={}
    let cashReturn=cash-price
    let cidObjectAux={...cidObject}
    let resAux={}
    
    if(cashReturn<0){
        alert("Customer does not have enough money to purchase the item")
        return [Object.entries(cidObject),{}]
    }
    if(cashReturn==0){
        return [Object.entries(cidObject),"No change due - customer paid with exact cash"]
    }   
    while(cashReturn>0){
        let lastcashReturn=cashReturn
        for(let coin of Object.keys(currencyNameMap).reverse()){
            if((cashReturn-currencyNameMap[coin])>=0){
                if((cidObjectAux[coin]-currencyNameMap[coin])>=0){
                    cashReturn=(cashReturn-currencyNameMap[coin]).toFixed(2)
                    cidObjectAux[coin]=(cidObjectAux[coin]-currencyNameMap[coin]).toFixed(2)
                    res[coin] = (parseFloat(res[coin]) || 0) + parseFloat(currencyNameMap[coin]);
                    res[coin] = Number(res[coin]).toFixed(2);
                    res[coin] = Number(res[coin])
                    break
                }
            }      
        }
        if(lastcashReturn==cashReturn) return [Object.entries(cidObject),{Status: "INSUFFICIENT_FUNDS"}]
    }
    if(Object.values(cidObjectAux).every(value => value == 0)){
        res=completeClosed(res)
        res.Status="CLOSED"
    }else{
        res.Status="OPEN"
    }
    resAux={...res}
    cidObject={...cidObjectAux}
    return [Object.entries(cidObject),resAux]
}


const cashItem=document.getElementById("cash")
const changeItem=document.getElementById("change-due")
const purchaseItem=document.getElementById("purchase-btn")

const costItem=document.getElementById("cost")
const cidbox=document.getElementById("cidbox")
costItem.innerHTML=`<h3>Price: ${price}</h3>`

const actualizarCID=(cidVar)=>{
    cidbox.innerHTML=""
    cidVar.forEach((item)=>{
        const itemdiv=document.createElement("div")
        itemdiv.innerHTML=`<p>${item[0]}: ${item[1]}</p>`
        cidbox.appendChild(itemdiv)
    })
}

actualizarCID(cid)

purchaseItem.onclick=()=>{
    let cash=cashItem.value
    let res
    [cid,res]=cashRegisterFunction(price,cash,cid)
    actualizarCID(cid)
    //console.log([cid,res])
    if(typeof res==="string"){
        changeItem.innerHTML=res
    }else{
        if(res!=""){
            changeItem.innerHTML=""
            Object.entries(res).forEach(([key, value]) => {
                const element= document.createElement("p")
                
                if(key!="Status"){
                    element.innerHTML=`${key}: $${value}`
                    changeItem.appendChild(element)
                }else{
                    element.innerHTML=`${key}: ${value}`
                    changeItem.insertBefore(element, changeItem.firstChild)
                }
                
              })
        }
    }
}