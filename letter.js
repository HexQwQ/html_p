

var aLetter = [], Move_Interval = [];
var createTimer, changeTimer;
function create() {
    //随机生成字符编码
    var number = Math.floor(Math.random() * 26 + 65);
    //随机生成字母出现在屏幕上的位置
    var px = Math.random() * screen.availWidth + "px";
    //将字符编码转换为字母
    var letter = String.fromCharCode(number);
    //生成div
    var oDiv = document.createElement("div");
    oDiv.setAttribute("name", "letter");
    //生成一个总数加一，为了记录一共输出了多少字母
    total++;
    //设置div的属性
    oDiv.setAttribute("style",
        "position:absolute; width:10px; height:10px; left:20px; top:40px");
    oDiv.style.left = px.toString();
    var oText = document.createTextNode(letter);
    oDiv.appendChild(oText);
    var root = document.documentElement;
    var oBody = root.lastChild;
    oBody.appendChild(oDiv);
    this.Lettermove = function(){
        oDiv.style.top = parseInt(oDiv.style.top)+1+'px'
    }
}



function changeStyle() {
    //获得所有包含字母的DIV
    var oLetters = document.getElementsByName("letter");      
    //改变记录行的内容
    var total = document.getElementById("total");
    total.innerHTML = "共出现" + (window.total - 1) + "个字母，您一共打了" + test + "个字母，打对" + score + "个，打错" + error + "个，遗漏" + miss + "个";
    //判断DIV是否超出边界，如果超出，删除DIV，如果没超出，继续向下走
    for (var i = 0; i < oLetters.length; i++) {
        var oldTop = parseInt(oLetters[i].style.top);
        if (oldTop >= screen.availHeight - 240) {
            document.body.removeChild(oLetters[i]);
            window.miss += 1;
        } else {
            var newTop = 40 + oldTop + "px";
            oLetters[i].style.top = newTop;
        }
    }
}

function input(event) {
    window.totalInput += 1;
    //获得键盘输入的字母
    var key = String.fromCharCode(event.keyCode);
    //比较输入也屏幕上的字母是否有相同的，如果有删除该DIV，如果没有错误+1
    var oLetters = document.getElementsByName("letter");
    for (var i = 0; i < oLetters.length; i++) {
        if (oLetters[i].textContent == key) {
            document.body.removeChild(oLetters[i]);
            window.score += 1;
            return 1;
        }
    }
    window.error += 1;
    
}

// function Move(Time){
    
    // }
    
function createLetter(){
    // var Time = Math.floor(Math.random()*400+100);
    aLetter.push(new create());
    // setInterval(aLetter[aLetter.length()-1].Lettermove, Time);
}
function LetMove(){
    // clearInterval(changeTimer); 
    for(var i=0;i<aLetter.length;i++)  
    {
        if( Move_Interval[i] == 0 )
        {
            var Time = Math.floor(Math.random()*200+20);
            setInterval(aLetter[i].Lettermove, Time);
            Move_Interval[i] = 1;
        }
    }
}

function start() {
    for(var i=0;i<1000;i++)  Move_Interval[i] = 0;
    window.addEventListener("keydown", input);
    createTimer = setInterval(createLetter, 500);
    changeTimer = setInterval(LetMove, 100);
}

function stop() {
    // window.addEventListener("keydown", input);
    // changeTimer = setInterval(LetMove, 1);
    // createTimer = setInterval(createLetter, 1);
    clearInterval(createTimer);
    clearInterval(changeTimer);
}
