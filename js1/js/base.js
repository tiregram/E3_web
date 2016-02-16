function updateval(n) {

    var val = parseInt(n);
   
    if(isNaN(val)) {
        alert( "mess "+n+" is not a number" );
        return;
    }
    

    var ttc = val;
    
   var tva;
    if(val> 32000){
       tva= document.getElementById('tva').textContent = 0.22*ttc;
    }else{
       tva= document.getElementById('tva').textContent =0;
    }
    
    var ht = document.getElementById('ht').textContent= ttc-tva;
    var charge;
    
    if(ht> 32000){
       charge= document.getElementById('charge').textContent = 0.22*ht;
    }else{
       charge= document.getElementById('charge').textContent =0.30*ht;
    }

    var net =document.getElementById('net').textContent= ht-charge; 
    

    
   
}

function calcul(ttc){
        
   var tva;
    if(ttc> 32000){
       tva=  0.22*ttc;
    }else{
       tva=0;
    }
    
    var ht =  ttc-tva;
    
    var charge;
    
    if(ht< 32000){
       charge=  0.22 * ht;
    }else{
       charge= 0.30 * ht;
    }

    var net = ht-charge; 
    
  return {
    vtva:tva,
    vnet:net,
    vcharge:charge,
    vht :ht
};  
    
}

function computeAndDraw(){
    var a =document.getElementById('dr');
    var cv =a.getContext("2d");
    for(var i = 0;i<100000;i+=Math.floor((100000/a.width) /2 )){
        var obj = calcul(i);
        
        cv.beginPath();
        cv.lineWidth = 1;
        cv.moveTo(Math.floor(i*a.width/100000),Math.floor(a.height));
        cv.lineTo(Math.floor(i*a.width/100000),Math.floor(a.height - i *a.height/100000));
        cv.strokeStyle = 'blue';
        cv.stroke();
        
        
        cv.beginPath();
        cv.moveTo(Math.floor(i*a.width/100000),Math.floor(a.height));
        cv.lineTo(Math.floor(i*a.width/100000),Math.floor(a.height - obj.vht * a.height/100000));
        cv.strokeStyle = 'red';
        cv.stroke();
        
        cv.beginPath();
        cv.moveTo(Math.floor(i*a.width/100000),Math.floor(a.height));
        cv.lineTo(Math.floor(i*a.width/100000),Math.floor(a.height - obj.vcharge * a.height/100000));
        cv.strokeStyle = 'red';
        cv.stroke();
           
    }
}
