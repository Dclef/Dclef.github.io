//程序理论适用时间段 1583 年 到 3199 年，即格里高利历后一年到3200前一年，3200年是否为闰年待定。
//全局变量，把起始时间和结束时间改一下就可以更换排盘的年份范围，这里为最近的240年时间段。
var gStartYear = 1924;
var gEndYear = 2164;
//绘图控件
var syCanvas = document.getElementById("syCanvas");
//男方年月日时分，农历的月份和日子都用序号，从0编号
var nanYear = document.getElementById("nanYear");
var nanMonth = document.getElementById("nanMonth");
var nanDay = document.getElementById("nanDay");
var nanHour = document.getElementById("nanHour");
var nanMinute = document.getElementById("nanMinute");
//女方年月日时分，农历的月份和日子都用序号，从0编号
var nvYear = document.getElementById("nvYear");
var nvMonth = document.getElementById("nvMonth");
var nvDay = document.getElementById("nvDay");
var nvHour = document.getElementById("nvHour");
var nvMinute = document.getElementById("nvMinute");

//农历年份和当年月历
//男方
var gNanNLYear = 2000;  //保存男方当前的农历年份
var gNanNongLiYueBiao;  //保存男方当前的农历月表
//女方
var gNvNLYear = 2000;  //保存女方的农历年份
var gNvNongLiYueBiao;  //保存女方的农历月表

/**************************************************/
//农历控件的初始化和动态更新
function InitNLYears()    //初始化时一次性调用
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
        curOpNan.text = String(i) + JiaZi[ GetNianJiaZiShu(i) ];
        nanYear.add(curOpNan, null);
        //女方
        curOpNv = document.createElement('option');
        curOpNv.value = i;
        curOpNv.text = String(i) + JiaZi[ GetNianJiaZiShu(i) ];
        nvYear.add(curOpNv, null);
    }
    //默认选择2000年
    nanYear.selectedIndex = 2000 - gStartYear;
    nvYear.selectedIndex = 2000 - gStartYear;
    //设置男方和女方的初始年份、初始农历月表
    gNanNLYear = 2000;
    gNanNongLiYueBiao = GetNongLiYueBiao( gNanNLYear );
    //添加男方农历月份
    nanMonth.length = 0;//清除旧的
    for(var i=0; i<gNanNongLiYueBiao.yueCount; i++)
    {
        addOp(nanMonth, i, gNanNongLiYueBiao.arrayNames[i] );
    }
    //女方
    gNvNLYear = 2000;
    gNvNongLiYueBiao = GetNongLiYueBiao( gNvNLYear );
    //添加女方农历月份
    nvMonth.length = 0;//清除旧的
    for(var i=0; i<gNvNongLiYueBiao.yueCount; i++)
    {
        addOp(nvMonth, i, gNvNongLiYueBiao.arrayNames[i] );
    }
    //完成年月添加
}
//农历月份和日子都用序号，从0开始编号
//初始是农历2000年 正月大，30天
function InitNLDays() //初始化时一次性调用
{
    //清空旧的一个选项
    nanDay.length = 0;
    nvDay.length = 0;
    var curOpNan;
    var curOpNv;
    //添加农历三十天
    for(var i=0; i<30; i++)
    {
        curOpNan = document.createElement('option');
        curOpNan.value = i;
        curOpNan.text = NLDayName[i];
        nanDay.add(curOpNan, null);
        //女
        curOpNv = document.createElement('option');
        curOpNv.value = i;
        curOpNv.text = NLDayName[i];
        nvDay.add(curOpNv, null);
    }
}

//农历年份变化，月份变化，日子天数也有变化
function OnNanYearChanged()
{
    gNanNLYear = Number( nanYear.options[ nanYear.selectedIndex ].value );
    gNanNongLiYueBiao =  GetNongLiYueBiao( gNanNLYear );
    //清空旧的月份列表
    nanMonth.length = 0;
    //添加新的
    for(var i=0; i<gNanNongLiYueBiao.yueCount; i++)
    {
        addOp( nanMonth, i, gNanNongLiYueBiao.arrayNames[i] );
    }
    nanMonth.selectedIndex = 0;//正月
    OnNanMonthChanged(); //月份带动日子列表变化  
}
//根据月份变化，考虑是否更新日期，29天或30天，多退少补
function OnNanMonthChanged()
{
    //旧的计数
    var oldCount = nanDay.length;
    //新的计数
    var newCount =  gNanNongLiYueBiao.arrayDaysCount[ nanMonth.selectedIndex ];
    //如果新旧相等
    if( oldCount == newCount )
    {
        return;
    }
    //如果不相等
    if( 29 < newCount ) //旧的29天，新的30天
    {
        addOp(nanDay, 30-1, NLDayName[30-1]); //加上 三十
        return;
    };
    if( oldCount > 29 )//旧的30天，新的29天
    {
        nanDay.remove( 30-1 );//去掉多的
        return;
    }
}

//农历年份变化，更新月份、日子，全部变化
function OnNvYearChanged()
{
    gNvNLYear = Number( nvYear.options[ nvYear.selectedIndex ].value );
    gNvNongLiYueBiao =  GetNongLiYueBiao( gNvNLYear );
    //清空旧的月份列表
    nvMonth.length = 0;
    //添加新的
    for(var i=0; i<gNvNongLiYueBiao.yueCount; i++)
    {
        addOp( nvMonth, i, gNvNongLiYueBiao.arrayNames[i] );
    }
    nvMonth.selectedIndex = 0;
    OnNvMonthChanged(); //月份带动日子列表变化
}
//月份变化，更新日子，29天或30天，多退少补
function OnNvMonthChanged()
{
    //旧的计数
    var oldCount = nvDay.length;
    //新的计数
    var newCount =  gNvNongLiYueBiao.arrayDaysCount[ nvMonth.selectedIndex ];
    //如果新旧相等
    if( oldCount == newCount )
    {
        return;
    }
    //如果不相等
    if( 29 < newCount ) //旧的29天，新的30天
    {
        addOp(nvDay, 30-1, NLDayName[30-1]); //加上 三十
        return;
    };
    if( oldCount > 29 )//旧的30天，新的29天
    {
        nvDay.remove( 30-1 );//去掉多的
        return;
    } 
}

/////////////////////////////////////////////////////////////////////
//整个排盘文本
var AllText = document.getElementById("AllText");
//计算合婚排盘
function CalcHeHunPanPai()
{
    //提取男方生日信息
   var ixNanYue = Number( nanMonth.selectedIndex ); //月序
   var ixNanRi = Number( nanDay.selectedIndex );    //日序
   var hhNan = Number( nanHour.options[ nanHour.selectedIndex ].value );//小时 -1 到 22
   var mmNan = Number( nanMinute.selectedIndex ); //分钟 0 到 59
   var ssNan = 30;  //默认按30秒
   //计算男命儒略日
   var birthNan = NongLiDayToJD(gNanNongLiYueBiao, ixNanYue, ixNanRi, hhNan, mmNan, ssNan);
   ////////////////////////////
   //提取女方出生信息
   var ixNvYue = Number( nvMonth.selectedIndex );   //月序
   var ixNvRi = Number( nvDay.selectedIndex );  //日序
   var hhNv = Number( nvHour.options[ nvHour.selectedIndex ].value );//小时-1到22
   var mmNv = Number( nvMinute.selectedIndex  );    //分钟
   var ssNv = 30;   //默认按30秒
   //计算女命儒略日
   var birthNv = NongLiDayToJD(gNvNongLiYueBiao, ixNvYue, ixNvRi, hhNv, mmNv, ssNv);

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

