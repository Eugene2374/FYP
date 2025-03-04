Lengths=[]
paragraphs=document.getElementsByTagName("p")
for(i=0;i<paragraphs.length;i++){
    Lengths.push(paragraphs.item(i).innerText.valueOf().split(" ").length)
}
read=[]
const currentTime=new Date()
const checktime=new Date()
checktime.setSeconds(currentTime.getSeconds()+Lengths[0]/5)
currentHeight=0

progressBar=()=>{
    consent=document.getElementById("Texts")
    progress_bar=document.getElementById("progress")
    position=consent.scrollTop
    total=consent.scrollHeight-window.innerHeight
    progress=(position/total*100).toString()+"%"
    progress_bar.style.width=progress
}


checkDuration=()=>{
    const currentTime=new Date()
    consent=document.getElementById("Texts")
    position=consent.scrollTop
    if(position>=(currentHeight-window.innerHeight+paragraphs.item(read.length).scrollHeight) && position<=currentHeight+paragraphs.item(read.length).scrollHeight){
        if (currentTime>checktime){
            currentHeight+=paragraphs.item(read.length).scrollHeight
            paragraphs.item(read.length).style.color="blue"
            read.push(true)
            console.log("Next")
            checktime.setSeconds(currentTime.getSeconds()+Lengths[read.length]/5)
        }
    }
    else{
        checktime.setSeconds(currentTime.getSeconds()+Lengths[read.length]/5)
    }
}

setInterval(checkDuration,10)

checkEligibility=()=>{
    read.length==Lengths.length? location.href="../during_study_2":alert("Please read the passage carefully")
}