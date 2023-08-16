//龙神决不需要时间，这里纯粹是计时用的
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
 //设置七个按钮、49个卡牌序号等
 var gArrButtons = new Array(8);    //7个抽牌按钮加1个排盘按钮
 var gArrCardNumbers = new Array(49);//保存0到48 ，共49张序号
 var gArrChosen7Cards = new Array(7); //抽取的7张卡牌序号
 function InitButtons()
 {
     //保存按钮列表
     for(var i=0; i<3; i++)
     {
        var curID = "btnLSJ" + String(i);
        gArrButtons[i] = document.getElementById(curID); //7个抽牌按钮
        gArrChosen7Cards[i] = -1;   //没选牌时都是 -1 
     }
     //最后是排盘按钮
     gArrButtons[3] = document.getElementById("btnPaiPan");
     //49个序号
     for(var i=0; i<49; i++)
     {
         gArrCardNumbers[i] = i;    //49个卡牌序号
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
 function OnChoosingCard(objButton, nPic) {
    nPic = Number(nPic); // 转为数字
    // 随机生成卡牌序号
    var ix = GetRandomInt(49 - nPic); // 选中的序号
  
    // 保存动态数组中选出的元素
    gArrChosen7Cards[nPic] = gArrCardNumbers[ix];
    // 从动态数组剔除该元素，这样不会重复抽牌
    gArrCardNumbers.splice(ix, 1); // 删除第 ix 个元素
  
    // 获取图片对象
    var objPic = document.getElementById("pic" + String(nPic));
    // 生成图片文件名
    ix = gArrChosen7Cards[nPic]; // 使用动态数组中选取元素保存的序号
    var strPicSrc = "";
    if (ix < 10) {
      strPicSrc = "tarot/0" + String(ix) + ".png"; // 凑两位数
    } else {
      strPicSrc = "tarot/" + String(ix) + ".png";
    }
    // 设置图片源文件
    objPic.src = strPicSrc;
  
    // 随机旋转180°
    var rotation = Math.random() >= 0.5 ? 180 : 0;
    objPic.style.transform = "rotate(" + rotation + "deg)";
  
    // 设置按钮文本
    objButton.value = ArrayCiShuStrs[nPic] + Array78CardsNames[ix];
  
    // 禁用本按钮
    objButton.disabled = true;
    // 启用下一个抽牌按钮
    gArrButtons[nPic + 1].disabled = false;
  }
 
 //次数汉字字符串
 var ArrayCiShuStrs = [
   "过去：",  "现在：", "未来："
   
 ];
 
/////////////////////////////////////////////////////////////////
//整个排盘文本
var AllText = document.getElementById("AllText");
//排盘
function CalcLongShenPanPaiZX()
{
    //软件抽取的卡牌没有重复的，抽一张删一张，本按钮启用时正好抽完7张
    //排盘文本
    AllText.innerHTML = GetLongShenPanPaiHTML(gArrChosen7Cards);
    
    //执行自动复制到剪贴板，IE9和Chrome支持，火狐测试不行。
    document.execCommand("selectAll");  //全选
    document.execCommand("copy");       //复制
    document.execCommand("unselect");   //不选中 
}
//生成时间字符串
function GetGGTimeStr()
{
    var strRet = "起决时间：公历";
    strRet += String( sGGYear.value ) + "年"
        + String( sGGMonth.value ) + "月"
        + String( sGGDay.value ) + "日"
        + String( sGGHour.value ) + "时"
        + String( sGGMinute.value ) + "分";
    //返回
    return strRet;
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
    //起决方式
    strRet += "起决方式：在线抽电子牌（洗牌伪随机，抽牌真随机）<br>";
    //决主性别、生年
    strTemp = "决主性别：" + document.getElementById("sGender").value
        + "， 生年：" + sShengNian.options[sShengNian.selectedIndex].text;
    strRet += strTemp + "<br>";  
    //时间
    strRet += GetGGTimeStr() + "<br>";
    //开始放决名和描述
    strRet += "龙神决顺序和描述：<br>";
    for(var i=0; i<3; i++)
    {
        strTemp =  PackCardName(String(i+1) + "、" + Array78CardsNames[ arrJue[i] ], i) 
            + "：" + Array49CardsAcient[ arrJue[i] ] + "<br>"
            + "释义：" + Array49CardsMordern[ arrJue[i] ] + "<br>"; 
       
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

//49个卡牌名
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


//太伤、太幻、太文 PS 一下文字
//49个古文描述
var Array49CardsAcient = [
"万物始于无，道为天之母。代表事情发展之前的状态，元始之相。",// 太一
"万物开始孕育之相，事物发展之开始，天地产生之境相由此而生。",// 太明
"万物开始变化之相，五行的产生与元素的形成阶段，天地成型中。",// 太伤 
"五行相克相生相逝相伤，世界万相万物越见丰富多彩与多样化。", //  太劫
"五行复杂化，天地复合化、多样化，人世周天循环化、复杂化、情理化。",// 太复 
"事物按着原来的样子发展，万物也按着不变的变化发展、进化中。", //太原
"世间万物的巨大变化，万物灭绝而又重生之灾难，变化的初始中。", //太丁

"世间万物伤变后的修复，万物休养生息，等待下次的进化与机遇。",//太泽
"万物相关，于我相关，与我有关，天地万物相互再联系进步之相。",//太于
"万物更新，万物繁华，众生之相成。相相生机，万化不离其中之道立。",// 太相
"万相变化中的专一变化，个体而言的变化，是矣万物之定数是也。",//太专
"专一变化的兴旺之相，是为智慧，是为文明，是为吉变中的平和变。",//太兴
"文明信仰的产生，生灵对天地的膜拜 来自内心深处的极端渴望。",// 太天
"群体合作以胜自然，社会的进步形成阶段，代表着团结友爱之道。",//太胜

"群体合理性的分配与公平性的利益划分，文明的平均心理状态之行。",//太式
"进化中长与次，级与别的产生，压迫的形成，理与顺，管与服的产生。",//太量
"文明的进化与延续，兴旺与发达。社会的进一步分化，权利的形成。",//太旺
"君子行其正，有德者让之，礼数之相，君正明以得天地浩然之气。", //太正
"幻者，假象也，迷茫之相。一如非相，趸（dǔn，整个、整批的意思）如天车也。",//太幻
"天下归吾，明查暗讯，不服者皆迂。吾为君，为王，王道查天下之事也。",//太查
"天下以其文，治民以其书，行文以其中平、中顺、中和与严制 相互行也。",//太中

"神其形，高其语，话其言，夸其辞，形而神、话而仙，是为传奇是也之。",//太传
"时代的落寂，底层进化的觉醒，生灵的本能，死亡与重生的征兆之相。",//  太冥
"暴力与反抗的时机，皆天道遂行，遂应变化之道，是为奋起之相也。",//    太遂
"文明的形成延续，习惯的形成，礼节的传承与发展，是为始明之相也。",//  太文
"随势而发，自然之胜，无而有，有而无之，是谓虚一而中，实一而兴也。",//太随
"一而二，二而三，三而万，试问太平论几何，各抒而争，诚而不让之相。",//太问
"论仁演道，各道飞扬，尚武之行，未可识也，是故万相更新，有之新变也。",//太更

"天大地大，博大精深，以容万物、万人、万理，是为包容海山，宽天地也。",//太容
"吸取教训，从严而发，务实而进，再奋斗之相，是为一失更为一得之相。",//  太实
"君子以修德，德高而载万物，教而世之行，行而依其声动言，是为尊重也。",//太帝
"万物承德而新，兴而败，败而兴，实为转换之相，此谓随新而新智而兴。",//  太新
"间者，离也，分离也，对立也，是为阳阴也，故间而离 不出南北东西是也。",//太间
"分而合，语者，谓之文，天享之汇，劝之相，是故和而贵，而心则难长久也。",//太语
"令而强行也，是故制化，求立之功切，然时于过度，终不能成事，急而切之。",//太令

"否极而变，仓皇之相，是故天下乱治，神鬼不生，各有心机，引万千之化也。",//太仓
"乱而求其主也，君子德行俱，故天下归，是为名声，引为万物向阳之相也。",//  太归
"开明也，开明治也，是为日月丽天，照天地万物之相，逢之 危而不危也。",//   太开
"一阳而盛，万阴枯荣，极地之盛，暗藏危也，是为吉后凶，吉中带凶事。", //   太阳
"淹没也，阴出破阳也，是为定数，阳极而得阴也，故他尤胜我 不可争也。",//   太没
"私也，求吾心，不可得也，故以吾以当天下先，不可得道，不足人道，烽乱矣。",//太吾
"利涉五方，天行敬，万民迎，起争而扎乱，万事起缘，是谓行动之相也。", //   太行

"各而有心，心有他心，遂不能集地，故而分，分而散，各沙各盘争其锐。",//  太各
"先以德举，以义容，故而赢之。天下厌乱之心永存，委有君不胜之理也。",//  太先
"君子尚文以服人，章法以回礼数也，是为文来武没之相，治化而教化也。",//  太回
"文轻而力不足也，是为争位，盘龙受困，边缘四不安，何有平安之相存在。",//太位
"边地聚中，未可长久之相，故德而平，天下太平，危机过矣，时机顺也，平。",//太平
"吉者，吉利也，通治也。平而吉，吉而养，故天下苍生滋养之时，谓之盛行。",//太吉
"灵者，非智化，而其诡火也，言必方，言隐秘，终定之事非凶，暗杀机伏也。"// 太灵
];
//49个现代文描述
var Array49CardsMordern = [
    //太一
    "没开始、不可知、隐私、母亲、长辈。如果第一张就抽到它了，代表八字没一撇；如果第七张抽到就代表这事最终会黄（只限这一件事的发展，与其他事无关）。",
    //太明
    "起源、良好、明了、光明、义气、阳阴。好的开始，境相，产生，恋爱的好印象，事业的起步，财钱的元神。",
    //太伤
    "产生的变化，吉带凶，具体情况根据事情而定：看感情完蛋；看事业吉中有凶；看病情会变重。",
    //太劫
    "磨合阶段，比如感情磨合、事业小波动，看健康是先凶后吉。",
    //太复
    "代表小三、小人、复杂化、搞事情。",
    //太原
    "代表和好、回归、平顺、男人、原配、原友等。",
    //太丁
    "代表灾难、分裂，吵架、破败等。",
    
    //太泽
    "伤害后的修复，抽中此牌代表着冷战、理解、福泽、机遇、官司答辩等。如果看事业代表机遇，看官司代表着争执中，看感情代表冷战。",
    //太于
    "代表财运、爱我、进步、事业前进，新情人、新目标、妾或新备胎，不管是啥，好像都是好事。",
    //太相
    "繁华、进取、新的机遇、天时，老婆或相公出现，利我之事。",
    //太专
    "代表必然中的偶然、不可预测、不可知、秘密、贵人、不知道、吉凶难料。",
    //太兴
    "代表专一、真爱、智慧、谋士、利我、凶后的吉。",
    //太天
    "希望、渴望、神灵、鬼、欲望、膜拜、宗教、求人――全是魔性。",
    //太胜
    "合作，合好，团结，奋斗，怀孕，病重，生病不要抽到这张就好，其他事情基本是好的。",
    
    //太式
    "分配，分脏，提成，平均，工资，老婆，讨文，文书。就是个公平之相，要是问三角关系就是公平共存。",
    //太量
    "级别，领导，上司，长辈，官方，药品，压力，压迫。问感情最好不要抽到，当然还得看最后张牌。",
    //太旺
    "权力，权益，进步，军队，警察，土匪，流氓，武力。",
    //太正
    "君子，王，神，正气，牛比，忠诚，天气，婚礼，葬礼，仪式、礼数。",
    //太幻
    "代表梦想，幻觉，意淫，胡扯，骗子，小人，太监，奸臣，奸夫，淫妇，盗贼。",
    //太查
    "衙门，官司，查询，证据，印，秘密，欲望，性器。",
    //太中
    "行文、礼法、法律、不公平证据、秘信、偏执、广告。注意，这个一切全是不公平，是制约。",
    
    //太传
    "浮夸、媒人、名人、戏子、吹牛比、政府、官员、影帝，太传是造圣的意思，其实都是忽悠。",
    //太冥
    "觉醒、反抗、心死、破灭的梦想、重生之前、本能。",
    //太遂
    "暴力、奋起、起义、暴动杀戮、游行，分手、打架，争峰争斗，占情爱遇此,会以打架分离。",
    //太文
    "暴民不能倡，是故以文治天下，行文平安。代表文明、和气、发福、形成、盛世、礼仪、帅哥、美女、文人。",
    //太随
    "自然、成熟、和尚、道士、占卜、道家、无为，自然成功的意思。意为大家都讲礼了，世界自然就好了。",
    //太问
    "争论、不同观点、不服、理论、教义、邪教、愣头青、腾雄。事业遇太问，麻烦跟上来；感情遇太问，对方不信你；看病遇太问，医生有问题。",
    //太更
    "对立、不让、不容、平恒、相持不下，是为对立之相，你不胜我我不胜你。看感情大忌；看事业对手势均力敌；看病则吉，药病相抵，病让控制住了，是为吉。",
    
    //太容
    "有容大之相，是为气度，包容万千。相亲遇太容，遇大肚或大度对象。寻职遇太容,有好老板。合作遇太容，注意你的财归对方了，大凶。考试遇之糟糕，题目博大精深，肯定考不太好了。病遇太容，溶解病痛之相，小吉。",
    //太实
    "教训、失败后的进取、务实、民工、实干家、农民。考试遇之，有所建树，具体结果还要看抽的后面几张牌。",
    //太帝
    "帝，临天下之相，有德自有行人追。圣人、名师、大师、居士、道德、建树、尊重、高人。求事遇太帝，吉也。何事遇太帝凶呢，某骗子问：这次行骗会让抓不，抽到这张就进监狱了。",
    //太新
    "万物随圣人新而新，兴败转化过程，智慧更新。相亲抽之大吉，有好仔妞。夫妻感情，好吉。事业遇之大吉。生病遇之,病上加新病。考试遇之懵逼，改题了。",
    //太间
    "间，离间。挑事者、间谍、分手、离别、相思、离间、丈母娘，别笑原文就是这样，归在离间者里了。感情抽之，有人挑波关系。朋友抽之分离。问家庭，丈母娘离间。事业问之，换工作，单位有小人。考试遇之，有人作弊。病者抽之，祛病大吉。",
    //太语
    "讨论、合议、商协、会议、合好、口才、公平的谈判。诸事中平，一事除外，占死人鬼怪。",
    //太令
    "强制、制化、抢劫、过度、过分、欺负，不吉之相。",
    
    //太仓
    "仓皇、心机、着急、反复、战乱、兵伐、心怀鬼胎。恋爱遇之，变心之相。占生意合作，失败。生病遇则不治。生仔之事则吉，鬼成人之相也。考试遇之难考好，心太乱。",
    //太归
    "声名、出名、贵人、统一、我胜它、归我、我得。大体是中吉之相。占病大凶，我得病。",
    //太开
    "开明、智商、光大、光明、志士、英雄、智人、风调雨顺。遇之凡事大吉，往好的方面发展。",
    //太阳
    "极盛、旺盛、肾虚、发烧、血热、英雄末路、位列三甲。阳盛为什么是肾虚？极盛则虚。考试遇之前三；英雄打仗遇太阳，挂了；生意大吉；生病大凶。",
    //太没
    "强势女、坟地、寺院、道观、恶妻、淫荡、女小人、妓女。除问神占卜外,一切不吉。占感情是对象被抢。考试逢之名落孙山，当然还要看抽取的后面几张牌才能定结果。",
    //太吾
    "私心，难得到，不可行，不可上，性欲过度，不吉的合作者。问阴宅阳宅风水大吉，风水利我，其余则不吉也。",
    //太行
    "出行、出兵、出发、行动、机不可失、膜拜者、追随者。生病遇之大凶。其他事情如占生意、考试等，要行动起来、主动作为。",
    
    //太各
    "分家、分裂、沙盘、地盘。心怀鬼胎，不团结，分割。考试遇之中平。爱情遇之相互利用。事业遇之强强联手，但不长久。功名遇之不顺。",
    //太先
    "君子以德号天下，故胜。先机、先行、顺天、胜利、升职、晋业，吉。求医则凶，病入先机，难治也。",
    //太回
    "章回、尚文、文化、司仪、婚礼、会议、传播、公告。文事大吉，各事平安，求医平衡。",
    //太位
    "辱没、欺凌、困相、受制、受侵、受辱、被强奸，大部分情况不吉利。但占病遇太位吉，病魔被祛除。",
    //太平
    "平顺、平淡、稳定、顺时、自治、自力更生、平庸的官员、平凡人。考试遇之完蛋，其它则中吉。",
    //太吉
    "吉利、通治、吉人、贵人、滋头、清官、明治、公平师、行头，诸事大吉也。",
    //太灵
    "杀意、死亡、战乱、兵事、灭绝、没有希望、凶人、罪犯、杀人、厉鬼。凡事遇之不利。"
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
//60甲子
var JiaZi  = new Array(
"甲子",
"乙丑",
"丙寅",
"丁卯",
"戊辰",
"己巳",
"庚午",
"辛未",
"壬申",
"癸酉",
"甲戌",
"乙亥",
"丙子",
"丁丑",
"戊寅",
"己卯",
"庚辰",
"辛巳",
"壬午",
"癸未",
"甲申",
"乙酉",
"丙戌",
"丁亥",
"戊子",
"己丑",
"庚寅",
"辛卯",
"壬辰",
"癸巳",
"甲午",
"乙未",
"丙申",
"丁酉",
"戊戌",
"己亥",
"庚子",
"辛丑",
"壬寅",
"癸卯",
"甲辰",
"乙巳",
"丙午",
"丁未",
"戊申",
"己酉",
"庚戌",
"辛亥",
"壬子",
"癸丑",
"甲寅",
"乙卯",
"丙辰",
"丁巳",
"戊午",
"己未",
"庚申",
"辛酉",
"壬戌",
"癸亥"
 );
//快捷函数，根据年数字获取甲子数
function GetNianJiaZiShu(yy)
{
    //1504年在程序有效范围之前
    var iJZ = (yy - 1984 + 6000000) % 60;
    return iJZ;
}
