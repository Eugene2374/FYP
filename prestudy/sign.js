sign=document.getElementById("signature")
ctx=sign.getContext("2d")
optimized=document.getElementById("optimized")
octx=optimized.getContext("2d")

sign.width=window.innerWidth*0.97
sign.height=window.innerHeight*0.8


ctx.lineWidth=3;
ctx.lineJoin=ctx.lineCap='round'
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
    mouse={"x":event.clientX-event.target.getBoundingClientRect().x,"y":event.clientY-event.target.getBoundingClientRect().y}
    ctx.fillRect(mouse["x"],mouse["y"],3,3)
    ctx.beginPath();
    ctx.moveTo(mouse["x"],mouse["y"])
})

sign.addEventListener("mousemove",(event)=>{
    if(!stats) {return}
    
    mouse={"x":event.clientX-event.target.getBoundingClientRect().x,"y":event.clientY-event.target.getBoundingClientRect().y}
    ctx.lineTo(mouse["x"],mouse["y"])
    ctx.stroke()
})

sign.addEventListener("mouseup",()=>{
    stats=false
    image = new Image()
    image.src=sign.toDataURL('image/png')
    console.log(image)
    console.log(new Date().toString())
})


sign.addEventListener("touchstart",(event)=>{
    mouse={"x":event.changedTouches[0].pageX,"y":event.changedTouches[0].pageY}
    ctx.beginPath();
    ctx.moveTo(mouse["x"],mouse["y"])
})

sign.addEventListener("touchmove",(event)=>{
    mouse={"x":event.changedTouches[0].pageX,"y":event.changedTouches[0].pageY}
    ctx.lineTo(mouse["x"],mouse["y"])
    ctx.stroke()
})

sign.addEventListener("touchend",()=>{
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