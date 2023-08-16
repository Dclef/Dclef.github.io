//龙神诀不需要时间，这里纯粹是计时用的
//程序理论适用时间段 1583 年 到 3199 年，即格里高利历后一年到3200前一年，3200年是否为闰年待定。
//全局变量，把起始时间和结束时间改一下就可以更换排盘的年份范围，这里为最近的240年时间段。
var gStartYear = 1924;
var gEndYear = 2164;

//公历控件
var sGGYear = document.getElementById("sGGYear");
var sGGMonth = document.getElementById("sGGMonth");
var sGGDay = document.getElementById("sGGDay");
var sGGHour = document.getElementById("sGGHour");
var sGGMinute = document.getElementById("sGGMinute");

//公历时间动态更新
//function addOp(sel,value,text)  //给select对象加入option

//初始化用2000年12月12日
function InitGGYears()    //初始化时一次性调用
{
    //清空旧的选项
    sGGYear.length = 0; 
    for(var i=gStartYear; i<=gEndYear; i++)
    {
        addOp(sGGYear, i, String(i) );
    }
    //默认选择2000年
    sGGYear.selectedIndex = 2000 - gStartYear;
}
//初始是2000年12月份
function InitGGDays() //初始化时一次性调用
{
    //清空旧的一个选项
    sGGDay.length = 0;
    //添加，2000年12月
    var nCount = 31;
    for(var i=1; i<=nCount; i++)
    {
        addOp(sGGDay, i, String(i) );
    }
    sGGDay.selectedIndex = 12 - 1 ;//12月12号
}

//公历平年每月天数
var gGLDaysInMonth = new Array
   (31, 28, 31, 30,
    31, 30, 31, 31,
    30, 31, 30, 31);
//根据公历年份、月份获知该月的天数 
function GetGLDaysCountByYearAndMonth(year, month)
{
    if(month != 2)
    {
        //不是2月，不管闰年
        return gGLDaysInMonth[month - 1];        
    };
    //下面是2月，判断是否闰月
    if( IsGLRunNian(year) )
    {
        return 29;
    }
    else
    {
        return 28;
    }
}//
//判断公历闰年，格里高利历
function IsGLRunNian(year)
{
    if( (year % 4) != 0 )
    {
        //非闰年
        return false;
    };
    //被4整除的
    if( (year % 100) == 0 )//被100整除
    {
        if( (year%400) == 0 )//被400整除
        {
            return true;
        }
        else//不被400整除
        {
            return false;
        }
    }
    else//不被100整除，被4整除
    {
        return true;
    }
}

//根据年份变化，考虑是否更新日期
function OnGGYearChanged()
{
    //年份变化只影响2月
    var curYear = sGGYear.value;
    var curMonth = sGGMonth.value;
    if(curMonth != 2)
    {
        return; //不是2月
    }
    //是2月
    var oldDaysCount = sGGDay.length;
    var newDaysCount = GetGLDaysCountByYearAndMonth(curYear, curMonth);
    if( oldDaysCount == newDaysCount )
    {
        //旧的天数和新的天数没变，不需要改动
        return;
    }
    //天数有变化
    if( oldDaysCount > newDaysCount )//旧的是29天，新的是28天
    {
        sGGDay.remove(29 - 1);    //移除末尾的29号
    }
    else//旧的28天，新的29天
    {        
        addOp(sGGDay, 29, "29" );//数字29是value， "29" 是text
    }
}
//根据月份变化，考虑是否更新日期
function OnGGMonthChanged()
{
    var curYear = sGGYear.value;
    var curMonth = sGGMonth.value;
    //根据年月设置天数
    //旧的天数，全部移除掉
    var oldCount = sGGDay.length;
    var newCount =  GetGLDaysCountByYearAndMonth(curYear, curMonth);
    //如果天数一样不用变化
    if( oldCount == newCount )
    {
        return;
    }
    //新旧天数不一样，多退少补
    if( oldCount > newCount )
    {
        //多了的删掉
        for(var i=oldCount; i>newCount; i--)
        {
            sGGDay.remove( i-1 );
        }
    }
    else
    {
        //少了补齐
        for(var i=oldCount+1; i<=newCount; i++)
        {
            addOp(sGGDay, i, String(i) );
        }
    }
}
//////////////////////
//出生年份
var sShengNian = document.getElementById("sShengNian");
function InitChuShengNianFen()
{
    //清空旧的选项
    sShengNian.length = 0; 
    for(var i=gStartYear; i<=gEndYear; i++)
    {
        addOp(sShengNian, i, String(i) + JiaZi[ GetNianJiaZiShu(i) ] );
    }
    //默认选择1990年
    sShengNian.selectedIndex = 1990 - gStartYear;
}
///////////////////////
 function FillCurTime() //自动填充当前时间，公历的更新。
 {
    var curTime = new Date();
    var year = curTime.getFullYear();
    var month = curTime.getMonth(); //JS月份是0到11
    var day = curTime.getDate();    //getDate是日子，getDay是星期几
    var hour = curTime.getHours();
    var minute = curTime.getMinutes();
    //设置控件
    sGGYear.selectedIndex = year - gStartYear;
    //年份变化
    OnGGYearChanged();    
    sGGMonth.selectedIndex = month;
    //月份变化
    OnGGMonthChanged();
    //设置日子和小时
    sGGDay.selectedIndex = day - 1;
    sGGHour.selectedIndex = hour;
    sGGMinute.selectedIndex = minute;
 }
 ////////////////////////////////////////
  ////////////////////////////////////////
 //设置七个按钮、7个卡牌序号等
 var gArrButtons = new Array(8);    //7个抽牌按钮加1个排盘按钮
 var gArrCardNumbers = new Array(7);//保存0到6，七星序号
 var gArrChosen7Cards = new Array(7); //抽取的7张卡牌序号
 function InitButtons()
 {
     //保存按钮列表
     for(var i=0; i<7; i++)
     {
        var curID = "btnQXJ" + String(i); //七星决按钮id
        gArrButtons[i] = document.getElementById(curID);
        gArrChosen7Cards[i] = -1;   //还没抽牌都是-1
     }
     //第八个是排盘按钮
     gArrButtons[7] = document.getElementById("btnPaiPan");
     //用于抽牌的动态数组
     for(var i=0; i<7; i++)
     {
         gArrCardNumbers[i] = i; //七星序号，现在是顺序的，下一步洗牌
     }
     //洗牌11轮
     XiPai(gArrCardNumbers, 11);
     //console.log(gArrCardNumbers);
 }
 //第一个是数组，第二个是洗牌轮数
 function XiPai(theArray, rounds)
 {
     //个数，造伪随机数
     var nCount = theArray.length;
     var vTemp;
     //洗牌
     for(var i=0; i<rounds; i++)
     {
         //每轮洗牌
         for(var k=0; k<nCount; k++)
         {
             var dstIndex = Math.floor( Math.random()*nCount*10000 ) % nCount;
             //交换元素
             vTemp = theArray[k]; 
             theArray[k] = theArray[dstIndex]; 
             theArray[dstIndex] = vTemp;
         }
     }
 }
  
//依次抽取7张牌，洗牌是伪随机数，抽牌是与决主点击时间相关的真随机数
//卡牌变化时，图片跟着变
 function OnChoosingCard(objButton, nPic)
 {
    nPic = Number(nPic); //转为数字
    //随机生成卡牌序号
    var ix = GetRandomInt( 7 - nPic ); //选中的数组元素序号
    //保存动态数组中抽到的元素
    gArrChosen7Cards[nPic] = gArrCardNumbers[ix];
    //从动态数组剔除该元素，这样不会重复抽牌
    gArrCardNumbers.splice(ix, 1); //删除第 ix 个元素
    //alert(gArrCardNumbers.length); 

    //获取图片对象
    var objPic = document.getElementById( "pic" + String(nPic) );
    //生成图片文件名
    ix = gArrChosen7Cards[nPic] ; //使用动态数组中选取元素保存的序号
    var strPicSrc = "qixing/" + String(ix) + ".png" ;
    //设置图片源文件
    objPic.src = strPicSrc;
    //设置按钮文本
    objButton.value = ArrayCiShuStrs[nPic] + ArrayQiXingNames[ix];

    //禁用本按钮
    objButton.disabled = true;
    //启用下一个抽牌按钮
    gArrButtons[nPic + 1].disabled = false;
    
    //如果是抽第六张牌，序号5，那么自动调用第七张抽牌的
    if( 5 == nPic )
    {
        //最后自动抽第七张牌
        OnChoosingCard( gArrButtons[nPic+1], nPic+1 );
    }    
 }
 
  //次数汉字字符串
 var ArrayCiShuStrs = [
   "第一张",  "第二张", "第三张", "第四张",
   "第五张" , "第六张", "第七张"
 ];
 
/////////////////////////////////////////////////////////////////
//整个排盘文本
var AllText = document.getElementById("AllText");
//在线起七星决排盘
function CalcQiXingPanPaiZX()
{
    //软件抽取的卡牌没有重复的，抽一张删一张，本按钮启用时正好抽完7张
    
    //使用公历时间进行排盘
    var bzpp = GetGGTimeBZPP();
    //生成七星决对象
    var qxjObj = new Object();
    qxjObj.bzpp = bzpp;
    qxjObj.arrJue = gArrChosen7Cards; //抽取的七星顺序数组
   
    //设置七星决排盘对象
    SetQXJObject(qxjObj);

    //更新表格内七星字符串
    UpdateTableQXStrs(qxjObj);
    
    //生成排盘文本
    AllText.innerHTML = GetQiXingPanPaiHTML(qxjObj);
    
    //执行自动复制到剪贴板，IE9和Chrome支持，火狐测试不行。
    document.execCommand("selectAll");  //全选
    document.execCommand("copy");       //复制
    document.execCommand("unselect");   //不选中 
}

//公历时间排盘
function GetGGTimeBZPP()
{    
    var myJD = JD;
    myJD.Y = Number(sGGYear.value);
    myJD.M = Number(sGGMonth.value);
    myJD.D = Number(sGGDay.value);
    myJD.h = Number(sGGHour.value);
    myJD.m = Number(sGGMinute.value);
    myJD.s = 30;  //默认是30秒的排盘
    //儒略日
    var birthTime = myJD.toJD();
    var bzpp =  CalcBaZiObject(birthTime, "男", 120, 0);//男女排盘没区别，只要四柱
    return bzpp;
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
/**
    qxjObj.bzpp //八字排盘
    qxjObj.arrJue //七星决顺序
 */
 function SetQXJObject(qxjObj)
 {
     /////////////////////////////////////////////////
     /*1、总纲，判断天时、断图七星的五行、旺衰、顺逆局*/
     //求天时
     qxjObj.TianShiWX = CalcTianShi( qxjObj.bzpp.iRiJZ, qxjObj.bzpp.iShiJZ );
     //决时图
     qxjObj.curJueShiTu = JueShiXingTuArray[qxjObj.TianShiWX];
     //断图的七星五行
     qxjObj.arrQXWuXing = new Array(7);
     for(var i=0; i<7; i++)
     {
         if( qxjObj.arrJue[i] > 1 ) //不是天枢天璇
         {
             qxjObj.arrQXWuXing[i] = ArrayQiXingWuXing[ qxjObj.arrJue[i] ];
         }
         else//天枢天璇
         {
             qxjObj.arrQXWuXing[i] = qxjObj.TianShiWX;  //同天时五行
         }
     }
     //七星强弱直接查询每个星在 curJueShiTu[] 中的序号就行，0是最旺，6是最弱
     qxjObj.arrQXQiangRuoIndexs = new Array(7);
     for(var i=0; i<7; i++)
     {
         qxjObj.arrQXQiangRuoIndexs[i] = qxjObj.curJueShiTu.indexOf( qxjObj.arrJue[i] );
     }
     //顺逆决的判断
     qxjObj.typeShunNi = GetShunNiType( qxjObj );
     //天枢位置，天枢自己是0，序号从零开始的，讲义的357在这是246
     qxjObj.posTianShu = qxjObj.arrJue.indexOf(0);
     
     //与太一星图求异星
     qxjObj.arrTaiYiYiXing = new Array(7);
     for(var i=0; i<7; i++)
     {
         if( qxjObj.arrJue[i] != TaiYiXingTu[i] ) //是异星
         {
             qxjObj.arrTaiYiYiXing[i] = 1; 
         }
         else
         {
             qxjObj.arrTaiYiYiXing[i] = 0; //太一同的
         }
     }
     //是否与太一全异，不合天道，全异否决
     if( CalcArraySum( qxjObj.arrTaiYiYiXing ) >= 7 )
     {
         qxjObj.bTaiYiQuanYi = true;
     }
     else
     {
         qxjObj.bTaiYiQuanYi = false;
     }
     
     //与决时星图求同星
     qxjObj.arrJueShiTongXing = new Array(7);
     for(var i=0; i<7; i++)
     {
         if( qxjObj.arrJue[i] != qxjObj.curJueShiTu[i] ) //不是同星
         {
             qxjObj.arrJueShiTongXing[i] = 0;
         }
         else //决时同星
         {
            qxjObj.arrJueShiTongXing[i] = 2; //用2，后面方便加
         }
     }
     //是否与决时图全异
     if( CalcArraySum(qxjObj.arrJueShiTongXing) < 1 ) //没有相同的
     {
         qxjObj.bJueShiQuanYi = true; //全异否决
     }
     else
     {
         qxjObj.bJueShiQuanYi = false;
     }
     
     //计算同异复星
     qxjObj.arrTongYiFuXing = new Array(7);
     for(var i=0; i<7; i++)
     {
         qxjObj.arrTongYiFuXing[i] =  qxjObj.arrTaiYiYiXing[i] + qxjObj.arrJueShiTongXing[i];
     }

     return; //计算完毕
 }
 //根据七星决对象，更新表格中的七星文本、总纲文本
 function UpdateTableQXStrs(qxjObj)
 {
     //总纲对象
     var otZongGang = document.getElementById("textZongGang");
     //生成总纲文本
     var strZongGang = "<b>断图总纲</b><br>";
     var strTemp = "";
     //天时
     strZongGang += "<b>天时：" + WuXing[ qxjObj.TianShiWX ] + "</b><br>";
     //顺逆局
     strZongGang += QXJLeiXing[ qxjObj.typeShunNi ] + "<br>";
     //天枢位置，357减为246
     if(   2 == qxjObj.posTianShu
        || 4 == qxjObj.posTianShu
        || 6 == qxjObj.posTianShu )
    {
        strTemp = "<span style='color: red; font-weight: bold;'>天枢在"
                + String( qxjObj.posTianShu+1 ) + "</span><br>" ;
        strZongGang += strTemp;
    }
     
     //两个全异判断
     if( qxjObj.bTaiYiQuanYi ) //太一全异
     {
         strTemp = "<span style='color: red; font-weight: bold;'>太一星图全异"
                + "</span><br>" ;
        strZongGang += strTemp;
     };
    if( qxjObj.bJueShiQuanYi ) //决时全异
     {
         strTemp = "<span style='color: red; font-weight: bold;'>决时星图全异"
                + "</span><br>" ;
        strZongGang += strTemp;
     };
     //设置总纲
     otZongGang.innerHTML = strZongGang;
     
     //更新七星的文本
     var baseIDText = "textQXJ";
     for(var i=0; i<7; i++)
     {
         var curID = baseIDText + String(i);
         //对象
         var curObjText = document.getElementById(curID);
         //文本
        var curXingHTML = "";
         //强弱判断
        strTemp = ArrayQiangRuo[ qxjObj.arrQXQiangRuoIndexs[i] ];  
        strTemp = PackQXWXText(strTemp,  qxjObj.arrQXWuXing[i] );
        if( 3 == qxjObj.arrQXWuXing[i] ) //金色看不清
        {
            strTemp = "<span style='background-color:  #0000FF;'>" + strTemp + "</span>";
        }
        curXingHTML += strTemp;
        //异星、同星判断
        curXingHTML += "<br>";
        curXingHTML += QXTongYiStrs[ qxjObj.arrTongYiFuXing[i] ];

        //设置七星文本
        curObjText.innerHTML = curXingHTML;
     }
 }
 
//根据日柱、时柱甲子求天时五行
function CalcTianShi( iRiJZ, iShiJZ )
{
    //日支、时支
    var nRiZhi = iRiJZ % 12;
    var nShiZhi = iShiJZ % 12;
    //五行
    var riWX = DiZhiChaWuXing[nRiZhi];
    var shiWX = DiZhiChaWuXing[nShiZhi];
    //计算 如 木0 火1 土2 金3 水4
    if( riWX+0 == shiWX  ) //同五行
    {
        return riWX;
    }
    else if( (riWX+1)%5 == shiWX) //日生时
    {
        return shiWX;   //木生火，得火
    }
    else if( (riWX+2)%5 == shiWX ) //木克土，是木
    {
        return riWX;
    }
    else if( (riWX+3)%5 == shiWX ) //木被金克
    {
        return shiWX;
    }
    else //riWX+4 ，日木，时水
    {
        return riWX;
    }
}
/*  
  "普通决",//0
  "顺天决",//1
  "逆天决",//2
  "顺时决",//3
  "逆时决" //4 */
function GetShunNiType( qxjObj )
{
    //太一星图
    var curTY = TaiYiXingTu;
    //决时星图
    var curJS = qxjObj.curJueShiTu;
    
    //顺天局判断
    var isShunTian = true; //先假定是顺天
    for(var i=0; i<7; i++ )
    {
        if( curTY[i] != qxjObj.arrJue[i] )//如果有不同的就不是顺天
        {
            isShunTian = false;
            break; //停止查
        }
    }
    if( isShunTian ) return 1; //顺天局返回

    ///////////////////
    //逆天局判断
    var isNiTian = true;//假定逆天
    for(var i=0; i<7; i++)
    {
        if( curTY[6-i] != qxjObj.arrJue[i] )//如果有不同的就不是逆天
        {
            isNiTian = false;
            break; //停止查
        }
    }
    if( isNiTian ) return 2;   //逆天局返回

    ////////////////////////////////////////
    //顺时局判断
    var isShunShi = true; //假定顺时
    for(var i=0; i<7; i++)
    {
        if( curJS[i] != qxjObj.arrJue[i] ) //有不同的，不是顺时
        {
            isShunShi = false;
            break; //停止检查
        }
    }
    if( isShunShi ) return 3;  //顺时局返回3    

    ////////////////////////////////////////
    //逆时局判断
    var isNiShi = true; //假定逆时
    for(var i=0; i<7; i++)
    {
        if( curJS[6-i] != qxjObj.arrJue[i] ) //有不同的，不是逆时
        {
            isNiShi = false;
            break;
        }
    }
    if( isNiShi ) return 4;  //逆时局返回 4   

    //最后都没中
    return 0; 
}

//根据七星决对象生成排盘的文本
function GetQiXingPanPaiHTML(qxjObj)//决有七个
{
    //结果字符串
    var strRet = "<br><div align=\"left\" style=\"line-height: 18pt; font-family: 宋体;\">"; 
    var strTemp = "";
    var curJD = qxjObj.bzpp.JDBirth; //起卦的儒略日时间
    
    //占事
    strTemp = document.getElementById("tZhanShi").value;
    strRet += "所占事情：" + strTemp + "<br>";
    //起决方式
    strRet += "起决方式：在线抽电子牌（洗牌伪随机，抽牌真随机）<br>";
    //卦主性别、生年
    strTemp = "卦主性别：" + document.getElementById("sGender").value
        + "， 生年：" + sShengNian.options[sShengNian.selectedIndex].text;
    strRet += strTemp + "<br>";  
    //公历时间
    strRet += GetGGTimeStr(curJD) + "<br>";
    //农历时间
    strRet += GetNNTimeStr(curJD) + "<br>";
    //构造干支字符串
    strTemp = "干支：" + GetBoldText( JiaZi[qxjObj.bzpp.iNianJZ] ) + "年"
        + "　" + GetBoldText(  JiaZi[qxjObj.bzpp.iYueJZ] ) + "月" 
        + "　" + GetFuchsiaText(GetBoldText( JiaZi[ qxjObj.bzpp.iRiJZ ] )) 
        + "日　" 
        + GetFuchsiaText(GetBoldText( JiaZi[ qxjObj.bzpp.iShiJZ ] ))
        + "时" ;
    strRet += strTemp + "<br><br>" ;
    ////////////////////////////////////////////////
    //总纲
    strRet += "<b>一、断图总纲</b><br>";
    //天时
    strRet += "<b>天时：" +  WuXing[qxjObj.TianShiWX] + "</b><br>";
    //顺逆、普通局类型
    strRet += "<b>" +  QXJLeiXing[ qxjObj.typeShunNi ] 
             + QXJLeiXingMiaoShu[qxjObj.typeShunNi] + "</b><br>";
    //天枢星的位置，原本357，这里序号为246
    if(     2 == qxjObj.posTianShu
         || 4 == qxjObj.posTianShu
         || 6 ==  qxjObj.posTianShu)
    {
        strTemp = "天枢在" + String( qxjObj.posTianShu + 1 )
            + "：事情多数落空，测病或出家修道例外。";
        strTemp =  GetBoldText( GetRedText(strTemp) );
        strRet += strTemp + "<br>" ;
    }
    //顺天决顺时决一般不看异星、同星
    //顺天1，顺时3
    if( 1 == qxjObj.typeShunNi || 3 == qxjObj.typeShunNi )
    {
        //与太一全异判断
        if(qxjObj.bTaiYiQuanYi)
        {
            strRet += "与太一星图全异：优先论顺决。<br>" ;
        }
        if(qxjObj.bJueShiQuanYi)
        {
            strRet += "与决时星图全异：优先论顺决。<br>" ;
        }
    }
    else
    {
        //太一全异和决时全异
         if(qxjObj.bTaiYiQuanYi)
        {
            strRet += GetBoldText(GetRedText("与太一星图全异：有违天道，大事不利，小事无妨。<br>")) ;
        }
        if(qxjObj.bJueShiQuanYi)
        {
            strRet += GetBoldText(GetRedText("与决时星图全异：不得天时，大事不利，小事无妨。<br>")) ;
        }
    }
    strRet += "<br>";
    /////////////////////////////////////
    //开始放星名和描述
    strRet += "<b>二、七星顺序和强弱</b>（4颗★及以上为强，其他为弱）<br>";
    var strT2 = "";
    for(var i=0; i<7; i++)
    {
        //星名
        strTemp = String(i+1) + "、" + ArrayQiXingNames[ qxjObj.arrJue[i] ] + "，　五行";        
        //五行
        strTemp += ArrayQXWXPrefixStrs[ qxjObj.arrJue[i] ] + WuXing[qxjObj.arrQXWuXing[i]];
        //强弱
        strT2 = PackQXWXText(ArrayQiangRuo[ qxjObj.arrQXQiangRuoIndexs[i] ],  qxjObj.arrQXWuXing[i] );
        if( 3 == qxjObj.arrQXWuXing[i] ) //金色看不清
        {
            strT2 = "<span style='background-color: #0000FF;'>" + strT2 + "</span>";
        }
        strTemp += "，　" +  strT2;
        strTemp += "<br>";
        //星相意义
        strTemp += ArrayQiXingMiaoShu[ qxjObj.arrJue[i] ];
        strTemp += "<br>";        
        //开头结尾判断
        if(0 == i )
        {
            //加开头
            strTemp += "<b>" + ArrayQiXingStart[ qxjObj.arrJue[i] ] + "</b><br>" ;
        }
        if(6 == i)
        {
            //加结尾
            strTemp += "<b>" + ArrayQiXingEnd[ qxjObj.arrJue[i] ] + "</b><br>" ;
        }        
        //添加
        strRet += strTemp;
    }
    //补充顺天决、顺时决的提示
    if( 1 == qxjObj.typeShunNi || 3 == qxjObj.typeShunNi )
    {
        strRet += GetFuchsiaText( GetBoldText("顺天决和顺时决例外，顺决不论何星结尾，都论大吉。") ) + "<br>";
    }
    strRet += "<br>";
    
    //与太一星图求异星
    strRet += "<b>三、与太一星图求异星</b>（异星为事物发展的关键要素）<br>";
    strRet += "主断图　太一星图　求异<br>";
    var tyyxCount = 0; //异星计数
    for(var i=0; i<7; i++)
    {
        if( qxjObj.arrTaiYiYiXing[i] > 0 ) //是异星
        {
            strTemp = ArrayQiXingNames[qxjObj.arrJue[i]] + "　→　" 
                     + ArrayQiXingNames[TaiYiXingTu[i]] + "　　异";
            strTemp = GetRedText( GetBoldText(strTemp) );
            tyyxCount++;
        }
        else
        {
            //不是异星
            strTemp = ArrayQiXingNames[qxjObj.arrJue[i]] + "　　　" 
                     + ArrayQiXingNames[TaiYiXingTu[i]] + "　　==";
        }
        //添加字符串
        strRet += strTemp + "<br>";
    }
    strTemp = "太一异星计数：" + String( tyyxCount );
    if( tyyxCount >= 7 )
    {
        strTemp += "（与太一星图全异）";
    }
    else if( tyyxCount < 1 ) //顺天决
    {
        strTemp += "（顺天决）";
    }
    strRet += strTemp + "<br>";
    strRet += "<br>";
    
    //与决时星图求同星
    strRet += "<b>四、与决时星图求同星</b>（同星为事物发展的关键时间点）<br>";
    strRet += "主断图　决时星图　求同<br>";
    var jstxCount = 0; //决时同星计数
    for(var i=0; i<7; i++)
    {
        if( qxjObj.arrJueShiTongXing[i] > 0 ) //是决时同星
        {
            strTemp = ArrayQiXingNames[qxjObj.arrJue[i]] + "　　　" 
                     + ArrayQiXingNames[ qxjObj.curJueShiTu[i] ] + "　　同";
            strTemp = GetGreenText( GetBoldText(strTemp) );
            jstxCount++;
        }
        else
        {
            //不是同星
            strTemp = ArrayQiXingNames[qxjObj.arrJue[i]] + "　→　" 
                     + ArrayQiXingNames[ qxjObj.curJueShiTu[i] ] + "　　×";
        }
        //添加字符串
        strRet += strTemp + "<br>";
    }
    strTemp = "决时同星计数：" + String( jstxCount );
    if( jstxCount >= 7 ) //全是同星
    {
        strTemp += "（顺时决）";
    }
    else if( jstxCount < 1 ) //全是异星
    {
        strTemp += "（与决时星图全异）";
    }
    strRet += strTemp + "<br>";
    strRet += "<br>";
    
    //同异复星判断
    strRet += "<b>五、同异复星列表</b>（复星为事物发展的重大关口）<br>";
    var fxCount = 0; //决时同星计数
    for(var i=0; i<7; i++)
    {
        if( qxjObj.arrTongYiFuXing[i] >= 3 ) //加和是复星
        {
            strTemp = "第" + String(i+1) + "个："
                    + GetFuchsiaText( GetBoldText(ArrayQiXingNames[qxjObj.arrJue[i]])) ;
            strRet += strTemp + "<br>";
            fxCount++;
        }
    }
    //计数
    strTemp = "同异复星计数：" + String(fxCount) + "<br>";    
    strRet += strTemp + "<br>";

    //返回
    return strRet;
}

/////////////////////////////////////////////////////////////////
//有更高精度计时器，但是手机浏览器不一定支持、苹果系统也不支持：https://developer.mozilla.org/en-US/docs/Web/API/Performance/now
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

//地支速查五行
//五行排序 木0 火1 土2 金3 水4
var DiZhiChaWuXing = [
    4,//子水
    2,//丑土
    0,//寅木
    0,//卯木
    2,//辰土
    1,//巳火
    1,//午火
    2,//未土
    3,//申金
    3,//酉金
    2,//戌土
    4 //亥水
];

//7个卡牌名
var ArrayQiXingNames = [
    "天枢", "天璇", "天玑", "天权", "玉衡", "开阳", "摇光"
];
//五行排序 木0 火1 土2 金3 水4
var ArrayQiXingWuXing = [
    -1, -1, 4, 0, 1, 2, 3
];//有，归，水，木，火，土，金
var ArrayQXWXPrefixStrs = [
    "有", "归", "：","：","：","：","："
];

//七星描述
var ArrayQiXingMiaoShu = [
"星象：空无。天枢为天道，为没有，为道，为心境，为白忙，万物之道从无中来，到无中去。", //天枢
"星象：开始。天璇为开始、起步、道之始、良好的开头或准备，是万物的开始与起源。", //天璇
"星象：形成。天玑为万物的形成、发展、孕育、生机、展开局面，是万物的发展苗头。", //天玑
"星象：精进。天权为万物的精进、成熟稳定的表相、繁荣昌盛，事业功名的成功。",   //天权
"星象：精华。玉衡为事物发展的精华、极限极致、顶峰、上层、火气、暴脾气。",//玉衡
"星象：极弱。开阳为事物发展的极弱境地、退步、次盛、换位、降职、回落、衰败。",  //开阳
"星象：变化。摇光是弱极生变，为变化、转换、心智，遇到锐气、竞争、争锋。"   //摇光
];

//七星开始的描述
var ArrayQiXingStart = [
    "天枢开始：天枢在开头代表一种自然规律，代表你啥准备都没做。",
    "天璇开始：天璇在开头是种吉相，良好的准备。",
    "天玑开始：强时代表生机，弱时代表一种希望，大多数论吉利。",
    "天权开始：强时一般代表很好的开始，弱时代表事物开始实行，局面开始展开。",
    "玉衡开始：强的话是好的开始，弱的话是急火攻心。代表这是个紧急的事情。",
    "开阳开始：代表极弱的开始，起步艰难。",
    "摇光开始：主变化，弱的话指决主求变心不重，强的话，决主想要进行大变化。"
];

//七星结束的描述
var ArrayQiXingEnd = [
    "天枢结束：天枢在结尾，亲，你可以放弃这想法了。如果是占病，新病去病，久病为凶。占出家或修道大吉。",
    "天璇结束：天璇在结尾，代表你可以立即行动了。",
    "天玑结束：强代表一种好事，弱时代表有点希望，并不一定可行。如果天玑强则可行，弱则不建议。",
    "天权结束：强时代表事情会成功，弱则代表这事可得小名小利。",
    "玉衡结束：强则代表这是个吉事，收益颇丰。弱时代表事情可行，但是上火生气。",
    "开阳结束：如果弱不建议行动。如果是强旺，虽然结果自己不满意，但是事情一般是可以做的。",
    "摇光结束：决主问的事情以变化莫测结束，一般不建议去做。"
];

//标准的太一星图
//"天枢", "天璇", "天玑", "天权", "玉衡", "开阳", "摇光"
var TaiYiXingTu = [
    0, 1, 2, 3, 4, 5, 6
];

//五行天时的决时星图
//"天枢"0, "天璇"1, "天玑"2, "天权"3, "玉衡"4, "开阳"5, "摇光"6
var JueShiXingTuArray = [
    //木
    [4, 3, 1, 0, 6, 2, 5 ],
    //火
    [5, 4, 1, 0, 2, 3, 6 ],
    //土
    [6, 5, 1, 0, 3, 4, 2 ],
    //金
    [2, 6, 1, 0, 4, 5, 3 ],
    //水
    [3, 2, 1, 0, 5, 6, 4 ]
];

//强，旺，归，有，存，弱，死
var ArrayQiangRuo = [
    "★★★★★★★",
    "★★★★★★",
    "★★★★★",
    "★★★★",
    "★★★",
    "★★",
    "★"
];

var QXWXColors = [
"#00AA00",// 木绿
"#FE0000",// 火红
"#A0522D",// 土棕#BB7B5B
"yellow",// 金黄  #FDFD00
"#00F6FF"//  水蓝
];
//七星的五行色
function PackQXWXText(text, nWX)
{
    var idWX = nWX;
    var clr = "black";  //如果查不到五行序号就用黑色
    if( (idWX >= 0) && (idWX <= 4 ))
    {
        clr = QXWXColors[idWX];
    };
    //
    var strResult =  "<span style=\"color: " + clr + "\">";
    strResult += text;
    strResult += "</span>";
    return strResult;
}
//总纲类的描述
//七星决的类型
var QXJLeiXing = [
  "<b>普通决</b>",//0
  "<span style='color: green; font-weight: bold; font-size:150%;'>顺天决</span>",//1
  "<span style='color: red; font-weight: bold; font-size:150%;'>逆天决</span>",//2
  "<span style='color: green; font-weight: bold; font-size:150%;'>顺时决</span>",//3
  "<span style='color: red; font-weight: bold; font-size:150%;'>逆时决</span>" //4
];

//七星决的类型描述
var QXJLeiXingMiaoShu = [
  "　",//0
  "<span style='color: green; font-weight: bold;'>：顺应天道而行，吉利可行。</span>",//1
  "<span style='color: red; font-weight: bold;'>：行事不合天道，直接否决。</span>",//2
  "<span style='color: green; font-weight: bold;'>：顺应时机而行，吉利可行。</span>",//3
  "<span style='color: red; font-weight: bold;'>：行事不合时机，直接否决。</span>" //4
];

//太一异星、决时同星，同异复星
var QXTongYiStrs = [
    "　", //0是没有
    "<span style='color: red; font-weight: bold;'>太一异星</span>", //1 事情关键要素
    "<span style='color: green; font-weight: bold;'>决时同星</span>", //2 事情关键时间点
    "<span style='color: fuchsia; font-weight: bold;'>同异复星</span>"  //3 事情重大关口
];

//太一星图，七个全异，求和得1*7 == 7，全异否决，无异大吉
//决时星图，七个全同，求和的2*7 == 14，全同大吉，无同否决
function CalcArraySum(arr)
{
    var sum = 0;
    var len = arr.length;
    if(len < 1)
    {
        return 0;
    }
    for(var i=0; i<len; i++) //每个元素求和
    {
        sum += Number( arr[i] );        
    }
    return sum;
}

//根据儒略日生成公历时间字符串
function GetGGTimeStr(curJD)
{
    var myDD = JD.DD(curJD);
    var strTemp = "公历时间：" + String(myDD.Y) + "年" 
        + String(myDD.M) + "月"
        + String(myDD.D) + "日"
        + String(myDD.h) + "时"
        + String(myDD.m) + "分"
        + "， " + WeekDays[ GetiDayOfWeek(curJD) ] ;
    //返回
    return strTemp;
}
//根据儒略日生成农历时间字符串
function GetNNTimeStr(curJD)
{
    var myDD = JD.DD(curJD);//公历的
    //农历，0点是今天的子时，23点后是明天的子时，要区分
    var theOB;
    if(myDD.h >= 23)//农历时间
    {
        theOB = GetJDtoNongLiOB(curJD + 1);
    }
    else
    {
        theOB = GetJDtoNongLiOB(curJD);
    }
    var strTemp = "农历时间：" + theOB.Lyear3 + "年 "
              + theOB.Lleap + theOB.Lmc + "月 "
              + theOB.Ldc + "日 "
              + DiZhi[ (Math.floor((myDD.h+1)/2 )) % 12 ] + "时"
              + " （黄帝" + String( theOB.Lyear0 + 1984 + 2698 + 56 ) + "年）";//黄帝纪年比网上多56年
    //返回
    return strTemp;
}

function GetNSpace(n)
{
    var count = Number(n);
    if(count < 1)
    {
        return "";
    }
    //构造
    var strRet = "";
    for(var i=0; i<count; i++)
    {
        strRet += SpaceEN2;
    }
    return strRet;
}
