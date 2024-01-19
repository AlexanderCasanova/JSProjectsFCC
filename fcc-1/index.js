const text=document.getElementById("text-input")
const button= document.getElementById("check-btn")
const result= document.getElementById("result")


button.onclick= ()=>{
    let textValue=text.value.replace(/_/g, '').replace(/[^\w\s]/g, '').replace(/\s/g, '').toLowerCase()
    let reverseText=textValue.split("").reverse().join("")
    if(textValue==""){
        alert("Please input a value")
    }else if(textValue===reverseText){
        result.innerHTML=text.value + " is a palindrome"
    }else{
        result.innerHTML=text.value+" is not a palindrome"
    }
}