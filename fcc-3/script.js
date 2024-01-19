const phoneValidator=(num)=>{
    const regex=/^(1\s?)?(\(\d{3}\)|\d{3})([\s\-]?)\d{3}([\s\-]?)\d{4}$/
    return regex.test(num)?`Valid US number: ${num}`:`Invalid US number: ${num}`
}

const textInput=document.getElementById("user-input")
const checkbtn=document.getElementById("check-btn")
const clearbtn=document.getElementById("clear-btn")
const output=document.getElementById("results-div")

checkbtn.onclick=()=>{
    if(textInput.value==""){
        alert("Please provide a phone number")
        return
    }
    output.innerHTML=phoneValidator(textInput.value)
}

clearbtn.onclick=()=>{
    textInput.value=""
    output.innerHTML=""
}