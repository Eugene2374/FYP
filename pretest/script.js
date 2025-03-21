Consent=document.getElementById("Info")

ZIn=()=>{
    Consent.style.width=(parseInt(Consent.style.width.slice(0,2))*1.1).toString()+"%"
}

ZOut=()=>{
    Consent.style.width=(parseInt(Consent.style.width.slice(0,2))/1.1).toString()+"%"
}