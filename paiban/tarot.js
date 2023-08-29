//填充3个选择框的内容
 function InitSels()
 {
     for(var i=0; i<3; i++)
     {
         var curID = "sLSJ" + String(i);
         var curSel = document.getElementById(curID);
         curSel.length = 0; //清空选择框
         for(var j=0; j<78; j++)
         {
             addOp(curSel, j, Array78CardsNames[j]);
         }
         curSel.selectedIndex = -1; //不选中任何卡牌
     }
 }
 
 //卡牌变化时，图片跟着变
 function OnCardSelectionChange(objSel, nPic)
 {
     var ix = objSel.selectedIndex; //选中的序号
     if(ix<0 || ix>77) //合法序号0到48
     {
         return;    //非法的不处理
     }
     //获取图片对象
     var objPic = document.getElementById( "pic" + String(nPic) );
     //生成图片文件名
     var strPicSrc = "";
     if( ix < 10 )
     {
         strPicSrc = "tarot/0" + String(ix) + ".png" ;//凑两位数
     }
     else
     {
         strPicSrc = "tarot/" + String(ix) + ".png" ;
     }
     //设置图片源文件
     objPic.src = strPicSrc;
     
 }
 //卡牌正逆位
 function changeOrientation(tarotId, imgId) {
    var tarotImg = document.getElementById(imgId);
    var orientationSelect = document.getElementById(tarotId + "Orientation");
    var orientation = orientationSelect.value;
  
    if (orientation === "逆位") {
      tarotImg.style.transform = "rotate(180deg)";
    } else {
      tarotImg.style.transform = "none";
    }
  }
/////////////////////////////////////////////////////////////////
//整个排盘文本
var AllText = document.getElementById("AllText");
//排盘
function CalcLongShenPanPai()
{
    var arrJue = new Array(3);
    //取出决序号，并检查是否重复
    
    for(var i=0; i<3; i++)
    {   
        var curID = "sLSJ" + String(i);
        arrJue[i] =  document.getElementById(curID).selectedIndex;
        if( arrJue[i] < 0 || arrJue[i] > 77 ) //合法范围0到77，共78张牌
        {
            alert("请选择正确的牌名，并且三个不能重复，要按抽取顺序填！");
            return;
        };
        //检查重复
        if( CheckDuplicate(arrJue, i) ) //有重复
        {
            alert( "第"+ String(i+1) + "个纸牌决名与前面的重复，不能重复抽一张牌！" );
            return;
        }
    }
    //排盘文本
    AllText.innerHTML = GetLongShenPanPaiHTML(arrJue);
    //设置3个选择框只读
    for(var i=0; i<3; i++)
    {
        var curID = "sLSJ" + String(i);
        var curSel = document.getElementById(curID);
        var tarotID="tarot"+String(i)+"Orientation";
        var tarotSel = document.getElementById(tarotID);
        curSel.disabled = true;
        tarotSel.disabled=true
    }
    
    //执行自动复制到剪贴板，IE9和Chrome支持，火狐测试不行。
    document.execCommand("selectAll");  //全选
    document.execCommand("copy");       //复制
    document.execCommand("unselect");   //不选中 
}


//每次读取一个决名，判断与前面的是否重复
//如果不重复，返回  false，重复返回 true
function CheckDuplicate(arrJue, ix)
{
    var count = arrJue.length;
    if( ix<0  || ix>=count )
    {
        return false;    //当作没重复
    }
    //检查 ix 序号与前面的是否重复
    for(var k=0; k<ix; k++)
    {
        if( arrJue[k] != arrJue[ix] )
        {
            //没重复，检查下一个
            continue;
        }
        else //变量相等，代表决名一样
        {
            return true; //检查到重复
        }
    }
    //没查到重复
    return false;
}

//根据不重复的决名生成排盘字符串
function GetLongShenPanPaiHTML(arrJue)//决有七个
{
    //结果字符串
    var strRet = "<br><div align=\"left\" style=\"line-height: 18pt; font-family: 宋体;\">"; 
    var strTemp = "";
    
    //占事
    strTemp = document.getElementById("tZhanShi").value;
    strRet += "所占事情：" + strTemp + "<br>";
  
    //开始放决名和描述
    strRet += "顺序和描述：<br>";
    for(var i=0; i<3; i++)
    {
        strTemp =  PackCardName(String(i+1) + "、" + Array78CardsNames[ arrJue[i] ], i) 
            + "<br>" +"<b>正位</b><br>"+ Array78CardsPro[ arrJue[i] ] + "<br>"
            +"<b>逆位</b><br>" + Array78CardsCon[ arrJue[i] ] + "<br>"; 
        
        strRet += strTemp;
    }
    strRet += "<br>";
    //返回
    return strRet;
}

function PackCardName(text, ix)//0到5是蓝色，最后6是红色
{
    var resultText = "<span style='font-weight: bold; font-size: large; color: ";
    if(ix <= 5)//0-5
    {
        resultText += "blue;'>" ;
    }
    else
    {
        resultText += "red;'>" ;
    }    
    resultText += text;
    resultText += "</span>";
    return resultText;
}

/////////////////////////////////////////////////////////////////
//随机数算法
function GetRandomInt(nMax)
{
    var d = new Date();
    nMax = Math.floor(nMax); //目前只用整数
    if( nMax < 1 ) //不正常的上限数字
    {
        return 0;
    }
    //返回毫秒数生成的随机数
    return d.getTime() % nMax;    
}

//78个卡牌名
var Array78CardsNames = [
    "愚者", "魔术师", "女祭司", "皇后", "皇帝", "教皇", "恋人",
    "战车", "力量", "隐者", "命运之轮", "正义", "倒吊人", "死神",
    "节制", "恶魔", "高塔", "星星", "月亮", "太阳", "审判",
    "世界", "权杖首牌", "权杖二", "权杖三", "权杖四", "权杖五", "权杖六",
    "权杖七", "权杖八", "权杖九", "权杖十", "权杖侍从", "权杖骑士", "权杖皇后",
    "权杖国王", "圣杯首牌", "圣杯二", "圣杯三", "圣杯四", "圣杯五", "圣杯六",
    "圣杯七", "圣杯八", "圣杯九", "圣杯十", "圣杯侍从", "圣杯骑士", "圣杯皇后",
    "圣杯国王", "宝剑首牌", "宝剑二", "宝剑三", "宝剑四", "宝剑五", "宝剑六",
    "宝剑七", "宝剑八", "宝剑九", "宝剑十", "宝剑侍从", "宝剑骑士", "宝剑皇后",
    "宝剑国王", "钱币首牌", "钱币二", "钱币三", "钱币四", "钱币五", "钱币六",
    "钱币七", "钱币八", "钱币九", "钱币十", "钱币侍从", "钱币骑士", "钱币皇后",
    "钱币国王"
    ];

//正位
var Array78CardsPro = [
"关键词：冒险、寻梦人、不拘泥于传统的观念、自由奔放、一切从基础出发、四处流浪。<br>含义：代表新的开始、冒险和探索精神。它象征着无畏地追求梦想，不受传统观念束缚，以及勇于冒险和探索未知领域的态度。",

];

//逆位
var Array78CardsCon = [
    "关键词：冲动、不负责任、盲目行动、缺乏计划、不成熟。<br> 含义：表示冲动和不负责任的行为。逆位的愚者牌可能暗示着过于冲动、缺乏计划和考虑后果的行动，或者代表着不成熟和缺乏经验。",
   
];


////////////////////////////////////////////////////////////
//补充数据、函数
/*********************
给select加option等
*********************/
function addOp(sel,v,t){ //给select对象加入option
  var Op = document.createElement("OPTION");
  Op.value=v;  Op.text=t;
  sel.add(Op);
}

