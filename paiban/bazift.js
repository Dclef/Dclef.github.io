//程序理论适用时间段 1583 年 到 3199 年，即格里高利历后一年到3200前一年，3200年是否为闰年待定。
//全局变量，把起始时间和结束时间改一下就可以更换排盘的年份范围，这里为最近的240年时间段。
var gStartYear = 1924;
var gEndYear = 2164;
//公历年月日时的四个选择器，加上分钟
var sJZYear = document.getElementById("sJZYear");   //甲子序
var sIxMonth = document.getElementById("sIxMonth"); //月序，0到11，寅月到丑月
var sJZDay = document.getElementById("sJZDay"); //甲子序
var sIxHour = document.getElementById("sIxHour");  //时辰序号，0到11，子时到亥时
//反推开始年份的控件
var sFTStartYear = document.getElementById("sFTStartYear");

//全局变量，保存出生地的经度、纬度
var gBirthJingDu = 120.0;  
var gBirthWeiDu = 38.0;
//绘图控件
var syCanvas = document.getElementById("syCanvas");

/**************************************************/
//反推控件的初始化和动态更新
function InitJZYears()    //加载年份
{
    sJZYear.length = 0; //清空旧的列表
    for(var i=0; i<60; i++)
    {
        addOp(sJZYear, i, JiaZi[i]);
    }
    //设置当前选项，更新月份列表
    sJZYear.selectedIndex = 0;
    OnJZYearChanged();
}
//function addOp(sel,value,text)  //给select对象加入option
//年份变化，更新月份
function OnJZYearChanged()
{
    //甲子年序
    var jzYear = Number( sJZYear.selectedIndex );
    //计算起始的月份，五虎遁年表
    var jzStartMM = ArrayDunNian[ jzYear%5 ];
    //清空月份
    sIxMonth.length = 0;
    //添加
    for(var i=0; i<12; i++)
    {
        addOp(sIxMonth, i, JiaZi[ (jzStartMM+i) % 60 ]);
    }
}

function InitJZDays()     //加载日子
{
    sJZDay.length = 0;  //清空旧列表
    for(var i=0; i<60; i++)
    {
        addOp(sJZDay, i, JiaZi[i]);
    }
    //设置当前选项，并更新时辰
    sJZDay.selectedIndex = 0;
    OnJZDayChanged();
}
//日子变化，更新时辰
function OnJZDayChanged()
{
    //选择的日子
    var jzDay = Number(sJZDay.selectedIndex);
    //计算起始时辰，五鼠遁日表
    var jzStartHH = ArrayDunRi[ jzDay%5 ];
    //清空旧列表
    sIxHour.length = 0;
    //添加
    for(var i=0; i<12; i++)
    {
        addOp(sIxHour, i, JiaZi[ (jzStartHH+i) % 60 ]);
    }
}
//////////////////////////////////////////////

//整个排盘文本
var AllText = document.getElementById("AllText");
//
function CalcFanTuiPanPai()
{
    //排盘选项
    //性别
    var strGender = document.getElementById("sGender").value;
    // gBirthJingDu 是全局变量存出生经度，下面是出生省和市
    var strBirthShengFen = "北京市";
    var strBirthShiXian = "天安门";
    //真太阳时
    var useZTY = 0;
    //是否甲子高级排盘
    var useJZGaoJi = Number( document.getElementById("sUseJZGaoJi").value );
    
    //提取年月日时
    var jzYear = Number( sJZYear.selectedIndex );
    var ixMonth = Number( sIxMonth.selectedIndex );
    var jzDay = Number( sJZDay.selectedIndex );
    var ixHour = Number( sIxHour.selectedIndex );
    //提取反推的起始年份
    var ftStartYear = Number(sFTStartYear.options[ sFTStartYear.selectedIndex ].value);
    
    //计算反推的儒略日子，如果返回值小于 0，说明没有找到
    var birthJD = GetFanTuiJD(ftStartYear, jzYear, ixMonth, jzDay, ixHour);
    if( birthJD < 0 )
    {
        alert("反推时间段未找到该八字，请调整四柱八字或选择其他时间段，再进行尝试。");
        return;
    }
    //判断是否需要绘图
    var bDraw = Number( document.getElementById("sDrawPic").value );
    //console.log(syCanvas); 
    //排盘
     //参数为 出生儒略日、性别、省份、市县、是否真太阳、是否高级盘，出生的经度
    AllText.innerHTML =  GetGLPaiPanHTML(birthJD, strGender, strBirthShengFen, strBirthShiXian, useZTY, useJZGaoJi, gBirthJingDu
            , bDraw, syCanvas);
    
    //执行自动复制到剪贴板，IE9和Chrome支持，火狐测试不行。
    document.execCommand("selectAll");  //全选
    document.execCommand("copy");       //复制
    document.execCommand("unselect");   //不选中 
}
