function game_starts()
{
    ceilfloor.draw();
    runner.place(pos);
    n=holes.position;
    setInterval(Update,1);    
}
var n,ctx,pos,x=0,a,score=0,t1,t2,t,b=0,c=0;
var runner=
{
    place: function(pos)
    {
        this.pos=pos;
        ctx.fillStyle="Red";
        ctx.fillRect(10,84,canvas.width/20,canvas.height/10);
       
    },
    Change: function()
    {
        
        if(this.pos=="DOWN")
        {
            this.pos="UP";
            ctx.clearRect(10,84,15,15);
            ctx.fillStyle="Red";
            ctx.fillRect(10,41,canvas.width/20,canvas.height/10);
        }
        else if(this.pos=="UP")
        {
            ctx.clearRect(10,41,canvas.width/20,canvas.height/10);
            ctx.fillStyle="Red";
            ctx.fillRect(10,84,canvas.width/20,canvas.height/10);
            this.pos="DOWN";
        }
    
        
    }
}
var ceilfloor=
{
   draw: function()
    {
        this.dist1=25;
        this.dist2=100;
        if(canvas.getContext)
            {
            ctx=canvas.getContext("2d");
            ctx.fillStyle="Blue";
            ctx.fillRect(0,25,canvas.width,canvas.height/10);
            ctx.fillStyle="Blue";
            ctx.fillRect(0,100,canvas.width,canvas.height/10);
            pos="DOWN";
            n=canvas.width;
            holes.position=n;
    }    
}
}

function Update()
{
    holes.fill();
    if(x==0)
    {
        holes.posplace();
        holes.randomwidth();
    }
    holes.position_update();
    holes.clear();
    holes.check();
    holes.Update_Speed();
}
var holes=
{
    speed:0.5,
    width:0,
    holepos:"DOWN",
    fill:function()
    {
        t1=new Date();
        if(this.holepos=="DOWN")
        {
            ctx.fillStyle="Blue";
            ctx.fillRect(this.position,100,this.width+1,canvas.height/10);
        }
        else if(this.holepos=="UP")
        {
            ctx.fillStyle="Blue";
            ctx.fillRect(this.position,25,this.width+1,15);
        }
    },
    posplace:function()
    {
        a=Math.floor(Math.random()*2);
        if(a==0)
        {
            this.holepos="UP";
        }
        else if(a==1)
        {
            this.holepos="DOWN";
        }
        x++;
    },
    randomwidth:function()
    {
        a=Math.floor(Math.random()*100)+15;
        this.width=a;
    },
    position_update:function()
    {
        if(this.position>=(-a))
        {
            this.position-=this.speed;
        }
        else
        {
            this.position=n;
            x=0;
        }
    },
    clear:function()
    {
        if(this.holepos=="DOWN")
        {
            ctx.clearRect(this.position,100,this.width,15);
        }
        else if(this.holepos=="UP")
        {
            ctx.clearRect(this.position,25,this.width,15);
        }
        t2=new Date();
        t=t2-t1
        score+=this.speed*t;
    },
    check:function()
    {
        if(this.holepos==runner.pos)
        {
            if((this.position<10)&&((this.position+this.width)>25))
            {   
                this.position+=this.speed;
                score=Math.round(score);
                localStorage.setItem("score",score);
                var highscore=localStorage.getItem("highscore");
                if(highscore<score)
                {
                    localStorage.setItem("highscore",score);
                }
                window.location.href="Result.html";
            }    
        }
    },
    Update_Speed:function()
    {
        if(((score-b)>10)&&(a==0))
        {
            a=1;
            b=score;
            this.speed+=0.8;
        }
        else if((score-b)>100)
        {
            b=score;
            this.speed+=0.2;
        }
    }
}
