/**
 * Created by liuhong on 2017/3/11.
 */

/*
 * 这个JS文件是用来连接webservice;
 */
document.write("<script type='text/javascript' src='js/jquery.js'></script>");
document.write("<script type='text/javascript' src='js/jquery.md5.js'></script>");

jQuery(document).ready(function(){
    var token1=sessionStorage.token;
    var para11="SMARTPARKCLIENT";
    var para21=sessionStorage.distributorID;
    var para31="0";
    var para41="1";

    var ticketID=new Array(100);
    var levelCode=new Array(100);
    var ticketTypeName=new Array(100);
    var distributorID=new Array(100);
    var distributorName=new Array(100);
    var printPrice=new Array(100);
    var dealPrice=new Array(100);
    var lowerstPrice=new Array(100);
    var ticketTypeThatName=new Array(100);
    // var contractDescrip=new Array(100);
    var delayHours=new Array(100);
    var beginDate=new Array(100);
    var endDate=new Array(100);
    var ticketGateRelation=new Array(100);
    var demo=new Array(100);
    var toSalerInfo=new Array(100);
    var toTouristInfo=new Array(100);
    var website=new Array(100);
    var TicketTypeIDDistributorLevelCode1=new Array(100);
    var ID;
    var TicketTypeIDDistributorLevelCodeInput;
    var Name;
    var touristName;
    var touristTel;
    var touristDate;
    var num;
    var check;

    jQuery.ajax({
        url:"http://www.52uku.net/webservice.asmx/getTicketTypeListForDistributor?jsoncallback=?",
        type:"GET",
        contentType: "application/json",
        data:{
            "token":token1,
            "program":para11,
            "distributorID":para21,
            "identity":para31,
            "promotionflag":para41,
            "verifycode":$.md5(token1+para11+para21+para31+para41)
        },
        dataType: "jsonp",
        jsonp:'callback',
        jsonpCallback:'jsonpCallback',
        timeout:3000,
        success: function (result) {
            if(result.STATUS=="OOOKK") {

                for (var i = 0; i < result.DATASET.length; i++) {
                    ticketID[i] = result.DATASET[i].TicketTypeID;
                    levelCode[i] = result.DATASET[i].LevelCode;
                    ticketTypeName[i] = result.DATASET[i].TicketTypeName;
                    distributorID[i] = result.DATASET[i].DistributorID;
                    distributorName[i] = result.DATASET[i].DistributorName;
                    TicketTypeIDDistributorLevelCode1[i] = result.DATASET[i].TicketTypeIDDistributorLevelCode;
                    printPrice[i] = result.DATASET[i].PrintPrice;
                    dealPrice[i] = result.DATASET[i].DealPrice;
                    lowerstPrice[i] = result.DATASET[i].LowestPrice;
                    ticketTypeThatName[i] = result.DATASET[i].TickeTypeThatName;
                    delayHours[i] = result.DATASET[i].DelayHours;
                    beginDate[i] = result.DATASET[i].BeginDate;
                    endDate[i] = result.DATASET[i].EndDate;
                    ticketGateRelation[i] = result.DATASET[i].TicketGateRelation;
                    demo[i] = result.DATASET[i].Demo;
                    toSalerInfo[i] = result.DATASET[i].ToSalerInfo;
                    toTouristInfo[i] = result.DATASET[i].ToTouristInfo;
                    website[i] = result.DATASET[i].Website;//
                }
                for (i = 0; i < result.DATASET.length; i++) {
                    var sceneitems = $("ul");
                    outputData(sceneitems, i);
                }

                function outputData(container, item) {
                    var testStr = "<li class=\"items\">"+
                        "<div class=\"ticketName\">"+
                        "<span>"+ ticketTypeName[item] +"</span>"+
                        "<span class=\"ticketID\">"+ticketID[item]+"</span>"+
                        "</div>"+
                        "<p class=\"ticketDesp\">需在" + beginDate[item] + "至" + endDate[item] + "期间完成使用</p>"+
                        "<p class=\"ticketPrice\">"+
                        "<span class=\"realPrice\">￥" + dealPrice[item] + "</span>"+
                        "<span class=\"originPrice\">门市价:￥" + printPrice[item] + "</span>"+
                        "<button class=\"buttonSettings buy\">购买</button>"+
                        "</p>"+
                        "</li>";
                    container.append(testStr);
                }





                var aBuy = $(".buy");

                /*
                 $(".buy").click(function(){
                 alert(1);
                 if($(".shopMsg").attr("display")=="block"){
                 $(".shopMsg").attr("display","none");
                 $(this).parent(".sceneDMsg").siblings(".shopMsg");
                 }
                 else
                 $(this).parent(".sceneDMsg").siblings(".shopMsg");

                 });
                 */
                $(".touristDate").live("click",function(){
                    setday(this);
                });

                var str2="<div class=\"shopMsg\">"+
                    "<div class=\"ticketMsg\">"+
                    "<span>游客名</span>"+
                    "<input type=\"text\" class=\"basicMsg touristName\" value=\"\">"+
                    "</div>"+
                    "<div class=\"ticketMsg\">"+
                    "<span>电话</span>"+
                    "<input type=\"text\" class=\"basicMsg touristPhone\" value=\"\">"+
                    "</div>"+
                    "<div class=\"ticketMsg\">"+
                    "<span>游玩日期</span>"+
                    "<input type=\"text\" class=\"basicMsg touristDate\" value=\"\">"+
                    "</div>"+
                    "<div class=\"ticketMsg chooseMsg\">"+
                    "<span>短信通知</span>"+
                    "<span class=\"changeMun\">"+
                    "<label>是</label>"+
                    "<input id=\"yes\" type=\"radio\" checked=\"checked\" name=\"choice\">"+
                    "<label>否</label>"+
                    "<input id=\"no\" type=\"radio\" name=\"choice\">"+
                    "</div>"+
                    "</span>"+
                    "<div class=\"ticketMsg\">"+
                    "<span>票数</span>"+
                    "<a href=\"javascript:void(0)\" class=\"sub\">-</a>"+
                    "<input type=\"text\" value=\"1\" class=\"numbers\">"+
                    "<a href=\"javascript:void(0)\" class=\"add\">+</a>"+
                    "</div>"+
                    "<button value=\"\" class=\"orderSure\">确定</button>"+
                    "<button value=\"\" class=\"orderCancle\">取消</button>"+
                    "</div>"+
                    "</div>";

                var container=$(".sceneitems");
                container.append(str2);
                for (i = 0; i < aBuy.length; i++) {

                    aBuy[i].index = i;
                    aBuy[i].onclick = function () {

                        ID = ticketID[this.index];
                        alert(ID);
                        TicketTypeIDDistributorLevelCodeInput = TicketTypeIDDistributorLevelCode1[this.index];
                        alert(TicketTypeIDDistributorLevelCodeInput);
                        Name = ticketTypeName[this.index];
                        alert(Name);
                        window.location.href="w_message.html";
                    }
                }


            }

        },

        error:function(err){
            alert("can't get sceneMsg");
        }

    });
    //alert("testing add");

    var sub = $(".sub");
    var add = $(".add");
    add.live("click",function () {
        alert(1);
        var attrNew = parseInt($(this).siblings("input").attr("value")) + 1;
        $(this).siblings("input").attr("value", attrNew);
    });
    sub.live("click",function () {
        var attrNew = parseInt($(this).siblings("input").attr("value")) - 1 <= 0 ? 1 : parseInt($(this).siblings("input").attr("value")) - 1;
        $(this).siblings("input").attr("value", attrNew);
    });

    $(".cancel1").click(function(){
        alert("cancel1");
        window.location.href="w_scene.html";
    });

    $(".sure1").click(function(){
        alert("run .sure1");
        touristName = $(".vistorName").val();
        alert("touristName"+touristName);
        touristTel = $(".vistorPhone").val();
        num = $(".nums").val();
        touristDate = $(".vistorDate").val();
        if($(".sendMsg").attr("checked")==true)
        {
            check="1";
        }
        else
        {
            check="0";
        }
        alert("testing"+check);
        alert("run book");

        book(ID, TicketTypeIDDistributorLevelCodeInput, Name, num, touristName, touristTel, touristDate, check);
    });

})  ;



