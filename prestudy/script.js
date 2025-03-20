sign=document.getElementById("signature")
ctx=sign.getContext("2d")
optimized=document.getElementById("optimized")
octx=optimized.getContext("2d")

Consent=document.getElementById("Info")

sign.width=window.innerWidth*0.97
sign.height=window.innerHeight*0.8

ctx.fillStyle="#ddd"
ctx.strokeStyle='#ddd'
visual=ctx.createImageData(sign.width,sign.height)

stats=false

del=()=>{
    ctx.clearRect(0,0,sign.width,sign.height)
    image = new Image()
}


sign.addEventListener("touchstart",(event)=>{
    stats=true;
    mouse={"x":event.clientX-5,"y":event.clientY-50}
    ctx.fillRect(mouse["x"],mouse["y"],15,15)
    record=setInterval(()=>{},25)
})

sign.addEventListener("touchmove",(event)=>{if(stats){
    record=setTimeout(()=>{
        mouse={"x":event.clientX-5,"y":event.clientY-50}
        ctx.fillRect(mouse["x"],mouse["y"],15,15)
    },25)
}})

sign.addEventListener("touchend",()=>{
    clearTimeout(record)
    stats=false
    image = new Image()
    image.src=sign.toDataURL('image/png')
    console.log(image)
    console.log(new Date().toString())

})

sign.addEventListener("pointerdown",(event)=>{
    stats=true;
    mouse={"x":event.clientX-5,"y":event.clientY-50}
    ctx.fillRect(mouse["x"],mouse["y"],15,15)
    record=setInterval(()=>{},25)
})

sign.addEventListener("pointermove",(event)=>{if(stats){
    record=setTimeout(()=>{
        mouse={"x":event.clientX-5,"y":event.clientY-50}
        ctx.fillRect(mouse["x"],mouse["y"],15,15)
    },25)
}})

sign.addEventListener("pointerup",()=>{
    clearTimeout(record)
    stats=false
    image = new Image()
    image.src=sign.toDataURL('image/png')
    console.log(image)
    console.log(new Date().toString())

})


save=()=>{
    try{image}catch{
        alert("Please sign on the designated area!")
    }
    octx.clearRect(0,0,optimized.width,optimized.height)
    octx.drawImage(image,0,0,optimized.width,optimized.height)
    visual = octx.getImageData(0,0,optimized.width,optimized.height).data
    visual=check_location(visual)
    console.log(visual)
    if (visual.length>20){
        let url="https://script.google.com/macros/s/AKfycbw416H14BhOPTJdq7yI94CU90Knjz1dv2VUsj2VIS14oTM0A9_0WenvJVuewTuCyULhCw/exec"
        let spt= image.src.split("base64,")
        let obj={
            base64:spt[1],
            type:spt[0],
            name:new Date().toString()
        }
        fetch(url,{
            method:"POST",
            body:JSON.stringify(obj)
        })
        .then(r=>r.text())
        .then(data=>console.log(data))
        .then(location.href="https://cityuhk.questionpro.com/t/Ab82mZ5n2a")
    }
    else{alert("Please sign on the designated area!")}
}

check_location=(imageData)=>{
    l=0
    data=[]
    white=false
    for(i=0;i<imageData.length;i+=4){
        if ((imageData[i]==0 && white) || (imageData[i]!=0 && !white)){
            data.push(l)
            white=!white
            l=0
        }
        else{
            l++
        }
    }
    data.push(l)
    return data
}

success=()=>{
    console.log(visual.length)
}

ZIn=()=>{
    Consent.style.width=(parseInt(Consent.style.width.slice(0,2))*1.1).toString()+"%"
}

ZOut=()=>{
    Consent.style.width=(parseInt(Consent.style.width.slice(0,2))/1.1).toString()+"%"
}