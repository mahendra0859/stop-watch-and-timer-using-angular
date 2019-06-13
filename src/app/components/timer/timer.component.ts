import { Component, ViewChild, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    
  }

  
  btnText: string="Start";
  arr: string[]=[]; 
  hr: number = 0;
  min: number = 0;
  sec: number = 0;
  start: boolean = false;
  pause: boolean = false;
  makeChange: boolean = false;
  id: any;
  adjust: number=1;
  
  context:CanvasRenderingContext2D;
  totalSeconds=0;
  remainingSecond;

    
     @ViewChild('tCanvas') timerCanvas;

 

    allowChange(){
      this.makeChange=true;
      
    }

   
     setTime(){
    
      if(this.arr[4]){
        this.hr = parseInt(this.arr[4]);
      }
      if(this.arr[5]){
        this.hr += parseInt(this.arr[5])*10;
      }

     
      if(this.arr[2]){
        this.min = parseInt(this.arr[2]);
      }
       if(this.arr[3]){
        this.min += parseInt(this.arr[3])*10;
      }

    
      if(this.arr[0]){
        this.sec = parseInt(this.arr[0]);
      }
      if(this.arr[1]){
        this.sec += parseInt(this.arr[1])*10;
      }

      this.totalSeconds=this.hr*60*60+this.min*60+this.sec;
      this.remainingSecond=this.totalSeconds;
    }

    adjustTimer(){
      let s=this.sec-this.adjust;
      if(s<0){

        if(this.min>0){
           this.min-=1;
           this.sec=59;
          this.sec-=this.adjust;
          this.remainingSecond-=this.adjust;
          this.drawFigure();
        }
        else if(this.hr>0){
           this.hr-=1;
           this.min=59;
           this.sec=59;
          this.sec-=this.adjust;
          this.remainingSecond-=this.adjust;
          this.drawFigure();
        }
        else{
        
         
          this.onFinish();
        }
      }else{
        this.sec-=this.adjust;
        this.remainingSecond-=this.adjust;
        this.drawFigure();
      }


    }

  onStart(){

    this.start=true;
    this.btnText="Stop";
    this.setTime();
    this.id= setInterval(()=>{
      this.adjustTimer();
    },1000);
   
   

  }

  onPause(){
     this.pause=true;
     this.btnText="Resume";
     clearInterval(this.id);
     console.log("paused");
  }
  onResume(){
      this.pause=false;
      this.btnText="Stop";
      this.id= setInterval(()=>{
      this.adjustTimer();
    },1000);
     console.log("resumed");

  }

  onFinish(){
     
     clearInterval(this.id);
     this.btnText="Start";
     console.log("time over");

  }
  reset(){
    this.onFinish();
    this.start=false;
    this.arr=[];
    this.hr=this.min=this.sec=0;
    this.pause=false;
    this.btnText="Start";
    

  }
    
   
   
      isValidInput(key):boolean{

        const str=['0','1','2','3','4','5','6','7','8','9'];

        for(let i=0;i<=9;i++){
          if(str[i]==key){
            return true;
          }

        }

        return false;
      }
    
      @HostListener('document:keypress', ['$event'])
        handleKeyboardEvent(event: KeyboardEvent) { 
         
       
         if(this.makeChange && this.isValidInput(event.key) ){
            this.arr.unshift(event.key);
          
            if(this.arr.length>6)
            {
              this.arr=this.arr.splice(0,6);
            }

              //console.log(this.arr[0],this.arr[1],this.arr[2],this.arr[3],this.arr[4],this.arr[5]);

         }
          

      }

      @HostListener('document:keydown', ['$event'])
        handleControlEvent(event: KeyboardEvent) { 
      
        if(event.keyCode==8 && this.arr.length && this.makeChange){
        
          this.arr=this.arr.splice(1,this.arr.length-1);
        }
        
        //on hitting 
        if(event.keyCode==13 && this.makeChange){
             if(this.start)
               this.onResume();
             else{
               this.onStart();
             }  
        }

        //on hitting space key
        if(event.keyCode==32 && this.makeChange){
             this.onPause();
        }

       
     }
      
   toRadian(angle){

    return (angle*Math.PI)/180;
  }    

  drawFigure(){

     let canvas = this.timerCanvas.nativeElement;
     this.context = canvas.getContext("2d");
    
    let x=100,y=100,r=50;
    let ctx=this.context;
    let angle1= 1.5*Math.PI;
    let  angle2=angle1-this.toRadian((this.remainingSecond/this.totalSeconds)*360);
    
    if(this.remainingSecond==0){
      angle1=0;
      angle2=2*Math.PI;
    }
    ctx.clearRect(0,0,100,100);
    ctx.fillStyle="rgb(255, 204, 204)";
    ctx.arc(x,y,r-10,0,2*Math.PI);
    ctx.fill();
    
    ctx.moveTo(x,y);
    ctx.beginPath();
    ctx.arc(x,y,r,angle1,angle2);
    ctx.lineTo(x,y);
    ctx.closePath();
    ctx.fillStyle="rgb(0, 68, 102)";
    ctx.fill();

    
   console.log(this.remainingSecond,angle1,angle2);

     
  }  

  ngOnDestroy():void{
     clearInterval(this.id);
  } 

}
