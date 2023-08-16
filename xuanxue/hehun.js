//程序理论适用时间段 1583 年 到 3199 年，即格里高利历后一年到3200前一年，3200年是否为闰年待定。
//全局变量，把起始时间和结束时间改一下就可以更换排盘的年份范围，这里为最近的240年时间段。
var gStartYear = 1924;
var gEndYear = 2164;
//绘图控件
var syCanvas = document.getElementById("syCanvas");
//男方年月日时分
var nanYear = document.getElementById("nanYear");
var nanMonth = document.getElementById("nanMonth");
var nanDay = document.getElementById("nanDay");
var nanHour = document.getElementById("nanHour");
var nanMinute = document.getElementById("nanMinute");
//女方年月日时分
var nvYear = document.getElementById("nvYear");
var nvMonth = document.getElementById("nvMonth");
var nvDay = document.getElementById("nvDay");
var nvHour = document.getElementById("nvHour");
var nvMinute = document.getElementById("nvMinute");

/**************************************************/
//公历控件的初始化和动态更新
function InitYears()    //初始化时一次性调用
{
    //清空旧的
    nanYear.length = 0;  
    nvYear.length = 0;
    var curOpNan;
    var curOpNv;
    for(var i=gStartYear; i<=gEndYear; i++)
    {
        //男方
        curOpNan = document.createElement('option');
        curOpNan.value = i;
        curOpNan.text = String(i);
        nanYear.add(curOpNan, null);
        //女方
        curOpNv = document.createElement('option');
        curOpNv.value = i;
        curOpNv.text = String(i);
        nvYear.add(curOpNv, null);
    }
    //默认选择2000年
    nanYear.selectedIndex = 2000 - gStartYear;
    nvYear.selectedIndex = 2000 - gStartYear;
}
//初始是2000年1月份
function InitDays() //初始化时一次性调用
{
    //清空旧的一个选项
    nanDay.length = 0;
    nvDay.length = 0;
    var curOpNan;
    var curOpNv;
    //添加，2000年1月
    var nCount = 31;
    for(var i=1; i<=nCount; i++)
    {
        curOpNan = document.createElement('option');
        curOpNan.value = i;
        curOpNan.text = String(i);
        nanDay.add(curOpNan, null);
        //女
        curOpNv = document.createElement('option');
        curOpNv.value = i;
        curOpNv.text = String(i);
        nvDay.add(curOpNv, null);
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
function OnNanYearChanged()
{
    //年份变化只影响2月
    var curYear = nanYear.value;
    var curMonth = nanMonth.value;
    if(curMonth != 2)
    {
        return; //不是2月
    }
    //是2月
    var oldDaysCount = nanDay.length;
    var newDaysCount = GetGLDaysCountByYearAndMonth(curYear, curMonth);
    if( oldDaysCount == newDaysCount )
    {
        //旧的天数和新的天数没变，不需要改动
        return;
    }
    //天数有变化
    if( oldDaysCount > newDaysCount )//旧的是29天，新的是28天
    {
        nanDay.remove(29 - 1);    //移除末尾的29号
    }
    else//旧的28天，新的29天
    {
        var curOp = document.createElement('option');
        curOp.value = 29;
        curOp.text = "29";
        nanDay.add(curOp, null);
    }
}
//根据月份变化，考虑是否更新日期
function OnNanMonthChanged()
{
    var curYear = nanYear.value;
    var curMonth = nanMonth.value;
    //根据年月设置天数
    //旧的天数，全部移除掉
    var oldCount = nanDay.length;
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
            nanDay.remove( i-1 );
        }
    }
    else
    {
        //少了补齐
        for(var i=oldCount+1; i<=newCount; i++)
        {
            var curOp = document.createElement('option');
            curOp.value = i;
            curOp.text = String(i);
            nanDay.add(curOp, null);
        }
    }
}

//根据年份变化，考虑是否更新日期
function OnNvYearChanged()
{
    //年份变化只影响2月
    var curYear = nvYear.value;
    var curMonth = nvMonth.value;
    if(curMonth != 2)
    {
        return; //不是2月
    }
    //是2月
    var oldDaysCount = nvDay.length;
    var newDaysCount = GetGLDaysCountByYearAndMonth(curYear, curMonth);
    if( oldDaysCount == newDaysCount )
    {
        //旧的天数和新的天数没变，不需要改动
        return;
    }
    //天数有变化
    if( oldDaysCount > newDaysCount )//旧的是29天，新的是28天
    {
        nvDay.remove(29 - 1);    //移除末尾的29号
    }
    else//旧的28天，新的29天
    {
        var curOp = document.createElement('option');
        curOp.value = 29;
        curOp.text = "29";
        nvDay.add(curOp, null);
    }
}
//根据月份变化，考虑是否更新日期
function OnNvMonthChanged()
{
    var curYear = nvYear.value;
    var curMonth = nvMonth.value;
    //根据年月设置天数
    //旧的天数，全部移除掉
    var oldCount = nvDay.length;
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
            nvDay.remove( i-1 );
        }
    }
    else
    {
        //少了补齐
        for(var i=oldCount+1; i<=newCount; i++)
        {
            var curOp = document.createElement('option');
            curOp.value = i;
            curOp.text = String(i);
            nvDay.add(curOp, null);
        }
    }
}

/////////////////////////////////////////////////////////////////////
//整个排盘文本
var AllText = document.getElementById("AllText");
//计算合婚排盘
function CalcHeHunPanPai()
{
    //提取男方生日信息
    var myJD = JD;
    myJD.Y = Number(nanYear.value);
    myJD.M = Number(nanMonth.value);
    myJD.D = Number(nanDay.value);
    myJD.h = Number(nanHour.value);
    myJD.m = Number(nanMinute.value);
    myJD.s = 30;  //默认是30秒的排盘
    //男命出生儒略日
    var birthNan = myJD.toJD();
    //提取女方生日信息
    myJD.Y = Number(nvYear.value);
    myJD.M = Number(nvMonth.value);
    myJD.D = Number(nvDay.value);
    myJD.h = Number(nvHour.value);
    myJD.m = Number(nvMinute.value);
    myJD.s = 30;  //默认30秒
    var birthNv = myJD.toJD();

    //通用排盘函数，参数是出生的普通时间儒略日、性别、出生地经度、是否真太阳
    //返回 bzpp 对象
    var bzppNan =  CalcBaZiObject(birthNan, "男", 120, 0);//男命八字
    var bzppNv = CalcBaZiObject(birthNv, "女", 120, 0);//女命八字
    //
    //判断是否需要绘图
    var bDraw = Number( document.getElementById("sDrawPic").value );
    //console.log(syCanvas); 
    //八字合婚
    AllText.innerHTML = GetHeHunHTML(bzppNan, bzppNv
            , bDraw, syCanvas); //后两个参数表示 是否绘图
            
    //补上运势合婚图的说明
    
    if( 1 == bDraw  )//画图时才显示说明
    {
        //说明的文字段对象
        var shuoming = document.getElementById("YunShiHeHunShuoMing");
        shuoming.innerHTML = "运势匹配图说明：<br>" +
            "◆蓝色曲线代表男命运势，紫红色曲线代表女命运势，匹配时间段是从岁数小的那位20岁计算到80岁。<br>" +
            "◆绿色区域是协同部分，淡粉色条带是差异部分，绿色区域比粉红条块区域越大，代表运势匹配越好。<br>" +
            "◆垂直坐标是分值刻度，分值高的运势旺，分值低的运势差，如果出现分值低于0分，请注意防病防灾。" ;
    };

    //执行自动复制到剪贴板，IE9和Chrome支持，火狐测试不行。
    document.execCommand("selectAll");  //全选
    document.execCommand("copy");       //复制
    document.execCommand("unselect");   //不选中 
}

