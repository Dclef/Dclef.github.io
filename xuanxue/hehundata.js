//程序理论适用时间段 1583 年 到 3199 年，即格里高利历后一年到3200前一年，3200年是否为闰年待定。

//////////////////////////////
//纳音合婚表，行列为双方元神，计算同性生克，异性的计算额外加分
//范围 1分 到 10分

//相克    1到2
//同五行  7到8
//相生    9到10

//邻生：顺1位加分。隔生：顺2位加分。象限生 加分，象限克 减分。
var NaYinHeHunBiao  = 
[	    //海中金 炉中火 大林木 路旁土 剑风金 山头火 洞下水 城墙土 白腊金 杨柳木 泉中水 屋上土 霹雷火 松柏木 长流水 沙中金 山下火 平地木 壁上土 金箔金 覆灯火 天河水 大泽土 钗钏金 桑松木 大溪水 沙中土 天上火 石榴木 大海水
/*海中金*/ [7,     3,     3,     9,     7,     1,     9,     9,     7,     3,     9,     9,     1,     3,     8,     7,     1,     3,     9,     7,      1,     9,     9,     7,     3,    9,     9,     1,      3,     9],
/*炉中火*/ [3,     7,     9,     9,     1,     7,     3,     9,     1,     9,     3,     9,     7,     9,     1,     1,     7,     9,     9,     1,      7,     1,     9,     1,     9,    3,     9,     7,      9,     3],
/*大林木*/ [3,     9,     7,     3,     3,     9,     9,     1,     1,     7,     9,     1,     9,     7,     9,     1,     9,     7,     1,     1,      9,     9,     1,     1,     7,    9,     1,     9,      7,     9],
/*路旁土*/ [9,     9,     3,     7,     9,     9,     1,     7,     9,     1,     1,     7,     9,     1,     1,     9,     9,     1,     7,     9,      9,     1,     7,     9,     1,    1,     7,     9,      1,     1],
/*剑风金*/ [7,     1,     3,     9,     7,     3,     9,     9,     7,     1,     9,     9,     1,     1,     9,     7,     1,     1,     9,     7,      1,     9,     9,     7,     3,    9,     9,     1,      1,     9],
/*山头火*/ [1,     7,     9,     9,     3,     7,     3,     9,     1,     9,     1,     9,     7,     9,     1,     1,     7,     9,     9,     1,      7,     1,     9,     1,     9,    1,     9,     7,      9,     1],
/*洞下水*/ [9,     3,     9,     1,     9,     3,     7,     3,     9,     9,     7,     1,     1,     9,     7,     9,     1,     9,     1,     9,      1,     7,     1,     9,     9,    7,     1,     1,      9,     7],
/*城墙土*/ [9,     9,     1,     7,     9,     9,     3,     7,     9,     3,     1,     7,     9,     1,     1,     9,     9,     1,     7,     9,      9,     1,     7,     9,     1,    1,     7,     9,      1,     1],
/*白腊金*/ [7,     1,     1,     9,     7,     1,     9,     9,     7,     3,     9,     9,     1,     1,     9,     7,     1,     1,     9,     7,      1,     9,     9,     7,     3,    9,     9,     1,      1,     9],
/*杨柳木*/ [3,     9,     7,     1,     1,     9,     9,     3,     3,     7,     9,     3,     9,     7,     9,     1,     9,     7,     1,     1,      9,     9,     1,     1,     7,    9,     1,     9,      7,     9],
/*泉中水*/ [9,     3,     9,     1,     9,     1,     7,     1,     9,     9,     7,     3,     3,     9,     7,     9,     1,     9,     1,     9,      1,     7,     1,     9,     9,    7,     1,     1,      9,     7],
/*屋上土*/ [9,     9,     1,     7,     9,     9,     1,     7,     9,     3,     3,     7,     9,     3,     1,     9,     9,     1,     7,     9,      9,     1,     7,     9,     1,    1,     7,     9,      1,     1],
/*霹雷火*/ [1,     7,     9,     9,     1,     7,     1,     9,     1,     9,     3,     9,     7,     9,     3,     1,     7,     9,     9,     1,      7,     1,     9,     1,     9,    1,     9,     7,      9,     1],
/*松柏木*/ [3,     9,     7,     1,     1,     9,     9,     1,     1,     7,     9,     3,     9,     7,     9,     3,     9,     7,     1,     1,      9,     9,     1,     1,     7,    9,     1,     9,      7,     9],
/*长流水*/ [8,     1,     9,     1,     9,     1,     7,     1,     9,     9,     7,     1,     3,     9,     7,     9,     3,     9,     1,     9,      1,     7,     1,     8,     9,    7,     1,     1,      9,     7],

/*沙中金*/ [7,     1,     1,     9,     7,     1,     9,     9,     7,     1,     9,     9,     1,     3,     9,     7,     3,     3,     9,     7,      1,     9,     9,     7,     3,    9,     9,     1,      1,     9],
/*山下火*/ [1,     7,     9,     9,     1,     7,     1,     9,     1,     9,     1,     9,     7,     9,     3,     3,     7,     9,     9,     1,      7,     1,     9,     1,     9,    1,     9,     7,      9,     1],
/*平地木*/ [3,     9,     7,     1,     1,     9,     9,     1,     1,     7,     9,     1,     9,     7,     9,     3,     9,     7,     3,     3,      9,     9,     1,     1,     7,    9,     1,     9,      7,     9],
/*壁上土*/ [9,     9,     1,     7,     9,     9,     1,     7,     9,     1,     1,     7,     9,     1,     1,     9,     9,     3,     7,     9,      9,     1,     7,     9,     1,    1,     7,     9,      1,     1],
/*金箔金*/ [7,     1,     1,     9,     7,     1,     9,     9,     7,     1,     9,     9,     1,     1,     9,     7,     1,     3,     9,     7,      3,     9,     9,     7,     3,    9,     9,     1,      1,     9],
/*覆灯火*/ [1,     7,     9,     9,     1,     7,     1,     9,     1,     9,     1,     9,     7,     9,     1,     1,     7,     9,     9,     3,      7,     3,     9,     1,     9,    1,     9,     7,      9,     1],
/*天河水*/ [9,     1,     9,     1,     9,     1,     7,     1,     9,     9,     7,     1,     1,     9,     7,     9,     1,     9,     1,     9,      3,     7,     1,     9,     9,    7,     1,     1,      9,     7],
/*大泽土*/ [9,     9,     1,     7,     9,     9,     1,     7,     9,     1,     1,     7,     9,     1,     1,     9,     9,     1,     7,     9,      9,     1,     7,     9,     3,    1,     7,     9,      1,     1],
/*钗钏金*/ [7,     1,     1,     9,     7,     1,     9,     9,     7,     1,     9,     9,     1,     1,     8,     7,     1,     1,     9,     7,      1,     9,     9,     7,     3,    9,     9,     1,      1,     9],
/*桑松木*/ [3,     9,     7,     1,     3,     9,     9,     1,     3,     7,     9,     1,     9,     7,     9,     3,     9,     7,     1,     3,      9,     9,     3,     3,     7,    9,     3,     8,      7,     9],
/*大溪水*/ [9,     3,     9,     1,     9,     1,     7,     1,     9,     9,     7,     1,     1,     9,     7,     9,     1,     9,     1,     9,      1,     7,     1,     9,     9,    7,     3,     3,      9,     7],
/*沙中土*/ [9,     9,     1,     7,     9,     9,     1,     7,     9,     1,     1,     7,     9,     1,     1,     9,     9,     1,     7,     9,      9,     1,     7,     9,     3,    3,     7,     9,      1,     1],
/*天上火*/ [1,     7,     9,     9,     1,     7,     1,     9,     1,     9,     1,     9,     7,     9,     1,     1,     7,     9,     9,     1,      7,     1,     9,     1,     8,    3,     9,     7,      8,     3],
/*石榴木*/ [3,     9,     7,     1,     1,     9,     9,     1,     1,     7,     9,     1,     9,     7,     9,     1,     9,     7,     1,     1,      9,     9,     1,     1,     7,    9,     1,     8,      7,     9],
/*大海水*/ [9,     3,     9,     1,     9,     1,     7,     1,     9,     9,     7,     1,     1,     9,     7,     9,     1,     9,     1,     9,      1,     7,     1,     9,     9,    7,     1,     3,      9,     7]
];

//计算单柱合婚，参数是两个甲子序号
function GetDanZhuHeHun(jzNan, jzNv)
{
    //是否同阴阳
    var isYiXing;
    if( (jzNan%2) != (jzNv%2) )//模2不同
    {
        isYiXing = 1; //异阴阳，有加分
    }
    else
    {
        isYiXing = 0; //同阴阳
    }
    //纳音编号，共30个
    var nyNan = Math.floor(jzNan / 2);
    var nyNv = Math.floor( jzNv / 2 );
    //计算分数
    var score = NaYinHeHunBiao[nyNan][nyNv] + isYiXing;
    return score;
}

/////////////////////////////////////////////
//根据儒略日排盘，返回 bzpp 对象
//八字计算后的对象，时间都是儒略日
//bzpp.JDBirth 普通出生时间
//bzpp.JDBirthZTY 出生时间真太阳时
//bzpp.Gender  性别，男或女
//bzpp.JingDuBirth  出生地经度
//bzpp.IsUseZTY       使用真太阳时排盘

//bzpp.iNianJZ  //八字年柱甲子序号
//bzpp.iYueJZ  //八字月柱甲子序号
//bzpp.iRiJZ  //八字日柱甲子序号
//bzpp.iShiJZ  //八字时柱甲子序号

//bzpp.iTaiYuan 胎元
//bzpp.iMingGong 命宫

//bzpp.JQMing0  //前一个节气名称
//bzpp.JQJD0    //前一个节气儒略日
//bzpp.JQMing1  //后一个节气名称
//bzpp.JQJD1    //后一个节气儒略日
//bzpp.DaYunJD  //大运起运的儒略日
//bzpp.isNiDaYun //是否大运逆序排列
function GetGaoJiBaZiJianPai(bzpp)   //获取高级八字简排
{
    //字符串
    var strResult = "";
    var strTemp = "";
    var birthJD = bzpp.JDBirth; //不用真太阳
    //时间
    var myDD = JD.DD(birthJD);
    if( bzpp.Gender == "女" )
    {
        strTemp = "女命甲子高级排盘：<br>";
    }
    else
    {
        strTemp = "男命甲子高级排盘：<br>";
    }
    strResult += strTemp;
    //出生时间
    strTemp = "出生公历：" + String(myDD.Y) + "年"
        + String(myDD.M) + "月"
        + String(myDD.D) + "日"
        + String(myDD.h) + "时"
        + String(myDD.m) + "分，"
        +  WeekDays[ GetiDayOfWeek(birthJD) ]  ;
    //真生肖
    strTemp += "， 真生肖：<b>" + DZShengXiao[bzpp.iNianJZ%12] + "</b>";
    strResult += strTemp;
    strResult += "<br>";
    //农历
    //出生农历，0点是今天的子时，23点后是明天的子时，要区分
    var theOB;
    if(myDD.h >= 23)//农历时间，23点后算下一天
    {
        theOB = GetJDtoNongLiOB(birthJD + 1);
    }
    else
    {
        theOB = GetJDtoNongLiOB(birthJD);
    }
    strTemp = "出生农历：" + theOB.Lyear3 + "年 "
              + theOB.Lleap + theOB.Lmc + "月 "
              + theOB.Ldc + "日 "
              + DiZhi[ (Math.floor((myDD.h+1)/2 )) % 12 ] + "时"
              + " （黄帝" + String( theOB.Lyear0 + 1984 + 2698 + 56 ) + "年）";//黄帝纪年比网上多56年
    //console.log( myDD.h );
    strResult += strTemp;
    strResult += "<br>";
    strResult += "<br>";
    //八字    
    if( "女" ==  bzpp.Gender)
    {
        strTemp = "坤造" + SpaceEN2;
        strTemp += GetBoldText(GetFuchsiaText(JiaZi[bzpp.iNianJZ])) + SpaceEN2 + SpaceEN2 + SpaceEN2
        +  GetBoldText(GetFuchsiaText(JiaZi[bzpp.iYueJZ]))  + SpaceEN2 + SpaceEN2 + SpaceEN2
        +  GetBoldText(GetFuchsiaText(JiaZi[bzpp.iRiJZ]))  + SpaceEN2 + SpaceEN2 + SpaceEN2
        +  GetBoldText(GetFuchsiaText(JiaZi[bzpp.iShiJZ])) ;
    }
    else
    {
        strTemp = "乾造" + SpaceEN2;
        strTemp += GetBoldText(GetBlueText(JiaZi[bzpp.iNianJZ])) + SpaceEN2 + SpaceEN2 + SpaceEN2
        + GetBoldText(GetBlueText(JiaZi[bzpp.iYueJZ])) + SpaceEN2 + SpaceEN2 + SpaceEN2
        + GetBoldText(GetBlueText(JiaZi[bzpp.iRiJZ])) + SpaceEN2 + SpaceEN2 + SpaceEN2
        + GetBoldText(GetBlueText(JiaZi[bzpp.iShiJZ])) ;
    }
    strTemp += SpaceEN2 + GetRiKongWang( bzpp.iRiJZ );
    strResult += strTemp;
    strResult += "<br>";
    //地支藏干
    strTemp = "藏干" + SpaceEN2;
    strTemp +=  SpaceEN2 + GetDiZhiCangGan( bzpp.iNianJZ % 12) + SpaceEN2
        + SpaceEN2 + GetDiZhiCangGan( bzpp.iYueJZ % 12) + SpaceEN2
        + SpaceEN2 + GetDiZhiCangGan( bzpp.iRiJZ % 12) + SpaceEN2
        + SpaceEN2 + GetDiZhiCangGan( bzpp.iShiJZ % 12);
    strResult += strTemp;
    strResult += "<br>";
    //纳音
    strTemp = "纳音" + SpaceEN2;
    strTemp +=  GetBlackText( NaYin[bzpp.iNianJZ] ) + SpaceEN2 + SpaceEN2
    +  GetBlackText( NaYin[bzpp.iYueJZ] ) + SpaceEN2 + SpaceEN2
    +  GetBlackText( NaYin[bzpp.iRiJZ] ) + SpaceEN2 + SpaceEN2
    +  GetBlackText( NaYin[bzpp.iShiJZ] ) ;
    strResult += strTemp;
    strResult += "<br>";
    strResult += "<br>";
    //大运计算
    //计算起运甲子序号
    var iQiYunJZ;
    var iYunDelta = 0;  //大运顺行是 +1，逆行是 -1
    if( 0 == bzpp.isNiDaYun )//顺行
    {
        iQiYunJZ = (bzpp.iYueJZ + 1 + 60) % 60;
        iYunDelta = 1;
    }
    else//逆行
    {
        iQiYunJZ = (bzpp.iYueJZ - 1 + 60) % 60;
        iYunDelta = -1;
    }
    //起年公历年、起年甲子数
    var qiyunGLNian = myDD.Y ;
    //var iQiYunGLNianJZ = GetNianJiaZiShu(qiyunGLNian);
    //开始排大运
    var strDaYunJiaZi = "大运" + SpaceEN2;
    var strDaYunNaYin = "纳音" + SpaceEN2 ;
    var strDaYunZhouSui = "周岁" + SpaceEN2 + SpaceEN2;
    var strDaYunQiNian = "起年" + SpaceEN2 ;
    //var strDaYunZhiNian = "止年" + SpaceEN2 ;
    var arrayDaYunJiaZi = new Array(8); //八步大运的甲子数，5步循环
    for(var i=0; i<8; i++)//计算大运信息字符串
    {
        //5 步 大运循环，12年换大运
        arrayDaYunJiaZi[i] = (iQiYunJZ + (i%5)*iYunDelta + 60) % 60;
        strDaYunJiaZi += JiaZi[ arrayDaYunJiaZi[i] ] + SpaceEN2 + SpaceEN2;
        strDaYunNaYin += NaYin[ arrayDaYunJiaZi[i] ] + SpaceEN2;
        strDaYunZhouSui += PackSmallNumber(String( 0 + i * 12)) + SpaceEN2 + SpaceEN2 + SpaceEN2;
        strDaYunQiNian += PackSmallNumber(String( qiyunGLNian + i * 12)) + SpaceEN2 + SpaceEN2;
        //strDaYunZhiNian += PackSmallNumber(String( qiyunGLNian + 11 + i * 12)) + SpaceEN2 + SpaceEN2;
    }
    //添加到结果串
    strResult += GetRedText(strDaYunJiaZi) + "<br>" ;
    strResult += strDaYunNaYin + "<br>" ;
    strResult += strDaYunZhouSui + "<br>" ;
    strResult += strDaYunQiNian + "<br>" ;
    //
    return strResult;
}

//计算男女八字合婚的字符串
function GetHeHunHTML(bzppNan, bzppNv, bDraw, syCanvas)//排盘不用真太阳
{
    //结果字符串
    var strResult =  "<div align='left' style='font-family: 宋体;'>"; 
    var strTemp = "";
    //不换行标记开始
    strResult += "<span style='white-space: nowrap;'>";
    //男命信息
    strResult += GetGaoJiBaZiJianPai(bzppNan); 
    strResult += "<br>";
    
    //女命信息
    strResult += GetGaoJiBaZiJianPai(bzppNv); 
    strResult += "<br>";
    
    strResult += "</span>"; //不换行标记的末尾
    //计算合婚分数
    var scoreAll = GetYuanJuHeHunScore(bzppNan, bzppNv);
    scoreAll += 1;  //调整到101
    //alert( scoreAll );
    strResult += GetSkyBlueText("******************************<br>");
    //显示分数    
    strTemp = "纳音匹配度："  + String(scoreAll)
             + SpaceEN2 + SpaceEN2
             + ArrayScoreResult[ Math.floor( scoreAll/17.0 ) ];
    strResult +=  GetBoldText( GetBlueText(strTemp) );
     strResult += "<br>";    
    
    //计算运势匹配指数
    var ysHeHun = CalcYunShiHeHunObject(bzppNan, bzppNv);
    ysHeHun.score += 1; //调整到101
    strTemp = "运势匹配度：" + String( ysHeHun.score )
            + SpaceEN2 + SpaceEN2
            + ArrayScoreResult[ Math.floor( ysHeHun.score/17.0 ) ];
    strResult +=  GetBoldText( GetBlueText(strTemp) );
    strResult += "<br>";
    //计算原句静态和运势动态综合分
    //原句占101分，运势占 101 分，综合除以2
    var scoreFinal = (scoreAll + ysHeHun.score ) / 2;
    scoreFinal = Math.floor( scoreFinal + 0.5 );
    strTemp = "婚配综合分：" + String( scoreFinal )
            + SpaceEN2 + SpaceEN2
            + ArrayScoreResult[ Math.floor( scoreFinal/17.0 ) ];
    strResult +=  GetBoldText( GetRedText(strTemp) );
    strResult += "<br>";  
//    //尾部
    strResult += GetSkyBlueText("******************************");
    strResult += "<br>";  
    //合婚描述
    var hhid = Math.floor( scoreFinal/17.0 );
    strResult += ArrayHeHunResult[hhid];
    strResult += "<br>";
    //年龄判断
    if( Math.abs( bzppNan.JDBirth - bzppNv.JDBirth ) > 365*59 )
    {
        //年龄差超过60岁
        strResult += GetBoldText( GetRedText("双方年龄差距太大，不要玩我！") );
        strResult += "<br>";
    };
    ///////////////////////////////////////////////
    ////评语    
    
    strResult += "<br>";
    strResult += "<b>合婚提示：</b><br><ul>";
    
    //合婚批语 * ◇◆※
    if( scoreAll <= 6)//四柱相同的 4分到5分
    {
        strResult += "<li>※四柱八字完全相同，无缘。</li>" ;
    }
    else
    {
        //正常合婚，好的不灵坏的灵，讲有问题的，第三个参数是原局纳音合婚
        strResult += GetHeHunHints(bzppNan, bzppNv, scoreAll);
        //纳音匹配的低分在上面 GetHeHunHints 函数已经判断过了
        //判断运势匹配
        if(  ysHeHun.score < 40 ) //运势合婚小于40，偏低提醒
        {
            strResult += "<li>运势匹配偏低，双方在工作事业、生活方式、持家理念、为人处世等方面可能存在分歧，" 
                    + "随着相处时间变长而呈现矛盾，需要注意协调缓解，以免脾气爆发。</li>";
        } 
        //头胎预估
        strResult += "<li>头胎预估：如果成婚，并且男女双方出生时间都非常精确，头胎易生"
                + GetTouTaiString(bzppNan, bzppNv)
                + "。（<b>只有50%准确率，仅供娱乐，切勿当真。</b>）</li>";
    }
    strResult += "</ul>";
    ////////////////
    strResult += "<b>男命信息：</b><br><ul>";
    strResult += GetMingJuInfo(bzppNan);
    strResult += "</ul>";
    ////////////////
    strResult += "<b>女命信息：</b><br><ul>";
    strResult += GetMingJuInfo(bzppNv);
    strResult += "</ul>";
    //补上末尾的标签
    strResult += "</div>";
    //替换中文空格，适应部分手机浏览器字体
    strResult = strResult.replace(/&emsp;/g, "　");
    
     //绘图
    var painter = syCanvas.getContext("2d");
    //console.log(painter);
    if( (1==bDraw) && painter ) //判断是否绘图、有无画布
    {
        syCanvas.width = 640;   //扩大画布
        syCanvas.height = 600;
        //画运势合婚图
        DrawYunShiHeHun(ysHeHun, painter);
    }
    
    //返回
    return strResult;
}
// (分数+1 / 17) 分为6个档次
// 0, 17, 34, 51, 68, 85, 101
//纳音合婚评语
var ArrayHeHunResult  = 
[	// 0
	"<b>镜花水月：</b>婚缘很差，生活有苦有甜，且行且珍惜。",
	// 17
	"<b>情长缘短：</b>婚缘较差，成婚阻力大，婚后多家庭矛盾，注意调和。",
	// 34
	"<b>喜忧参半：</b>婚缘不佳，成婚有阻力，婚后有家庭矛盾，注意调和。",
	// 51
	"<b>秦晋之好：</b>婚缘尚可，适合一块生活。双方只要多包容、信任，家道可以康宁。",
	// 68
	"<b>琴瑟和鸣：</b>婚缘很好，伉俪情深。夫妻感情好，家庭比较和睦。",
	// 85
	"<b>神仙美眷：</b>十世情牵，三生良缘。夫妻感情非常好，家庭和睦。",
	// 101
	"<b>神仙美眷：</b>十世情牵，三生良缘。夫妻感情非常好，家庭和睦。"
];
// (分数+1 / 17) 分为6个档次
// 0, 17, 34, 51, 68, 85, 101
//简短分值评语
var ArrayScoreResult = 
[    
    "很差", // 0
    "较差", // 17
    "将就", // 34
    "平吉", // 51
    "上吉", // 68
    "极佳",  //85
    "极佳"   //101
];

//计算原局合婚分数 0 到 100 分
function GetYuanJuHeHunScore(bzppNan, bzppNv)
{
    //年柱
    var scNian = GetDanZhuHeHun(bzppNan.iNianJZ, bzppNv.iNianJZ);
    //月柱
    var scYue = GetDanZhuHeHun(bzppNan.iYueJZ, bzppNv.iYueJZ);
    //日柱
    var scRi = GetDanZhuHeHun(bzppNan.iRiJZ, bzppNv.iRiJZ);
    //时柱
    var scShi = GetDanZhuHeHun(bzppNan.iShiJZ, bzppNv.iShiJZ);
    //保存合婚指数
    var scoreAll = 0;
    var fourSame = 0;    //四柱相同
    //判断年柱、日柱是否有不一样的甲子数
    if( (bzppNan.iNianJZ != bzppNv.iNianJZ)
        || (bzppNan.iRiJZ != bzppNv.iRiJZ) )
    {
        //年柱、日柱有不同的，正常四柱合婚
        scoreAll = scNian * 4 + scYue * 1 + scRi * 6 + scShi * 1;
    }
    else
    {
        //年柱和日柱相同
        //如果月柱不同，计算月、时合婚
        if( bzppNan.iYueJZ != bzppNv.iYueJZ )
        {
            scoreAll = scYue * 4 + scShi * 6;   //月4成，时6成
        }
        else
        {
            //年、月、日都相同
            if( bzppNan.iShiJZ != bzppNv.iShiJZ )//如果时柱不同，计算时柱合婚
            {
                scoreAll = scShi * 10;  //时柱
            }
            else
            {
                //年月日柱四柱相同，无缘
                fourSame = 1;
                scoreAll = 4;
            }//end 时柱判断
        }//end 月柱判断
    }//end 年日判断
    
    //日柱，干合、支合、地支本气暗合加分，4分、4分、3分
    var riganNan = bzppNan.iRiJZ % 10;
    var riganNv = bzppNv.iRiJZ % 10;
    if( (riganNan + 5)%10 == riganNv )
    {
        scoreAll += 4;
        //alert("日干五合。");
    }
    //地合
    var rizhiNan = bzppNan.iRiJZ % 12;
    var rizhiNv = bzppNv.iRiJZ % 12;
    if( rizhiNv == DZLiuHe[rizhiNan] )
    {
        scoreAll += 4;
        //alert("地支六合。");
    }
    //地支本气
    var dzbqNan = DiZhiCangGan[rizhiNan][0];
    var dzbqNv = DiZhiCangGan[rizhiNv][0];
    if( (dzbqNan+5)%10 == dzbqNv )
    {
        scoreAll += 3;
        //alert("地支本气暗合。");
    }
    //见家长分数，年柱纳音与对方日柱纳音，生则加 + 5，克则扣 -5
    //男方年柱纳音五行、日柱纳音五行
    var nanNianWX = NaYinWuXing[ Math.floor( bzppNan.iNianJZ/2 ) ];
    var nanRiWX = NaYinWuXing[ Math.floor( bzppNan.iRiJZ/2 ) ];
    //女方年纳五行和日纳五行
    var nvNianWX = NaYinWuXing[ Math.floor( bzppNv.iNianJZ/2 ) ];
    var nvRiWX = NaYinWuXing[ Math.floor( bzppNv.iRiJZ/2 ) ];
    //见家长的预判，五行
    if( (nanNianWX+2)%5 == nvRiWX
         || (nanNianWX+3)%5 == nvRiWX ) //克
    {
        scoreAll -= 5;
        //alert("男年柱，女日柱，互克");
    }
    else if( (nanNianWX+1)%5 == nvRiWX
         || (nanNianWX+4)%5 == nvRiWX ) //生
    {
        scoreAll += 5;
        //alert("男年柱，女日柱，互生");
    };
    if( (nvNianWX+2)%5 == nanRiWX
         || (nvNianWX+3)%5 == nanRiWX )//克
    {
        scoreAll -= 5;
        //alert("女年柱，男日柱，互克");
    }
    else if( (nvNianWX+1)%5 == nanRiWX
         || (nvNianWX+4)%5 == nanRiWX )//生
    {
        scoreAll += 5;
        //alert("女年柱，男日柱，互生");
    }; 
    
    //上限120
    if( scoreAll > 120 )
    {
        scoreAll = 120;
    };
    //合婚调整为百分制
    scoreAll = scoreAll * 100 / 120.0 ;
    scoreAll = Math.floor( scoreAll + 0.5 ) ;
    //下限 10
    if( scoreAll < 10 )
    {
        scoreAll = 10;
    }    
    //四柱完全相同，无缘，写个4分用于返回值判断
    if( 1 == fourSame )
    {
        scoreAll = 4;
    }
    //返回
    return scoreAll;
}

//////////////////////////////////
//ysHeHun.score     综合加权分
//ysHeHun.scoreAVG     运势匹配60年平均分
//ysHeHun.startYear 起算年份，共计算60年运势合婚
//ysHeHun.nanArray[60]  起算年份开始，60年男命元神分值
//ysHeHun.nvArray[60]   起算年份开始，60年女命元神分值
//ysHeHun.tongArray[60] 起算年份开始，二人相同积分数，abs正数
//ysHeHun.chaArray[60]  起算年份开始，二人差值积分数，abs正数
//ysHeHun.nanYS   男命元神分值
//ysHeHun.nvYS    女命元神分值
//计算运势合婚
function CalcYunShiHeHunObject(bzppNan, bzppNv)
{
    var ysHeHun = new Object();
    ysHeHun.score = 0;  //加权综合分
    ysHeHun.scoreAVG = 0;
    ysHeHun.startYear = 0;
    ysHeHun.nanArray = new Array(60);
    ysHeHun.nvArray = new Array(60);
    ysHeHun.tongArray = new Array(60);
    ysHeHun.chaArray = new Array(60);
    ysHeHun.nanYS = 0;
    ysHeHun.nvYS = 0;
    //男方出生时间
    var nanDD = JD.DD( bzppNan.JDBirth );
    var nanBirthYear = nanDD.Y; //男方生年
    //女方出生时间
    var nvDD = JD.DD( bzppNv.JDBirth );
    var nvBirthYear = nvDD.Y;   //女方生年

    //判断谁的年份小，从出生年份大（岁数小）的20周岁开始计算运势合婚指数
    //岁数小的 20岁到80岁，60年时间
    if( nanBirthYear <= nvBirthYear )
    {
        ysHeHun.startYear = nvBirthYear + 20;  //男方先出生，从女方20岁开始
    }
    else
    {
        ysHeHun.startYear = nanBirthYear + 20; //女方先出生，从男方20岁开始
    }
    //男方元神分值对象
    var nanYuanShen = CalcYuanShenQiangDuObject(bzppNan);
    //女方元神分值对象
    var nvYuanShen = CalcYuanShenQiangDuObject(bzppNv);
    //保存两个元神分值
    ysHeHun.nanYS = nanYuanShen.yuanshen;
    ysHeHun.nvYS = nvYuanShen.yuanshen;
    //计算60年
    var sumTong = 0;    //同积分的求和
    var sumCha = 0;     //差积分的求和
    ////////////////////////////////////
    //元神分值 10 到 100，岁运对人影响程序 +-20 到 +-40
    //计算影响程度
    var multiNan = 20 + ((100-nanYuanShen.yuanshen)/90.0) * 20;
    //计算倍率 +-5 放大到 +-40
    multiNan = 2 * multiNan / 10.0;    //岁运打分是+-5分制，下面计算时乘以倍率，得到实际影响分数
    //女方的
    var multiNv = 20 + ((100-nvYuanShen.yuanshen)/90.0) * 20;
    //计算倍率 +-5 放大到 +-40
    multiNv = 2 * multiNv / 10.0;    //岁运打分是+-5分制，下面计算时乘以倍率，得到实际影响分数
    //开始计算
    for(var i=0; i<60; i++)
    {
        //当前年份的数字
        var curYear = ysHeHun.startYear + i;
        //当前年份甲子
        var curYearJZ = GetNianJiaZiShu(curYear);
        
        //男方大运甲子数
        var nanDYJZ = GetGaoJiDaYunJZ( curYear, nanBirthYear, 
            bzppNan.iYueJZ, bzppNan.isNiDaYun );
        //女方大运甲子数
        var nvDYJZ = GetGaoJiDaYunJZ( curYear, nvBirthYear,
            bzppNv.iYueJZ, bzppNv.isNiDaYun );
        //当前男方元神分值
        var curNan = nanYuanShen.yuanshen + 
                multiNan * ( 0.7* GetSuiYunDanYS(nanDYJZ, bzppNan.iRiJZ) + 0.3* GetSuiYunDanYS(curYearJZ, bzppNan.iRiJZ) );
        curNan = Math.floor( curNan+0.5 );   //四舍五入
        //当前女方元神分值
        var curNv = nvYuanShen.yuanshen +
                multiNv * ( 0.7* GetSuiYunDanYS(nvDYJZ, bzppNv.iRiJZ) + 0.3 * GetSuiYunDanYS(curYearJZ, bzppNv.iRiJZ) );
        curNv = Math.floor( curNv+0.5 );   //四舍五入
        ///////////////////////////////
        //限定元神分值在 -30 到 120
        if( curNan > 120 ) curNan = 120;
        if( curNan < -30 ) curNan = -30;
        if( curNv > 120 ) curNv = 120;
        if( curNv < -30 ) curNv = -30;
        //保存到数组
        ysHeHun.nanArray[i] = curNan;
        ysHeHun.nvArray[i] = curNv;
        //计算当前的相同指数和差值指数
        var curTong = 0;
        var curCha = 0;
        //判断正负
        if( (curNan>=0) && (curNv>=0) )//都是正数
        {
            curTong = Math.min( curNan, curNv );    //较小正数是同
            curCha = Math.abs( curNan - curNv );    //差值
        }
        else if(  (curNan<0) && (curNv<0)  ) //都是负数
        {
            curTong =  Math.abs(Math.max( curNan, curNv )); //较大负数，靠近坐标轴的数
            curCha = Math.abs( curNan - curNv );    //差值            
        }
        else//一个正数、一个负数
        {
            curTong = 0;    //正负之间没共同区间
            curCha = Math.abs( curNan - curNv );    //差值   
        }
        //保存到数组
        ysHeHun.tongArray[i] = curTong;
        ysHeHun.chaArray[i] = curCha;
        //求和
        sumTong += curTong;
        sumCha += curCha;
        //本年完毕，计算下一年
        //console.log( "流年 " + JiaZi[curYearJZ] + " 男运 " + JiaZi[nanDYJZ] + " 女运 " + JiaZi[nvDYJZ]);
    }//end for
    
    //两个求和，如果出现意外都小于1，令等于1，防止除0的情况出现
    if( sumTong < 1 )
    {
        sumTong = 1;
    }
    if( sumCha < 1 )
    {
        sumCha = 1;
    }
    //计算运势合婚平均值 0 到 100 分
    var sc = 100.0 * sumTong / ( sumTong + sumCha );
    ysHeHun.scoreAVG = Math.floor( sc + 0.5 );    
    //计算加权匹配分
    ysHeHun.score = CalcJiaQuanYunShiScore(ysHeHun.tongArray, ysHeHun.chaArray);
    //返回对象
    return ysHeHun;
}

//根据当前流年，出生流年，八字月柱甲子、大运顺逆，求出当前的大运甲子数
function GetGaoJiDaYunJZ(curYear, birthYear, iYueJZ, isNiDaYun)
{
    //年份差值
    var delta = curYear - birthYear;
    //大运步数
    var steps = Math.floor(delta/12);
    steps = steps%5;
    //计算当前流年对应的大运
    var curDaYunJZ = 0;
    if( 0 == isNiDaYun )//顺运
    {
        curDaYunJZ = (iYueJZ + 1 + steps)%60;
    }
    else//逆大运
    {
        curDaYunJZ = (iYueJZ - 1 - steps + 60)%60;
    }
    //返回
    return curDaYunJZ;
}
//////////////////////////////////
//ysHeHun.score     综合运势分数
//ysHeHun.startYear 起算年份，共计算60年运势合婚
//ysHeHun.nanArray[60]  起算年份开始，60年男命元神分值
//ysHeHun.nvArray[60]   起算年份开始，60年女命元神分值
//ysHeHun.tongArray[60] 起算年份开始，二人相同积分数，abs正数
//ysHeHun.chaArray[60]  起算年份开始，二人差值积分数，abs正数
//ysHeHun.nanYS   男命元神分值
//ysHeHun.nvYS    女命元神分值
//根据运势合婚对象、画布，进行绘制
function DrawYunShiHeHun(ysHeHun, painter)
{
    //尺寸
    var Width = 640;
    var Height = 600;
    //定义原点
    var originX = 40;//40+ 100年*6步进
    var originY = 480;//上限 120分*4步进
    //步进
    var xStep = 10; //60年的*10像素
    var yStep = 4;
    //相同区间颜色
    var colorTong = "#00FA9A";    //绿色
    //差值区间颜色
    var colorCha  = "#FFC0CB";    //粉色
    //男命线条颜色
    var colorNan = "blue";      //蓝色
    //女命线条颜色
    var colorNv = "fuchsia";    //紫红
    ////////////////////////////////////////////
    //岁运画图
    painter.beginPath();
    painter.strokeStyle = "#FF4500" ;//橙红色
    //画60年
    for(var i=0; i<60; i++)
    {
        var curNan = ysHeHun.nanArray[i];
        var curNv = ysHeHun.nvArray[i];
        var curTong = ysHeHun.tongArray[i]; 
        var curCha  = ysHeHun.chaArray[i];
        //如果都是正数
        if( curNan>=0 && curNv>=0 )
        {
            //画相同区间的矩形
            painter.fillStyle = colorTong;
            painter.fillRect(originX + i*xStep, (120-curTong)*yStep, xStep, curTong*yStep );
            //画差异段的矩形框
            painter.fillStyle = colorCha;
            painter.fillRect(originX + i*xStep, (120-curTong-curCha)*yStep, xStep, curCha*yStep ); 
            painter.strokeRect(originX + i*xStep, (120-curTong-curCha)*yStep, xStep, curCha*yStep );       
        }
        else if( curNan<0 && curNv<0 )
        {
            //都是负数
            //画同区间
            painter.fillStyle = colorTong;
            painter.fillRect(originX + i*xStep, originY, xStep, curTong*yStep );
            //画差异段的矩形框
            painter.fillStyle = colorCha;
            painter.fillRect(originX + i*xStep, originY + curTong*yStep, xStep, curCha*yStep );
            painter.strokeRect(originX + i*xStep, originY + curTong*yStep, xStep, curCha*yStep );
        }
        else
        {
            //一个正数，一个负数
            //只有差异的画，从大的分值往下画
            var curMax = Math.max( curNan, curNv );
            //画差值区间，画差异段的矩形框
            painter.fillStyle = colorCha;
            painter.fillRect(originX + i*xStep, (120-curMax)*yStep, xStep, curCha*yStep );
            painter.strokeRect(originX + i*xStep, (120-curMax)*yStep, xStep, curCha*yStep );
        }
    }//end for
    //绘制
    painter.stroke();
    //画流年元神曲线
    painter.beginPath();
    painter.lineWidth = 3;
    painter.strokeStyle = colorNan; //男命
    for(var i=1; i<60; i++)
    {            
        painter.moveTo( originX+ i*xStep - xStep/2, (120 - ysHeHun.nanArray[i-1])*yStep );
        painter.lineTo( originX+ i*xStep + xStep/2, (120 - ysHeHun.nanArray[i])*yStep );
    }
    painter.stroke();
    //女命元神曲线
    painter.beginPath();
    painter.lineWidth = 3;
    painter.strokeStyle = colorNv; 
    for(var i=1; i<60; i++)
    {
        painter.moveTo( originX+ i*xStep - xStep/2, (120 - ysHeHun.nvArray[i-1])*yStep );
        painter.lineTo( originX+ i*xStep + xStep/2, (120 - ysHeHun.nvArray[i])*yStep );
    }    
    painter.stroke();
    //////////////////////////////////////////////
    //画坐标轴和刻度
    painter.beginPath();
    painter.lineWidth = 3;
    painter.strokeStyle = "black";
    painter.fillStyle = "black";
    painter.moveTo(0, originY);
    painter.lineTo(Width, originY);
    painter.moveTo(1, 0);
    painter.lineTo(1, Height);
    //Y轴刻度
    for(var k=0; k<=150; k+=10)//-30分到120分，共150分
    {
        painter.moveTo(0, k*yStep);
        painter.lineTo(10, k*yStep);
        //画文字
        painter.fillText( String(120 - k), 14, k*yStep);
    }
    //X轴刻度
    for(var k=0; k<=60; k+=10)
    {
        painter.moveTo( originX + k*xStep, originY );
        painter.lineTo( originX + k*xStep, originY + 12 );
        //画文字
        painter.fillText( String( k+ysHeHun.startYear ), originX + k*xStep, originY + 24 );
    }    
    //图标题文字
    painter.fillText("运势匹配图（缘深缘浅，绿同红异）", Width/2 -100, Height - 12);
    //绘制路径  
    painter.stroke();
    
    //画小刻度
    painter.beginPath();
    painter.lineWidth = 1;
    for(var k=0; k<=60; k+=1)
    {
        painter.moveTo( originX + k*xStep, originY );
        painter.lineTo( originX + k*xStep, originY + 6 );
    }
    painter.stroke();
    //边框
    painter.lineWidth = 1;
    painter.strokeStyle = "green";
    painter.strokeRect(0,0,Width,Height);
}

////////////////////////////////////////////////////
//合婚评语
//参数是男命排盘对象，女命排盘对象，原局纳音合婚分数
function GetHeHunHints(bzppNan, bzppNv, scoreYuanJu)
{
    var strRet = "";
    //男命年柱五行和日柱五行
    var nanNianWX = NaYinWuXing[ Math.floor(bzppNan.iNianJZ/2) ];
    var nanRiWX = NaYinWuXing[ Math.floor(bzppNan.iRiJZ/2) ];
    //女命年柱五行和日柱五行
    var nvNianWX = NaYinWuXing[ Math.floor(bzppNv.iNianJZ/2) ];
    var nvRiWX = NaYinWuXing[ Math.floor(bzppNv.iRiJZ/2) ];
    
    //双方年柱关系
    if( (nanNianWX+2)%5 ==  nvNianWX
            || (nanNianWX+3)%5 ==  nvNianWX )
    {
        strRet += "<li>双方家长可能对婚事不太满意，在家世背景、生活理念、结婚习俗等方面有争议，需要注意处理矛盾。</li>";
    };
    //双方日柱关系
     if( (nanRiWX+2)%5 ==  nvRiWX
            || (nanRiWX+3)%5 ==  nvRiWX )
    {
        strRet += "<li>男女双方相处久了之后可能显现性格爱好、为人处世方面的不协调，感情上或距离上有可能会疏远，要注意沟通和包容。</li>";
    };
    //男年柱见女日柱
    if( (nanNianWX+2)%5 == nvRiWX 
            || (nanNianWX+3)%5 == nvRiWX )
    {
        strRet += "<li>女方见男方家长时，可能互相有些不满意，要注意相处问题。</li>";
    };
    //女年柱见男日柱
    if( (nvNianWX+2)%5 == nanRiWX
            || (nvNianWX+3)%5 == nanRiWX )
    {
        strRet += "<li>男方见女方家长时，可能互相有些不满意，要注意相处问题。</li>";
    }; 
    if( strRet.length < 5 )//没问题
    {
        //如果年日都相同，合婚计算不一样
        if( (bzppNan.iNianJZ != bzppNv.iNianJZ)
                || (bzppNan.iRiJZ != bzppNv.iRiJZ) )//年日不同
        {
            strRet += "<li>双方纳音合婚很好，家庭比较般配，感情和谐，诸事吉利。</li>";
        }
        else
        {
            //年日都相同
            if(scoreYuanJu >= 50)//按照合婚判断
            {
                strRet += "<li>双方纳音合婚较好，家庭比较般配，感情和谐，诸事吉利。</li>";
            }
            else
            {
                strRet += "<li>双方性格不太互补，相处久了可能觉得倦怠而起冲突，要注意化解矛盾。</li>";
            }
        }
    };
    return strRet;
}
//男方或女方的命局信息
function GetMingJuInfo(bzpp)
{
    var strRet = "";
    //性格
    strRet += "<li>" + bzpp.Gender  + "方性格：<br>①" + NaYinXingGe[ Math.floor( bzpp.iRiJZ/2 ) ]
            + "<br>②"
            + NaYinXingGe[ Math.floor( bzpp.iShiJZ/2 ) ]
            + "</li>" ;
    
    //夫妻宫
    //日干五行
    var rgWX = Math.floor( (bzpp.iRiJZ % 10)/2 );
    //日支本气
    var rzBQ = DiZhiCangGan[ (bzpp.iRiJZ % 12) ][0];
    //日支五行
    var rzWX = Math.floor( rzBQ/2 );
    //计算差值
    var delta = (rzWX - rgWX + 5) % 5;
    strRet += "<li>夫妻关系：" + FuQiGong[delta] + "</li>";
    
    //日柱干支冲合的批语
    strRet += GetRiZhuChongHeStr(bzpp);
    
    //年日关系
    //年柱五行和日柱五行
    var nianWX = NaYinWuXing[ Math.floor(bzpp.iNianJZ/2) ];
    var riWX = NaYinWuXing[ Math.floor(bzpp.iRiJZ/2) ];
    if( "女" ==  bzpp.Gender )
    {
        //女命
        if( (nianWX+2)%5 == riWX
                || (nianWX+3)%5 == riWX)
        {
            strRet += "<li>与父母关系：女主命局有离乡之相，与父母感情上或距离上疏远，小俩口和女方父母不太亲近，要注意相处问题。</li>";
        }
        else
        {
            strRet += "<li>与父母关系：女主与父母在感情上或距离上亲近，小俩口和女方父母相处比较和谐。</li>";
        }
    }
    else
    {
        //男命
        if( (nianWX+2)%5 == riWX
                || (nianWX+3)%5 == riWX)
        {
            strRet += "<li>与父母关系：男主命局有离乡之相，与父母感情上或距离上疏远，小俩口和男方父母不太亲近，要注意婆媳问题。</li>";
        }
        else
        {
            strRet += "<li>与父母关系：男主与父母在感情上或距离上亲近，小俩口和男方父母相处比较和谐。</li>";
        }
    }
    
    //日时回头克判断
    var shiWX = NaYinWuXing[ Math.floor(bzpp.iShiJZ/2) ];
    if( (riWX+3)%5 == shiWX )//日时回头克
    {
        var strTemp = "<li>存在日时回头克：" + bzpp.Gender + "主" + HuiTouKeZai[riWX] 
                + "31至45岁之间应灾，需要特别小心。另外可能婚姻不顺或晚婚。" + "</li>" ;
        strRet += GetBoldText( GetRedText( strTemp ) );
    }
    
    return strRet;
}

//回头克应灾
var HuiTouKeZai = 
[
    "有较大意外灾害，要注意安全保险。",//0木
    "有自残倾向，精神不好。",//1火
    "有消极悲观的自裁倾向。",//2土
    "有较大伤灾，身体不佳。",//3金
    "有较大病灾，注意胃部和心脏养护。"//4水
];
//
//夫妻宫评语，日支五行减去天干五行
var FuQiGong = 
[
//0 同我，如 戊戌
"比翼双飞类型。命主和配偶通常具有共同的爱好、理念，性格和习惯也多有共同点，感情比较和谐，容易互相理解。",
//1 我生 如 甲午
"相亲相爱类型。命主对配偶非常好，尽心尽力包容多，通常命主对配偶乐意付出而不计回报。建议作为的配偶一方要多知足。",
//2 我克 如 乙未
"欢喜冤家类型。互相小打小闹比较多，经常床头打架床尾和。命主对配偶管得比较多，命主有些挑剔、具有山大王/女王范儿。建议命主要多体贴配偶才好。",
//3 克我 如 丙子
"欢喜冤家类型。互相小打小闹比较多，经常床头打架床尾和。命主被配偶管得比较严，配偶有些挑剔、具有山大王/女王范儿。建议配偶要多体贴命主才好。",
//4 生我 如 辛丑
"相亲相爱类型。配偶对命主非常好，体贴关爱包容多，通常配偶对命主乐意付出而不计回报。建议作为命主的一方要多知足。"
];
//30纳音的性格
var NaYinXingGe = 
[
    "为人爱变好动，职业也容易变化，喜欢新鲜事物，不喜欢重复无聊的事。",	//海中金
    "为人喜欢纠结，想事多但很难拿定主意，比较被动，习惯安定的生活。",	//炉中火
    "为人非常爱面子，重视交际圈，人缘较好。",	//大林木
    "路旁土心宽，做事比较有章法，遇事通常能应付自如，天塌下来都还能爱干嘛干嘛。",	//路旁土
    "争强好胜、好斗。通常是朋友圈或事业圈里的头头。",	//剑风金
    "小脑发达，学技术快，动手能力超强，通常都有一技之长。不过本事大，脾气也大。",	//山头火
    "爱奔走，不爱安定在家的生活。洞下水做事比较有自信，也容易骄傲自大。",	//洞下水
    "心中非常念家，老想结婚的事也喜欢结婚成家。有能力的话，多成几个家也是正常的。",	//城墙土
    "比较娇贵，生活比较讲究，爱财也很爱家。",	//白腊金
    "容易想入非非，比较自我，喜欢挑战新行业，通常不听劝、不好管束。",	//杨柳木
    "爱家，心细，能察觉到事情蛛丝马迹，有侦探潜质，但疑心重重，好猜忌。",	//泉中水
    "爱家，以家为重，能识大体，知错能改。看重物质和不动产，也容易嫌贫爱富。",	//屋上土
    "为人爱冒险有魄力，脾气不好，不稳定，大穷大富的多。",	//霹雷火
    "热衷事业，喜欢吹牛显摆，卖弄本事。",	//松柏木
    "易动心，感情相当丰富，容易迷失在情场。",	//长流水

    "性格比较好强、急躁而没什么主见，喜欢纠结、黏人，做事有死缠烂打倾向。",	//沙中金
    "爱争高低，不服软，外柔内刚，擅长明争暗斗。",	//山下火
    "聪明理智，八面玲珑，会讨好人，也招人喜欢，人缘不错。",	//平地木
    "喜欢复古怀旧风，遇事有自己的想法和思维方式，并且一以贯之，爱家爱孩子，但也比较顽固古板。",	//壁上土
    "爱情观很多，也喜欢恋爱和寻找刺激的感觉。脾气怪异难以捉摸，不喜欢被别人摸透。",	//金箔金
    "喜欢生闷气，闹无名火，经常熬夜，夜里比较精神，白天容易萎靡。",	//覆灯火
    "天河水爱求人办事，自己不爱办事，自理能力差。天河水通常没什么归属感，容易感到落寞孤寂。",	//天河水
    "心胸宽大，通常心态较好，不爱生气，有宽厚长者风范。",	//大泽土
    "对吃穿衣着比较讲究，生活比较有品位，喜欢找乐子寻开心，天生乐天派。",	//钗钏金
    "桑木爱家但也好动，兴趣爱好多，通常比较有志向，但也有些不切实际的想法。",	//桑松木
    "通常爱子女，心细如丝，留恋过去，怀念古典，但是心眼也比较小，某些事情记得特别清楚。",	//大溪水
    "喜欢逞强不服输，就算顶不住也要死撑的类型。内心强大，但可能由于客观条件受限而难发挥。这类人通常利配偶、利家人。",	//沙中土
    "脾气不好，情绪不稳，其想法对常人来说难以捉摸，但比较爱家。天上火通常有慢性疾病缠身，在后半生显现，病说大不大，说小不小，就是难受。",	//天上火
    "为人自恋，喜欢当自己是世界的中心，经常当自己是皇帝/女王。大运流年遇到辛，自恋更凸显。",	//石榴木
    "通常粗心大意，自我主义，只管自己想法，容易脱离实际。现实中通常难以实现其想法，容易出现婚姻不顺或离婚。"	//大海水
];

//头胎孩子预估，返回值"儿子"或"女儿"
function GetTouTaiString(bzppNan, bzppNv)
{
    var ttGender = "";
    //男方日时的阴阳计数和女方日时的阴阳计数
    var sumNan = 0;
    var sumNv = 0;
    //计算男命日柱和时柱五行
    var nanRiWX = NaYinWuXing[ Math.floor(bzppNan.iRiJZ/2) ];
    var nanShiWX = NaYinWuXing[ Math.floor(bzppNan.iShiJZ/2) ];
    //女命日柱和时柱五行
    var nvRiWX = NaYinWuXing[ Math.floor(bzppNv.iRiJZ/2) ];
    var nvShiWX = NaYinWuXing[ Math.floor(bzppNv.iShiJZ/2) ];
    //判断日时是否五行相同，五行相同则 sum 为0，代表阴
    //计算男和
    if( nanRiWX === nanShiWX )
    {
        sumNan = 0; //阴
    }
    else
    {
        //甲子序从0开始，加1，把甲子变成从1开始计数，单数为阳
        sumNan = (bzppNan.iRiJZ + 1)%2 + (bzppNan.iShiJZ + 1)%2;
        sumNan = sumNan % 2;    //0是阴，1是阳
    }
    //计算女和
    if( nvRiWX === nvShiWX )
    {
        sumNv = 0;  //阴
    }
    else
    {
        sumNv = (bzppNv.iRiJZ + 1)%2 + (bzppNv.iShiJZ + 1)%2;
        sumNv = sumNv % 2;  //0是阴，1是阳
    }
    //计算总和
    var sumAll = (sumNan + sumNv) % 2;
    //性别
    if( 1 === sumAll )
    {
        ttGender = "儿子";
    }
    else
    {
        ttGender = "女儿";
    }
    //返回
    return ttGender;
}

/*
旧版运势匹配没有加权，所有流年权重一样，男命四丁未和女命四壬寅的合婚
纳音匹配度：101 极佳
运势匹配度：91  极佳
婚配综合分：96  极佳

再举一例
出生公历：1984年8月11日20时0分， 周六
甲子 壬申 丁丑 庚戌
出生公历：1992年1月27日2时0分， 周一
辛未 辛丑 壬寅 辛丑
******************************
纳音匹配度：101	极佳
运势匹配度：92	极佳
婚配综合分：97	极佳
******************************
 *  运势匹配的92分是事实上的满分，到不了100分，需要调整
加权方法，60年分5块，12年一段，分别加权，合计110%，稍微放大一下，把满分顶到100
20-31   0.35
32-43   0.35
44-55   0.20
56-67   0.12
68-79   0.08
 */
//计算加权后的运势匹配分
function CalcJiaQuanYunShiScore(tongArray, chaArray)
{
    var scoreRet = 0; //返回的加权分值
    //分为五段
    var Weight = [0.35, 0.35, 0.20, 0.12, 0.08];
    var arrayScores = new Array(5);
    //分为五段计算
    var curSumTong = 0;
    var curSumCha = 0;
    for(var i=0; i<5; i++)
    {
        //当前12年的总同值，总差值
        curSumTong = 0;
        curSumCha = 0;
        for(var j=0; j<12; j++)
        {
            //叠加
            curSumTong += tongArray[i*12 + j];
            curSumCha += chaArray[i*12 + j];
        }
        //计算当前12年内匹配分值
        arrayScores[i] = 100 * curSumTong / (curSumTong +  curSumCha + 0.0001 ); //分母加小数，防止除0
        //计算加权分值
        scoreRet += (arrayScores[i] * Weight[i]);
    }
    //四舍五入
    scoreRet = Math.floor( scoreRet + 0.5 );
    //超100的按100计算
    if( scoreRet > 100 )
    {
        scoreRet = 100;
    }
    
    //返回
    return scoreRet;
}

//根据八字排盘，统计天干和地支数目
function CalcGanZhiCount(bzpp)
{
    //返回计数对象
    var gzCount = new Object();
    gzCount.ganArray = new Array(12);   //天干计数数组，末尾两个不用
    gzCount.zhiArray = new Array(12);   //地支计数数组
    for(var i=0; i<12; i++)//都初始化为0
    {
        gzCount.ganArray[i] = 0;
        gzCount.zhiArray[i] = 0;
    }
    //四个天干计数
    gzCount.ganNian = bzpp.iNianJZ % 10;
    gzCount.ganArray[ gzCount.ganNian ] += 1;
    gzCount.ganYue = bzpp.iYueJZ % 10;
    gzCount.ganArray[ gzCount.ganYue ] += 1;
    gzCount.ganRi = bzpp.iRiJZ % 10;
    gzCount.ganArray[ gzCount.ganRi ] += 1;
    gzCount.ganShi = bzpp.iShiJZ % 10;
    gzCount.ganArray[ gzCount.ganShi ] += 1;
    //四个地支计数
    gzCount.zhiNian = bzpp.iNianJZ % 12;
    gzCount.zhiArray[ gzCount.zhiNian ] += 1;
    gzCount.zhiYue = bzpp.iYueJZ % 12;
    gzCount.zhiArray[ gzCount.zhiYue ] += 1;
    gzCount.zhiRi = bzpp.iRiJZ % 12;
    gzCount.zhiArray[ gzCount.zhiRi ] += 1;
    gzCount.zhiShi = bzpp.iShiJZ % 12;
    gzCount.zhiArray[ gzCount.zhiShi ] += 1;
    //返回计数
    return gzCount;
}
//获取日柱干支冲合的批语
function GetRiZhuChongHeStr(bzpp)
{
    //结果字符串
    var strRet = "";
    //计算干支计数
    var gzCount = CalcGanZhiCount(bzpp);
    //日支六冲
    var riZhi = gzCount.zhiRi;
    var rzLiuChong = (riZhi+6) % 12;
    if( gzCount.zhiArray[ rzLiuChong ] > 0 )
    {
        //存在六冲位地支
        strRet += "<li>日支遇冲：需要注意因六亲琐事与配偶产生的分歧、争吵，缓和家庭矛盾，以免影响婚姻质量。</li>";
    }
    //日支六合
    var rzLiuHe = DZLiuHe[ riZhi ];
    if( gzCount.zhiArray[ rzLiuHe ] > 0 )
    {
        strRet += "<li>日支六合：需要注意三角恋问题，妥善处理感情纠纷。</li>";
    }
    //日柱天干
    var riGan = gzCount.ganRi;
    //日干五合
    var rgWuHe = (riGan+5) % 10;
    if( gzCount.ganArray[ rgWuHe ] > 0 )
    {
        //存在日干五合
        //判断是否争合，日干有两个以上，或五合的天干两个以上
        if( (gzCount.ganArray[ rgWuHe ] >= 2)
                || (gzCount.ganArray[riGan] >= 2) )
        {
            //存在争合
            strRet += "<li>日干争合：需要注意三角恋问题，妥善处理感情纠纷。</li>";
        }
        else//没有争合，早恋早婚
        {
            //正常五合
            strRet += "<li>日干五合：有早恋早婚倾向。</li>";
        }
    }
    //送两个符法，申子辰家和，甲子辰孝顺
    if(  ( gzCount.zhiArray[0]>0 )
            && ( gzCount.zhiArray[4]>0 )
            && ( gzCount.zhiArray[8]>0 ) )//子 0  辰4   申8
    {
        strRet += "<li>家和符：家庭通常比较和谐美满。</li>";
    }
    if(  ( gzCount.zhiArray[0]>0 )
            && ( gzCount.zhiArray[4]>0 )
            && ( gzCount.ganArray[0]>0 ) )//子 0  辰4   甲0
    {
        strRet += "<li>孝顺符：命主对父母长辈很孝顺。</li>";
    }
    //返回
    return strRet;
}
