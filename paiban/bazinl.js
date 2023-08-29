//程序理论适用时间段 1583 年 到 3199 年，即格里高利历后一年到3200前一年，3200年是否为闰年待定。
//全局变量，把起始时间和结束时间改一下就可以更换排盘的年份范围，这里为最近的240年时间段。
var gStartYear = 1924;
var gEndYear = 2164;
//年月日时的四个选择器，加上分钟
var sYear = document.getElementById("sYear");
//农历的月份、日子都是序号，从 0 开始计算
var sMonth = document.getElementById("sMonth");
var sDay = document.getElementById("sDay");
//小时是从 -1 到 22 点
var sHour = document.getElementById("sHour");
var sMinute = document.getElementById("sMinute");
//全局变量，保存出生地的经度、纬度
var gBirthJingDu = 120.0;  
var gBirthWeiDu = 38.0;

//当前农历年
var gCurNLYear = 2000;  //保存当前的农历年份
var gCurNongLiYueBiao; //保存当前的农历月表
//绘图控件
var syCanvas = document.getElementById("syCanvas");

/**************************************************/
//农历控件的初始化和动态更新
function InitNLYears() //填写年份和甲子名称
{
    sYear.length = 0;   //清空旧列表
    var strTemp = "";
    for(var i=gStartYear; i<=gEndYear; i++)
    {
        strTemp = String(i) + JiaZi[ GetNianJiaZiShu(i) ];
        addOp(sYear, i, strTemp);
    }
    sYear.selectedIndex = 2000 - gStartYear;
    //初始化
    gCurNLYear = 2000;
    gCurNongLiYueBiao = GetNongLiYueBiao( gCurNLYear );
    //更新月份
    sMonth.length = 0;  //清空旧列表
    for(var i=0; i<gCurNongLiYueBiao.yueCount; i++)
    {
        addOp( sMonth, i, gCurNongLiYueBiao.arrayNames[i] );
    }
    //初始化完成
}

function InitNLDays()     //加载日子，初始时2000年正月大，三十天
{
    sDay.length = 0;    //清除旧的列表
    //addOp(sel,value,text)
    for(var i=0; i<30; i++)
    {
        addOp(sDay, i, NLDayName[i]);
    }
}
//年份变化，更新月份、日子，全部变化
function OnNLYearChanged()
{
    gCurNLYear = Number( sYear.options[ sYear.selectedIndex ].value );
    gCurNongLiYueBiao =  GetNongLiYueBiao( gCurNLYear );
    //清空旧的月份列表
    sMonth.length = 0;
    //添加新的
    for(var i=0; i<gCurNongLiYueBiao.yueCount; i++)
    {
        addOp( sMonth, i, gCurNongLiYueBiao.arrayNames[i] );
    }
    sMonth.selectedIndex = 0;
    OnNLMonthChanged(); //月份带动日子列表变化
}
//月份变化，更新日子，29天或30天，多退少补
function OnNLMonthChanged()
{
    //旧的计数
    var oldCount = sDay.length;
    //新的计数
    var newCount =  gCurNongLiYueBiao.arrayDaysCount[ sMonth.selectedIndex ];
    //如果新旧相等
    if( oldCount == newCount )
    {
        return;
    }
    //如果不相等
    if( 29 < newCount ) //旧的29天，新的30天
    {
        addOp(sDay, 30-1, NLDayName[30-1]); //加上 三十
        return;
    };
    if( oldCount > 29 )//旧的30天，新的29天
    {
        sDay.remove( 30-1 );//去掉多的
        return;
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
//整个排盘文本
var AllText = document.getElementById("AllText");
//
function CalcNLBaZiPanPai()
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

    //农历年份和月表是自动更新的 gCurNLYear、gCurNongLiYueBiao
    //获取月序号
    var ixYue = Number(sMonth.selectedIndex) ;
    //日序号
    var ixRi =  Number(sDay.selectedIndex) ;
    //小时
    var hh = Number( sHour.options[ sHour.selectedIndex ].value );
    //分钟
    var mm = Number( sMinute.selectedIndex );
    //秒钟，默认按 30 秒排盘
    var ss = 30;
    //计算出生的儒略日
    var birthJD = NongLiDayToJD(gCurNongLiYueBiao, ixYue, ixRi, hh, mm, ss);
    
    //判断是否需要绘图
    var bDraw = Number( document.getElementById("sDrawPic").value );
    //console.log(syCanvas); 
    //
    //参数为 出生儒略日、性别、省份、市县、是否真太阳、是否高级盘，出生的经度
    AllText.innerHTML =  GetGLPaiPanHTML(birthJD, strGender, strBirthShengFen, strBirthShiXian, useZTY, useJZGaoJi, gBirthJingDu
            , bDraw, syCanvas);
    
    //执行自动复制到剪贴板，IE9和Chrome支持，火狐测试不行。
    document.execCommand("selectAll");  //全选
    document.execCommand("copy");       //复制
    document.execCommand("unselect");   //不选中 
}
