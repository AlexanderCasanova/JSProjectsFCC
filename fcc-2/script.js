const dictRoman={
    1:"I",
    4:"IV",
    5:"V",
    9:"IX",
    10:"X",
    40:"XL",
    90:"XC",
    100:"C",
    400:"CD",
    500:"D",
    900:"CM",
    1000:"M"
}

const arabicToRoman=(num)=>{
    let result=""
    let remainingNumber = num;

    if(num<1){
        return "Please enter a number greater than or equal to 1"
    }else if(num>=4000){
        return "Please enter a number less than or equal to 3999"
    }
    while (remainingNumber > 0) {
        for (let key of Object.keys(dictRoman).sort((a, b) => b - a)) {
            if (remainingNumber - key >= 0) {
                remainingNumber -= key;
                result += dictRoman[key];
                break;
            }
        }
    }
    return result
}

const textInput= document.getElementById("number")
const btnConvert=document.getElementById("convert-btn")
const out= document.getElementById("output")


btnConvert.onclick =(e)=>{
    let num=textInput.value
    let res= isNaN(Number(num))||textInput.value==""?"Please enter a valid number":arabicToRoman(num)
    out.innerHTML=res
}
