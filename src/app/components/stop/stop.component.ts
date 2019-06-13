import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stop',
  templateUrl: './stop.component.html',
  styleUrls: ['./stop.component.css']
})
export class StopComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.getElementById('lap').style.display = 'none';    
  }
  
  btnText: string="Start";
  hr: number = 0;
  min:number = 0;
  sec: number = 0;
  msec: number = 0;
  start:boolean = false;
  pause:boolean = false;
  lap:boolean = false;
  count:number = 1;
  x:number = 10;
  intervalId;
  lhr: number = 0;
  lmin: number = 0;
  lsec: number = 0;
  lmsec: number = 0;
  lapDiv:any;


  reset(){
      this.x=0;
      this.btnText="Start";
      this.hr=this.min=this.sec=this.msec=this.lhr=this.lmin=this.lsec=this.lmsec=0;
      this.start=false;
      this.pause=false;
      document.getElementById('lap').style.display = 'none';  
      
      
  }

  onStart(){
    this.btnText="Stop"; 
     this.x=10;
     this.start=true;
     this.intervalId=setInterval(()=>{
       this.updateTime();
     },100);
  }
  
  onPause(){
    this.pause=true;
    this.btnText="Resume"; 
    clearInterval(this.intervalId);
  }
  onResume(){
    this.btnText="Stop"; 
     this.pause=false;
     //this.updateTime();
     this.intervalId=setInterval(()=>{
       this.updateTime();
     },100);
    
  }
  updateTime(){
    
    this.msec+=this.x;

    if(this.msec>90){
        this.msec=0;
        this.sec++;
    }

    if(this.sec>59){
        this.sec=0;
        this.min++;
    }

    if(this.min>59){
        this.min=0;
        this.hr++;
    }

  }
  onLap(){    
    this.lhr = this.hr - this.lhr;
    this.lmin = this.min - this.lmin;
    this.lsec = this.sec - this.lsec;
    this.lmsec = this.msec;
    this.lap = true;
    if(this.lap){      
      this.lapDiv = document.getElementById('lap');
      this.lapDiv.style.display = 'block';
      this.lapDiv.innerHTML += '<div class="marginClassLap" id="lap">'+
                            '<span  class="smallLap">'+'Lap ' +'</span>'+
                            '<span  class="smallLap">'+ this.count +'</span>'+
                            '<span class="smallLap">'+ ' :-'+' </span>'+
                          
                          
                            '<span  class="smallLap">'+ this.lhr +'</span>'+
                            '<span  class="smallLap">'+'hr'+'</span>'+
                            '<span class="smallLap">'+ ':'+' </span>'+
                          
                            '<span  class="smallLap">'+ this.lmin +'</span>'+
                            '<span  class="smallLap">'+ 'min' +'</span>'+
                            '<span class="smallLap">'+ ':'+' </span>'+
                          
                            '<span  class="smallLap">'+this.lsec +'</span>'+
                            '<span  class="smallLap">'+ 'sec' +'</span>'+
                            '<span class="smallLap">'+ ':'+' </span>'+
                          
                            '<span  class="smallLap">'+ this.lmsec +'</span>'+
                            '<span  class="smallLap">'+ 'ms' +'</span>'+                         
                          '</div>';
        this.count ++;

    } 
       
  }
}