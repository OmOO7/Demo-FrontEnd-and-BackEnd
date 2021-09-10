$(document).on('click', '#btnSubmit', function (e) {
    if (IsValid()) {
        var t = new FormData;
        t.append("CHID", $('#hdnCurrencyHedgingID').val()),
        t.append("UserID", $('#ddluser').val()),
            t.append("FromCurrencyCode", $('#ddlfromcurrency').val()),
            t.append("ToCurrencyCode", $('#ddlToCurrency').val()),
        t.append("HedgingRate", $('#txt_hedgingrate').val()),

        $.ajax({
            type: "POST",
            url: "/User/InsUpdCurrencyHedging",
            data: t,
            contentType: !1,
            processData: !1,
            dataType: "json",
            success: function (e) {
                if (null != e && void 0 !== e) {
                    var t = JSON.parse(e);
                    ClearData();
                    RemoveError();
                    Message("success", t.message, "success");
                }
                else {
                    Message("error", "Error in add data", "error")
                }
            },
            error: function (e) {
                window.location = DefaultURL;
            }
        })
    }
    else {
        return false;
    }


});

function IsValid() {
    var status = true;
    if (($("#ddluser").val() == "" || $("#ddluser").val() == "0") && ($("#ddlfromcurrency").val() == "" || $("#ddlfromcurrency").val() == "0") && ($("#ddlToCurrency").val() == "" || $("#ddlToCurrency").val() == "0") && ($("#txt_hedgingrate").val() == "" || $("#txt_hedgingrate").val() == "0")) {
        $("#fguser").addClass("has-error");
        $("#fgFromCurrency").addClass("has-error");
        $("#fgToCurrency").addClass("has-error");
        $("#fghedgingrate").addClass("has-error");
        status = false;
    }
    else if ($("#ddluser").val() == "" || $("#ddluser").val() == "0") {
        $("#fguser").addClass("has-error");
        status = false;
    }
    else if ($("#ddlfromcurrency").val() == "" || $("#ddlfromcurrency").val() == "0") {
        $("#fgFromCurrency").addClass("has-error");
        status = false;
    }
    else if ($("#ddlToCurrency").val() == "" || $("#ddlToCurrency").val() == "0") {
        $("#fgToCurrency").addClass("has-error");
        status = false;
    }
    else if ($("#txt_hedgingrate").val() == "" || $("#txt_hedgingrate").val() == "0") {
        $("#fghedgingrate").addClass("has-error");
        status = false;
    }
    return status;
}

$(document).on('click', '#btnCancel', function (e) {
    RemoveError();
    ClearData();
});

function ClearData() {
    $("#hdnCurrencyHedgingID").val("0");
    $("#ddluser").val("");
    $("#ddlfromcurrency").val("");
    $("#ddlToCurrency").val("");
    $("#txt_hedgingrate").val("");
}

function RemoveError() {
    $("#fguser").removeClass("has-error");
    $("#fgFromCurrency").removeClass("has-error");
    $("#fgToCurrency").removeClass("has-error");
    $("#fghedgingrate").removeClass("has-error");
}

function Onfocus(id) {
    $("#" + id).removeClass("has-error");
}

$(document).on('click', '#option2', function (e) {

    $("#option1").show();
    $("#DivAdd").hide();
    $("#option2").hide();
    //RemoveError();
    GetData();

});

$(document).on('click', '#option1', function (e) {
    $("#DivAdd").show();
    $("#option2").show();

    $("#DivList").hide();
    $("#option1").hide();

    //ClearData();
    //RemoveError();
});

function GetData() {

    var e = "{'CHID': '0'}";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/User/GetCurrencyHedging",
        data: e,
        dataType: "json",
        success: function (e) {
            if (null != e && void 0 !== e) {
                var a, t, l, r = JSON.parse(e);
                let current_datetime = new Date()
                let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()
                $("#compact").dataTable().fnDestroy();
                $("#compact tbody tr").remove();
                $("#DivList").show();

                for (var o = 0; o < r.result.length; o++) {
                    $("#compact").append("<tr><td align ='center'> <a href='javascript:void(0);' onclick='EditData(" + r.result[o].CHID + ")'> <i class='fa fa-pencil text-inverse mr-10'></i> </a></td ><td> " + r.result[o].FullName + " </td ><td> " + r.result[o].FromCurrencyCode + " </td ><td>" + r.result[o].ToCurrencyCode + " </td><td>" + r.result[o].HedgingRate + " </td><td align='center'><a href='javascript:void(0);' onclick='DeleteData(" + r.result[o].CHID + ")'> <i class='fa fa-trash text-inverse mr-10'></i> </a></td></tr>");
                }

                e.length < 1e3 ? (a = [25, 50, 100, 250, -1], t = [25, 50, 100, 250, "All"], l = 25) : (a = [50, 100, 250, 500, -1], t = [50, 100, 250, 500, "All"], l = 50);
                $("#compact").DataTable({
                    responsive: 1,
                    iDisplayLength: l,
                    aLengthMenu: [a, t],
                    order: [[1, "asc"]],
                    dom: "Blfrtip",
                    buttons: [{
                        extend: "excel",
                        title: 'Currency_Hedging_' + formatted_date,
                        exportOptions: {
                            columns: [1, 2, 3, 4]
                        },
                        text: "Export to Excel"
                    }]
                })

            } else Message("error", "Error in Listing", "error")
        },
        error: function (e) {
            window.location = DefaultURL;
        }
    })
}

function EditData(id) {

    var param = "{'CHID':'" + id + "'}";

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/User/GetCurrencyHedging",
        data: param,
        dataType: "json",
        success: function (e) {
            if (null != e && void 0 !== e) {
                var r = JSON.parse(e);
                $("#hdnCurrencyHedgingID").val(r.result[0].CHID);
                $("#ddluser").val(r.result[0].UserID);
                $("#ddlfromcurrency").val(r.result[0].FromCurrencyCode);
                $("#ddlToCurrency").val(r.result[0].ToCurrencyCode);
                $("#txt_hedgingrate").val(r.result[0].HedgingRate);

                $("#DivAdd").show();
                $("#option2").show();
                $("#DivList").hide();
                $("#option1").hide();
            }
            else {
                Message("error", "Error in edit data", "error")
            }
        },
        error: function (e) {
            window.location = DefaultURL;
        }
    })
}

function DeleteData(id) {
    swal({
        title: "Are You Sure?",
        text: "to Delete this records",
        type: "info",
        showCancelButton: !0,
        closeOnConfirm: !1,
        showLoaderOnConfirm: !0

    }, function (isConfirm) {
        if (isConfirm) {
            swal.close();
            DeleteRec(id);
        } else {
            swal.close();
            e.preventDefault();
            return false;
        }
    });
}

function DeleteRec(id) {
    var e = "{'CHID':'" + id + "'}";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/User/DltCurrencyHedging",
        data: e,
        dataType: "json",
        success: function (e) {
            debugger;
            if (null != e && void 0 !== e) {
                var t = JSON.parse(e);
                if (t.status == "OK" || t.status == "ok") {
                    Message("success", t.message, "success");
                    GetData();
                }
                else {
                    Message("error", t.message, "error")
                }
            }
            else {
                Message("error", "Error in edit data", "error")
            }
        },
        error: function (e) {
            window.location = DefaultURL;
        }
    })
}


