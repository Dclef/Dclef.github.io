//程序理论适用时间段 1583 年 到 3199 年，即格里高利历后一年到3200前一年，3200年是否为闰年待定。
//全局变量，把起始时间和结束时间改一下就可以更换排盘的年份范围，这里为最近的240年时间段。
var gStartYear = 1924;
var gEndYear = 2164;
//公历年月日时的四个选择器，加上分钟
var sYear = document.getElementById("sYear");
var sMonth = document.getElementById("sMonth");
var sDay = document.getElementById("sDay");
var sHour = document.getElementById("sHour");
var sMinute = document.getElementById("sMinute");
//全局变量，保存出生地的经度、纬度
var gBirthJingDu = 120.0;  
var gBirthWeiDu = 38.0;
//绘图控件
var syCanvas = document.getElementById("syCanvas");

/**************************************************/
//公历控件的初始化和动态更新
function InitGLYears()    //初始化时一次性调用
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
function InitGLDays() //初始化时一次性调用
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
///////////////////////////////////////////////
/****************
地理经纬度选择的页面控制函数
****************/
//市县选择变化
var sShengFen = document.getElementById("sShengFen"); //省份选择框
var sShiXian = document.getElementById("sShiXian"); //市县
//市县变化，记录经纬度
function OnShiXianChange()
{
    var v = new JWdecode( sShiXian.options[sShiXian.selectedIndex].value );
    sShiXian.vJ = v.J; sShiXian.vW = v.W;   //弧度
    gBirthJingDu = (v.J/Math.PI*180).toFixed(6);    //经度
    gBirthWeiDu = (v.W/Math.PI*180).toFixed(6);     //纬度
    //打印经度变化
    //console.log("经度: " + gBirthJingDu );
}
//省份变化
function OnShengFenChange()
{
    sShiXian.length=0; //清空市县选项
    var i, ob=JWv[ sShengFen.options[sShengFen.selectedIndex].value-0 ];
    for(i=1; i<ob.length; i++)
        addOp( sShiXian, ob[i].substr(0,4), ob[i].substr(4,ob[i].length-4) );
    OnShiXianChange();
}
//初始化省市选择框
function InitShengShi()
{
    sShengFen.length = 0;   //清空省份选项
    var i;
    for(i=0;i<JWv.length;i++) addOp(sShengFen,i,JWv[i][0]);

    sShengFen.selectedIndex = 0; 
    OnShengFenChange(); //省份
    sShiXian.selectedIndex = 0;
    OnShiXianChange();  //市县
}
/*
 * 
tool.js
//给select加option等
function addOp(sel,v,t)
{ 
    //给select对象加入option
    var Op = document.createElement("OPTION");
    Op.value=v;  Op.text=t;
    sel.add(Op);
}
 */

//公历和儒略日互相转换，使用全局 JD 对象。
//农历和儒略日互相转换？
//////////////////////////////////////////////

//整个排盘文本
var AllText = document.getElementById("AllText");
//
function CalcGLBaZiPanPai()
{
    //排盘选项
    //性别
    var strGender = document.getElementById("sGender").value;
    // gBirthJingDu 是全局变量存出生经度，下面是出生省和市
    var strBirthShengFen =  (sShengFen.options[sShengFen.selectedIndex]).text;
    var strBirthShiXian = (sShiXian.options[sShiXian.selectedIndex]).text;
    //真太阳时
    var useZTY = Number( document.getElementById("sUseZTY").value );
    //是否甲子高级排盘
    var useJZGaoJi = Number( document.getElementById("sUseJZGaoJi").value );
    
    //JD对象计算儒略日
    //默认 Y:2000, M:1, D:1, h:12, m:0, s:0,
    var myJD = JD;  //myJD和JD都是全局对象，会被莫名其妙修改，只能一次性用完扔
    myJD.Y = Number(sYear.value);
    myJD.M = Number(sMonth.value);
    myJD.D = Number(sDay.value);
    myJD.h = Number(sHour.value);
    myJD.m = Number(sMinute.value);
    myJD.s = 30;    //默认用30秒
    //获取出生时间对应儒略日
    var birthJD = myJD.toJD();
    
    //判断是否需要绘图
    var bDraw = Number( document.getElementById("sDrawPic").value );
    //console.log(syCanvas); 
    
    //参数为 出生儒略日、性别、省份、市县、是否真太阳、是否高级盘，出生的经度
    AllText.innerHTML =  GetGLPaiPanHTML(birthJD, strGender, strBirthShengFen, strBirthShiXian, useZTY, useJZGaoJi, gBirthJingDu
            , bDraw, syCanvas);

    //执行自动复制到剪贴板，IE9和Chrome支持，火狐测试不行。
    document.execCommand("selectAll");  //全选
    document.execCommand("copy");       //复制
    document.execCommand("unselect");   //不选中 
}

