//程序理论适用时间段 1583 年 到 3199 年，即格里高利历后一年到3200前一年，3200年是否为闰年待定。
//全局变量，把起始时间和结束时间改一下就可以更换排盘的年份范围，这里为最近的240年时间段。
var gStartYear = 1924;
var gEndYear = 2164;
//年月日时的四个选择器
var sYear = document.getElementById("sYear");
var sMonth = document.getElementById("sMonth");
var sDay = document.getElementById("sDay");
var sHour = document.getElementById("sHour");

//保存排盘时间的甲子计数，初始：甲子 甲子 甲子 甲子
var idYearJZ =  0;
var idMonthJZ =  0;
var idDayJZ =  0;
var idHourJZ =  0;

/**************************************************/
//公历控件的初始化和动态更新
function InitYears()    //初始化时一次性调用
{
    //清空旧的一个选项
    sYear.remove(0);    
    var curOp;
    for(var i=gStartYear; i<=gEndYear; i++)
    {
        curOp = document.createElement('option');
        curOp.value = i;
        curOp.text = String(i);
        sYear.add(curOp, null);
    }
    //默认选择2000年
    sYear.selectedIndex = 2000 - gStartYear;
}
//初始是2000年1月份
function InitDays() //初始化时一次性调用
{
    //清空旧的一个选项
    sDay.remove(0);
    //添加，2000年1月
    var nCount = 31;
    var curOp;
    for(var i=1; i<=nCount; i++)
    {
        curOp = document.createElement('option');
        curOp.value = i;
        curOp.text = String(i);
        sDay.add(curOp, null);
    }
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
//判断公历闰年
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
function OnGLYearChanged()
{
    //年份变化只影响2月
    var curYear = sYear.value;
    var curMonth = sMonth.value;
    if(curMonth != 2)
    {
        return; //不是2月
    }
    //是2月
    var oldDaysCount = sDay.length;
    var newDaysCount = GetGLDaysCountByYearAndMonth(curYear, curMonth);
    if( oldDaysCount == newDaysCount )
    {
        //旧的天数和新的天数没变，不需要改动
        return;
    }
    //天数有变化
    if( oldDaysCount > newDaysCount )//旧的是29天，新的是28天
    {
        sDay.remove(29 - 1);    //移除末尾的29号
    }
    else//旧的28天，新的29天
    {
        var curOp = document.createElement('option');
        curOp.value = 29;
        curOp.text = "29";
        sDay.add(curOp, null);
    }
}
//根据月份变化，考虑是否更新日期
function OnGLMonthChanged()
{
    var curYear = sYear.value;
    var curMonth = sMonth.value;
    //根据年月设置天数
    //旧的天数，全部移除掉
    var oldCount = sDay.length;
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
            sDay.remove( i-1 );
        }
    }
    else
    {
        //少了补齐
        for(var i=oldCount+1; i<=newCount; i++)
        {
            var curOp = document.createElement('option');
            curOp.value = i;
            curOp.text = i;
            sDay.add(curOp, null);
        }
    }
}
//根据当前时间设置控件的显示
function FillCurTime()
{
    var curTime = new Date();
    var year = curTime.getFullYear();
    var month = curTime.getMonth(); //JS月份是0到11
    var day = curTime.getDate();    //getDate是日子，getDay是星期几
    var hour = curTime.getHours();
    //设置控件
    sYear.selectedIndex = year - gStartYear;
    //年份变化
    OnGLYearChanged();    
    sMonth.selectedIndex = month;
    //月份变化
    OnGLMonthChanged();
    //设置日子和小时
    sDay.selectedIndex = day - 1;
    sHour.selectedIndex = hour;
}

///////////////////////////////////////////////////////
////把文字颜色标成黑色
function GetBlackText(text)
{
    var resultText = "<span style=\"color: black\">";
    resultText += text;
    resultText += "</span>";
    return resultText;
}
//把文字颜色标成红色
function GetRedText(text)
{
    var resultText = "<span style=\"color: red\">";
    resultText += text;
    resultText += "</span>";
    return resultText;
}
//把文字颜色标成绿色
function GetGreenText(text)
{
    var resultText = "<span style=\"color: green\">";
    resultText += text;
    resultText += "</span>";
    return resultText;
}
//把文字颜色标成蓝色
function GetBlueText(text)
{
    var resultText = "<span style=\"color: blue\">";
    resultText += text;
    resultText += "</span>";
    return resultText;
}
//把文字颜色标成天蓝色
function GetSkyBlueText(text)
{
    var resultText = "<span style=\"color: deepskyblue\">";
    resultText += text;
    resultText += "</span>";
    return resultText;
}
//fuchsia紫红色
function GetFuchsiaText(text)
{
    var resultText = "<span style=\"color: fuchsia\">";
    resultText += text;
    resultText += "</span>";
    return resultText;
}
//紫色
function GetDarkOrchidText(text)
{
    var resultText = "<span style=\"color: darkorchid\">";
    resultText += text;
    resultText += "</span>";
    return resultText;
}
//粗体
function GetBoldText(text)
{
    var resultText = "<b>";
    resultText += text;
    resultText += "</b>";
    return resultText;  
}

///////////////////////////////////////////////
/**********************
命理八字计算
**********************/
function ML_calcBaZi()
{
    //获取年月日时
    var yy = Number(sYear.value);
    var mm = Number(sMonth.value);
    var dd = Number(sDay.value);
    var hh = Number(sHour.value);
    if(hh % 2 == 1)//奇数小时，加0.9
    {
        hh += 0.9;
    }
    //console.log(yy+ "  "+ mm +"  "+ dd + " "+ hh);
    var ob=new Object();
    
    var jd=JD.JD(year2Ayear(yy),mm-0, dd-0 + hh/24.0);
    //减去东八区的加时，经度按120度
    obb.mingLiBaZi( jd+ (-8.0)/24 - J2000, 120.0/radd, ob ); //八字计算
   /*
    var strBaZi =
        '<font color=red>  <b>[日标]：</b></font>'+'公历 '+Cml_y.value+'-'+Cml_m.value+'-'+Cml_d.value + ' 儒略日数 ' + int2(jd+0.5) + ' 距2000年首' + int2(jd+0.5-J2000) + '日<br>'
      + '<font color=red  ><b>[八字]：</b></font>'    + ob.bz_jn+'年 '+ob.bz_jy+'月 '+ob.bz_jr+'日 '+ob.bz_js+'时 真太阳 <font color=red>' + ob.bz_zty+ '</font><br>'
      + '<font color=green><b>[纪时]：</b></font><i>' + ob.bz_JS + '</i><br>'
      + '<font color=green><b>[时标]：</b></font><i>' + '23　 01　 03　 05　 07　 09　 11　 13　 15　 17　 19　 21　 23';
    */
    idYearJZ = JiaZi.indexOf( ob.bz_jn );   //纪年
    idMonthJZ = JiaZi.indexOf( ob.bz_jy );  //纪月
    idDayJZ = JiaZi.indexOf( ob.bz_jr );    //纪日
    idHourJZ = JiaZi.indexOf( ob.bz_js );   //纪时
    //console.log(ob.bz_jn+ "  "+ ob.bz_jy +"  "+ ob.bz_jr + " "+ ob.bz_js);
    return;
}

/**************************************************/
//空格
var SpaceZH = "&nbsp;"; //汉字空格
var SpaceZHN = "　";    //空字符空格
var SpaceEN1 = "&ensp;";//单英空格
var SpaceEN2 = "&emsp;";//双英空格
//整个排盘文本
var AllText = document.getElementById("AllText");
var YinYangLabel = new Array("▅▅&emsp;▅▅", "▅▅▅▅▅");
var YinYangSelf = new Array("阴", "阳");

//计算龟藏排盘
function CalcGuiCangPanPai()
{    
    //先计算一遍排盘时间的八字
    ML_calcBaZi();  //idYearJZ, idMonthJZ, idDayJZ, idHourJZ
    //计算年月日时的干支
    var yyGan = TianGan[idYearJZ % 10];
    var yyZhi = DiZhi[idYearJZ % 12];
    var mmGan = TianGan[idMonthJZ % 10];
    var mmZhi = DiZhi[idMonthJZ % 12];
    var ddGan = TianGan[idDayJZ % 10];
    var ddZhi = DiZhi[idDayJZ % 12];
    var hhGan = TianGan[idHourJZ % 10];
    var hhZhi = DiZhi[idHourJZ % 12];
    //起星地支序号
    var iStartStar = idDayJZ % 12;  //日支序号
    
    var strResult = "<div align='left' style='line-height: 18pt; font-family: 宋体;'>"; 
    var strTemp = "";
    //爻的部分不换行
    strResult += "<span style='white-space: nowrap;'>";
    //起卦时间显示
    strTemp = "起卦时间：" + sYear.value + " 年 " + 
            sMonth.value + " 月 " + 
            sDay.value + " 日 " + 
            sHour.value + " 时" ;
    strResult += strTemp;
    strResult += "<br>";
    //干支计时
    strTemp = "干支计时：" 
            + yyGan + GetBoldText( GetFuchsiaText(yyZhi) ) + "年 "
            + mmGan + GetBoldText( GetFuchsiaText(mmZhi) ) + "月 "
            + ddGan + GetBoldText( GetFuchsiaText(ddZhi) ) + "日 "
            + hhGan + hhZhi + "时";
    strResult += strTemp;
    strResult += "<br>";
    //起卦占事
    var strZhanShi = document.getElementById("tZhanShi").value;
    strTemp = "起卦占事：" + strZhanShi;
    strResult += strTemp;
    strResult += "<br>";
    //卦主性别、生肖和职业
    var strGender = document.getElementById("sGender").value;
    var strShengXiao = document.getElementById("sShengXiao").value;
    var strJob = document.getElementById("sJob").value;
    strTemp = "卦主性别：" + strGender + SpaceEN2         
        + "生肖：" + strShengXiao + SpaceEN2
        + "职业：" + strJob;
    strResult += strTemp;
    strResult += "<br>";
    //天时五行
    var nZhanShiNian = parseInt(strZhanShi);      //用于判断是否在占年卦
    var strTempWX = "";
    if( (nZhanShiNian >=  gStartYear) && (nZhanShiNian <= gEndYear) )
    {
        strTempWX = DiZhiWuXing[(nZhanShiNian-gStartYear)%12];
        var strTempDZ = DiZhi[(nZhanShiNian-gStartYear)%12];
        strTemp = "天时五行：" + PackWuXingColorText(strTempDZ+strTempWX, strTempWX)
                + "（流年卦）";
    }
    else
    {
         strTempWX = GetTianShiByDiZhi(yyZhi, mmZhi, ddZhi);
         strTemp = "天时五行：" + PackWuXingColorText(strTempWX, strTempWX)
                + "（请解卦人验证是否计算正确）";
    }
    strResult += strTemp;
    strResult += "<br>";
    strResult += "<br>";    //多换一行，下面排卦
    
    
    //取出13个爻，并定十二星
    var guiYao = new Array(13);
    var idXing = new Array(13); //0号天星轮空不用
    for(var i=0; i<13; i++)
    {
        var tempID = "gui" + String(i+1);
        guiYao[i] = Number( document.getElementById( tempID ).value );
        idXing[i] = (iStartStar + (i + 11) ) % 12;
        //console.log(guiyao[i]);
        //console.log( DiZhi[ idXing[i] ] );
    }
    //序号0，决定卦的阴阳
    var strGuaYinYang = "";
    if( 1 == guiYao[0] )
    {
        strGuaYinYang = GetRedText(SpaceEN2 + "阳●" + SpaceEN2);        
    }
    else
    {
        strGuaYinYang = GetBlackText(SpaceEN2 + "阴○" + SpaceEN2);
    }
    /////////////////////////////////////////
    //龟藏卦名和五行    
    var iQianGua =  GetGuaIndex(guiYao[6], guiYao[5], guiYao[4],
                                guiYao[3], guiYao[2], guiYao[1] );
    var iHouGua =   GetGuaIndex(guiYao[7], guiYao[8], guiYao[9],
                                guiYao[10], guiYao[11], guiYao[12]);
    //获取卦名和五行
    strTemp = GetGuaMingAndWuXing(iQianGua, iHouGua);
    strResult += strTemp;
    strResult += "<br>";

    /////////////////////////////////////////
    //上面第一排爻，普通
    strTemp = PackYaoLine(guiYao[6], idXing[6], guiYao[7], idXing[7]);
    strResult += strTemp;
    strResult += "<br>";
    /////////////////////////////////////////
    //第二排，普通
    strTemp = PackYaoLine(guiYao[5], idXing[5], guiYao[8], idXing[8]);
    strResult += strTemp;
    strResult += "<br>";
    /////////////////////////////////////////
    //第三排，元神
    strTemp = PackYaoLineYuan(guiYao[4], idXing[4], guiYao[9], idXing[9], strGuaYinYang) ;
    strResult += strTemp;
    strResult += "<br>";
    /////////////////////////////////////////
    //第四排，我身
    strTemp = PackYaoLineWo(guiYao[3], idXing[3], guiYao[10], idXing[10]) ;
    strResult += strTemp;
    strResult += "<br>";
    /////////////////////////////////////////
    //第五排，普通
    strTemp = PackYaoLine(guiYao[2], idXing[2], guiYao[11], idXing[11]) ;
    strResult += strTemp;
    strResult += "<br>";
     /////////////////////////////////////////
    //第六排，普通
    strTemp = PackYaoLine(guiYao[1], idXing[1], guiYao[12], idXing[12]) ;
    strResult += strTemp;
    strResult += "<br>";    
    strResult += "</span>"; //不换行标记的末尾
    //开始加卦辞
    strResult += "<br>";
    strTemp = GetGuiCangGuaYi(iQianGua, iHouGua);
    strResult += strTemp;
    strResult += "<br>";
    strResult += "<br>";

    //十二天星主事
    strTemp = GetTianXingZhuShi();
    strResult += strTemp;
    strResult += "<br>";
    
    //相关术语
    strTemp = Get12XingChuDong(guiYao, idXing);
    strResult += strTemp;
    strResult += "<br></div>"; //排盘结束
    //替换中文空格，适应部分手机浏览器字体
    strResult = strResult.replace(/&emsp;/g, "　");
    //
    //设置到界面上
    AllText.innerHTML = strResult;
    //执行自动复制到剪贴板，IE9和Chrome支持，火狐测试不行。
    document.execCommand("selectAll");  //全选
    document.execCommand("copy");       //复制
    document.execCommand("unselect");   //不选中
}
//普通爻，参数：前爻，前爻星序，后爻，后爻星序
function PackYaoLine(curQYao, curQIX, curHYao, curHIX)
{
    //var strMidSpace = SpaceZH+SpaceZH+SpaceZH+SpaceZH+SpaceZH;
    var strMidSpace = SpaceEN2+SpaceEN2+SpaceEN2+SpaceEN2;
    var strRet = ""; 
    var strPart1 = "";  //前爻字
    var strPart2 = "";  //前爻图
    var strPart3 = "";  //后爻图
    var strPart4 = "";  //后爻字
    //五行色自动加粗
    strPart1 = YinYangSelf[ curQYao ] + DiZhiWuXing[ curQIX ] + SpaceEN2
        + TianXing[ curQIX ] + SpaceEN2;
    strPart1 = PackWuXingColorText(strPart1, DiZhiWuXing[ curQIX ]);
    strPart2 = GetBlackText(YinYangLabel[ curQYao ]) ;
    //
    strPart3 = YinYangLabel[ curHYao ] + SpaceEN2;   
    if( curQYao != curHYao )
    {
        strPart3 = GetRedText(strPart3);
    }
    else
    {
        strPart3 = GetBlackText(strPart3);
    }
    strPart4 =  TianXing[ curHIX ] + SpaceEN2
        + YinYangSelf[ curHYao ] + DiZhiWuXing[ curHIX ];
    strPart4 = PackWuXingColorText(strPart4, DiZhiWuXing[ curHIX ]);
    //
    strRet = strPart1 + strPart2 + strMidSpace + strPart3 + strPart4;
    return strRet;
}
//元神爻，带卦的阴阳
function PackYaoLineYuan(curQYao, curQIX, curHYao, curHIX, strGuaYinYang)
{
    //var strMidSpace = SpaceZH+SpaceZH+SpaceZH+SpaceZH+SpaceZH;
    var strMidSpace = SpaceEN2+SpaceEN2+SpaceEN2+SpaceEN2;
    var strRet = ""; 
    var strPart1 = "";  //前爻字
    var strPart2 = "";  //前爻图
    var strPart3 = "";  //后爻图
    var strPart4 = "";  //后爻字
    //五行色自动加粗
    strPart1 = YinYangSelf[ curQYao ] + DiZhiWuXing[ curQIX ] + SpaceEN2
        + TianXing[ curQIX ] + SpaceEN2;
    strPart1 = PackWuXingColorText(strPart1, DiZhiWuXing[ curQIX ]);
    strPart2 = YinYangLabel[ curQYao ] ;
    strPart2 = GetBlueText(strPart2);
    //元神一行
    strPart3 = YinYangLabel[ curHYao ] + SpaceEN2;     
    if( curQYao != curHYao )
    {
        strPart3 = GetFuchsiaText(strPart3);
    }
    else
    {
        strPart3 = GetBlueText(strPart3);
    }
    strPart4 =  TianXing[ curHIX ] + SpaceEN2
        + YinYangSelf[ curHYao ] + DiZhiWuXing[ curHIX ];
    strPart4 = PackWuXingColorText(strPart4, DiZhiWuXing[ curHIX ]);
    //
    strRet = strPart1 + strPart2 + strGuaYinYang + strPart3 + strPart4;
    return strRet;
}

//我身爻
function PackYaoLineWo(curQYao, curQIX, curHYao, curHIX)
{
    //var strMidSpace = SpaceZH+SpaceZH+SpaceZH+SpaceZH+SpaceZH;
    var strMidSpace = SpaceEN2+SpaceEN2+SpaceEN2+SpaceEN2;
    var strRet = ""; 
    var strPart1 = "";  //前爻字
    var strPart2 = "";  //前爻图
    var strPart3 = "";  //后爻图
    var strPart4 = "";  //后爻字
    //五行色自动加粗
    strPart1 = YinYangSelf[ curQYao ] + DiZhiWuXing[ curQIX ] + SpaceEN2
        + TianXing[ curQIX ] + SpaceEN2;
    strPart1 = PackWuXingColorText(strPart1, DiZhiWuXing[ curQIX ]);
    strPart2 = YinYangLabel[ curQYao ] ;
    strPart2 = GetBlueText(strPart2);
    //元神一行
    strPart3 = YinYangLabel[ curHYao ] + SpaceEN2;     
    if( curQYao != curHYao )
    {
        strPart3 = GetFuchsiaText(strPart3);
    }
    else
    {
        strPart3 = GetBlueText(strPart3);
    }
    strPart4 =  TianXing[ curHIX ] + SpaceEN2
        + YinYangSelf[ curHYao ] + DiZhiWuXing[ curHIX ];
    strPart4 = PackWuXingColorText(strPart4, DiZhiWuXing[ curHIX ]);
    //
    strRet = strPart1 + strPart2 + strMidSpace + strPart3 + strPart4;
    return strRet;
}

function GetGuaMingAndWuXing(iQianGua, iHouGua)
{
    var strMidSpace = SpaceEN2+SpaceEN2+SpaceEN2+SpaceEN2;
    //
    var strQianGua = Gui64GuaMing[iQianGua];
    var strQianGuaWX = Gui64WuXing[iQianGua];
    var strHouGua = Gui64GuaMing[iHouGua];
    var strHouGuaWX = Gui64WuXing[iHouGua];
    //卦名
    var strMing = GetBlackText(strMidSpace + SpaceEN2 + SpaceEN2)
        + GetBlackText(SpaceEN2 + strQianGua)
        + GetBlackText(strMidSpace)
        + GetBlackText(SpaceEN2 + strHouGua);
    strMing = "<span style=\"margin-left: -8px;\">" + GetBoldText(strMing)
        + "</span>" ;
    //五行
    var strWX= GetBlackText(strMidSpace)
        + GetBlackText(strMidSpace)
        + PackWuXingColorText(strQianGuaWX, strQianGuaWX)
        + GetBlackText(strMidSpace)
        + GetBlackText(strMidSpace)
        + PackWuXingColorText(strHouGuaWX, strHouGuaWX);
    //返回
    return strMing + "<br>" + strWX;
}

function GetGuiCangGuaYi(iQianGua, iHouGua)
{
    var strRet = GetBoldText("龟藏卦义：<br>");
    strRet += Gui64MiaoShu[iQianGua];
    strRet += "<br>";
    strRet += Gui64MiaoShu[iHouGua];
    //返回
    return strRet;
}
//天星主事
function GetTianXingZhuShi()
{
    var strRet = GetBoldText("十二天星主事：<br>");
    for(var i=0; i<6; i++)
    {
        for(var j=0; j<2; j++)
        {
            var curIndex = i*2 + j;
            strRet += DiZhi[curIndex] + "-" + TianXingMiaoShu[curIndex]
                + SpaceEN2 + SpaceEN2;
        }
        strRet += "<br>" ;
    }    
    return strRet;
}
//查询星占名词
//查询十二星出动、贵人出游、青龙吸水
function Get12XingChuDong(guiYao, idXing)
{
    //guiYao是阴0，阳1的数组，13个
    //idXing是天星序号13个，第0个不用
    //构造字符串
    var strTemp = "";
    var strRet = GetBoldText("相关动化：<br>");
    //计算十二天星的动化计数
    var dongHua = new Array(12);
    for(var j=0; j<12; j++)
    {
        dongHua[j] = 0; //初始化都为零
    }
    
    //根据前卦判断出动情况
    for(var i=1; i<=6; i++)
    { 
        //前爻和前星地支序号、前爻五行
        var qianYao = guiYao[i];
        var iQianXing = idXing[i];
        var qianWX = DiZhiWuXing[ iQianXing ];
        //后爻和后星地支序号后爻五行
        var houYao = guiYao[13-i];
        var iHouXing =  idXing[13-i];
        var houWX = DiZhiWuXing[ iHouXing ];
        //是否动
        if( qianYao != houYao )
        {
            //动爻
            //根据前星序号出动
            strTemp = TianXingChuDong[iQianXing] + "<br>";
            strRet += strTemp;
            //计算十二天星的动化计数
            //动化只计算从前卦计算
            dongHua[iQianXing] = 1;
            //判断贵人出游和青龙吸水
            //贵人是2，后五行为水
            if( (2 == iQianXing) && ("水" == houWX) )
            {
                strTemp = "贵人出游：贵人动化水，贵人提携，事业大吉。<br>";
                strRet += strTemp;
            };
            //青龙是3，后五行为水
            if( (3 == iQianXing) && ("水" == houWX) )
            {
                strTemp = "青龙吸水：青龙动化水，功名显著，事业大吉。<br>";
                strRet += strTemp;
            };
            //青龙与白虎都动
            if( 3 == iQianXing )//青龙在前爻，青龙爻序号是 i
            {
                //青龙在前爻，动了，找到白虎和白虎前爻
                var baiHuYao = guiYao[i+6];
                var baiHuQian = guiYao[ 13 - (i+6) ];
                if( baiHuYao != baiHuQian)//白虎一行也动了
                {
                    strTemp = "龙争虎斗：青龙在前卦，白虎在后卦，二者所在行都动。内心不安之相。<br>";
                    strRet += strTemp;
                }
            }
        }//end outer if
    }
    //上面循环同时计算了12星的动化计数
    //console.log(dongHua);
    strRet += GetLongFeiFengWu(dongHua);
    strRet += GetYanZiDunTian(dongHua);
    //龙争虎斗单独判定。
    strRet += GetLiuShouChuDong(dongHua);
    strRet += GetHouGongJiaRen(dongHua);
    strRet += GetBeiJiXingCan(dongHua);
    strRet += GetJiaoLongManDi(dongHua);
    strRet += GetShuiZhuXingHai(dongHua);
    strRet += GetLongXingTianXia(dongHua);
    strRet += GetHuLuoPingYang(dongHua);
    strRet += GetXiaoRenDangDao(dongHua);
    strRet += GetGuYanZhuYun(dongHua);    
    return strRet;
}
//下面是多星同时动的判断
//龙飞凤舞
function GetLongFeiFengWu(dongHua)
{
    var str = "龙飞凤舞：青龙朱雀同化，功名事业吉利。<br>";
    //青龙是3，朱雀是6
    if( (1==dongHua[3]) && (1==dongHua[6]) )
    {
        return str;
    }
    else
    {
        return "";
    }
}
//燕子遁天
function GetYanZiDunTian(dongHua)
{
    var str = "燕子遁天：朱雀天空同化，失物难回之相。<br>";
    //朱雀是6，天空 11
    if( (1==dongHua[6]) && (1==dongHua[11]) )
    {
        return str;
    }
    else
    {
        return "";
    }
}
//龙争虎斗特殊判定，放在前面处理

//六兽出洞
function GetLiuShouChuDong(dongHua)
{
    var str = "六兽出洞：六星皆化，求事难成之相。<br>";
    var sum = 0;
    for(var i=0; i<12; i++)
    {
        sum += dongHua[i];
    }
    //6个
    if( sum >= 6 )
    {
        return str;
    }
    else
    {
        return "";
    }
}
//后宫佳人
function GetHouGongJiaRen(dongHua)
{
    var str = "后宫佳人：天后与天空同化，美女之相。<br>";
    //天后 4 天空 11
    if( (1==dongHua[4]) && (1==dongHua[11]) )
    {
        return str;
    }
    else
    {
        return "";
    }
}
//北极星灿
function GetBeiJiXingCan(dongHua)
{
    var str = "北极星灿：六合、勾陈、太阴，三土星至少两个同化，能力卓著之相。<br>";
    //六合 1 勾陈 10  太阴 7
    var sum =  dongHua[1] + dongHua[10] + dongHua[7];
    if( sum >= 2 )
    {
        return str;
    }
    else
    {
        return "";
    }
}
//蛟龙满地
function GetJiaoLongManDi(dongHua)
{
    var str = "蛟龙满地：青龙与腾蛇同化，难解难分之相。<br>";
    //青龙 3  腾蛇 5
    if( (1==dongHua[3]) && (1==dongHua[5]) )
    {
        return str;
    }
    else
    {
        return "";
    }
}
//水注星海
function GetShuiZhuXingHai(dongHua)
{
    var str = "水注星海：玄武、天后、天空，三水星同化，迷离之相。<br>";
    //玄武 0  天后 4  天空 11
    if( (1==dongHua[0]) && (1==dongHua[4]) && (1==dongHua[11]) )
    {
        return str;
    }
    else
    {
        return "";
    }
}
//龙行天下
function GetLongXingTianXia(dongHua)
{
    var str = "龙行天下：青龙与天空同化，功名吉相。<br>";
    //青龙 3  天空 11
    if( (1==dongHua[3]) && (1==dongHua[11]) )
    {
        return str;
    }
    else
    {
        return "";
    }
}
//虎落平阳
function GetHuLuoPingYang(dongHua)
{
    var str = "虎落平阳：白虎与土星（六合、勾陈、太阴）之一同化，受欺不得志。<br>";
    //六合 1 勾陈 10  太阴 7
    //白虎 9
    var sum =  dongHua[1] + dongHua[10] + dongHua[7];
    if( (sum >= 1) && (1==dongHua[9]) )
    {
        return str;
    }
    else
    {
        return "";
    }
}
//小人当道
function GetXiaoRenDangDao(dongHua)
{
    var str = "小人当道：太阴与玄武同化，就是小人当道的意思。<br>";
    //玄武 0  太阴 7
    if( (1==dongHua[0]) && (1==dongHua[7]) )
    {
        return str;
    }
    else
    {
        return "";
    }
}
//孤烟逐云
function GetGuYanZhuYun(dongHua)
{
    var str = "孤烟逐云：朱雀与腾蛇同化，失败的争吵，事情不顺利。<br>";
    //朱雀 6  腾蛇 5
    if( (1==dongHua[6]) && (1==dongHua[5]) )
    {
        return str;
    }
    else
    {
        return "";
    }
}
