sign=document.getElementById("signature")
ctx=sign.getContext("2d")
optimized=document.getElementById("optimized")
octx=optimized.getContext("2d")


sign.width=window.innerWidth*0.98
sign.height=window.innerHeight*0.9

ctx.fillStyle="#ddd"
ctx.strokeStyle='#ddd'
visual=ctx.createImageData(sign.width,sign.height)

stats=false

del=()=>{
    ctx.clearRect(0,0,sign.width,sign.height)
    image = new Image()
}


sign.addEventListener("mousedown",(event)=>{
    stats=true;
    mouse={"x":event.clientX-5,"y":event.clientY-50}
    ctx.fillRect(mouse["x"],mouse["y"],15,15)
    record=setInterval(()=>{},25)
})

sign.addEventListener("mousemove",(event)=>{if(stats){
    record=setTimeout(()=>{
        mouse={"x":event.clientX-5,"y":event.clientY-50}
        ctx.fillRect(mouse["x"],mouse["y"],15,15)
    },25)
}})

sign.addEventListener("mouseup",()=>{
    clearTimeout(record)
    stats=false
    image = new Image()
    image.src=sign.toDataURL('image/png')
    console.log(image)
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
    visual.length>20?
        location.href="https://docs.google.com/forms/d/e/1FAIpQLSccAXUYVIFVddCCVnmTI05ec9T9VjQiN_8XYnpzLxJ_h8GVuQ/viewform?usp=pp_url&entry.1586501361="+visual:alert("Please sign on the designated area!")
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