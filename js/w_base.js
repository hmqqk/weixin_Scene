/**
 * Created by liuhong on 2017/3/11.
 */
$(document).ready(function(){
    $(".login").click(function () {
        var token1 = "3714861a5b5d78f9bd5d25cb25b371a1357";
        var function1 = "SmartParkLogin";
        var para11 = $(".userName").val();
        var para21 = $(".userPass").val();
        var para31 = "0";
        var para41 = "1";
        var verifycode1 = $.md5(token1 + function1 + para11 + para21 + para31 + para41);
        jQuery.ajax({
            url: "http://www.52uku.net/webservice.asmx/login?jsoncallback=?",
            type: "GET",
            contentType: "application/json",
            data: {
                "token": token1,
                "function": function1,
                "userName": para11,
                "password": para21,
                "para1": para31,
                "para2": para41,
                "verifycode": verifycode1
            },
            dataType: "jsonp",
            jsonp: 'callback',
            jsonpCallback: 'jsonpCallback',
            timeout: 3000,
            success: function (result) {
                if (result.STATUS == "OOOKK") {
                    //alert(result.DATASET+result.STATUS);
                    //alert("what "+result.DATASET[0].Token);
                    getUserInformation(result);
                    sessionStorage.token = result.DATASET[0].Token;
                    sessionStorage.distributorID = result.DATASET[0].DistributorID;
                    //alert(sessionStorage.token);
                    //alert(sessionStorage.distributorID);
                    window.location.href = "w_scene.html";
                    alert(2);
                }
            },
            error: function (err) {
                alert("登录失败，请重新登录");
            }

        });

    })
    $(".myOrders").click(function(){
        window.location.href="w_order.html";
    });

    alert($(".ticketEle").attr("value"));
    alert(editID);
    $(".ticketEle").attr("value",editID);


});
