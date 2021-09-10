
$(document).on('click', '#btnSubmit', function (e) {
    if (IsValid()) {
        var t = new FormData;
        t.append("UIPAID", $('#hdnUIPAID').val()),
            t.append("UserID", $('#ddluser').val()),
            t.append("IPAddress", $('#txt_ipaddress').val()),
            t.append("IsWhiteList", $("#chk_iswhitelist").prop("checked") == true ? 1 : 0)
        $.ajax({
            type: "POST",
            url: "/User/InsUpdUserIPAddress",
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
    if (($("#ddluser").val() == "" || $("#ddluser").val() == "0") && ($("#txt_ipaddress").val() == "" || $("#txt_ipaddress").val() == "0")) {
        $("#fguser").addClass("has-error");
        $("#fgIpAddress").addClass("has-error");

        status = false;
    }
    else if ($("#ddluser").val() == "" || $("#ddluser").val() == "0") {
        $("#fguser").addClass("has-error");
        status = false;
    }
    else if ($("#txt_ipaddress").val() == "" || $("#txt_ipaddress").val() == "0") {
        $("#fgIpAddress").addClass("has-error");
        status = false;
    }
    else if (!ValidateIPaddress($("#txt_ipaddress").val())) {
        $("#fgIpAddress").addClass("has-error");
        Message("error", "Invalid IP Address", "error")
        status = false;
    }

    return status;
}

$(document).on('click', '#btnCancel', function (e) {
    RemoveError();
    ClearData();
});

function ClearData() {
    $("#ddluser").val("");
    $("#txt_ipaddress").val("");
    $("#chk_iswhitelist").prop("checked", false)
}

function RemoveError() {
    $("#fguser").removeClass("has-error");
    $("#fgIpAddress").removeClass("has-error");
}

function Onfocus(id) {
    $("#" + id).removeClass("has-error");
}

$(document).on('click', '#option2', function (e) {
    if ($("#ddluser").val() == "" || $("#ddluser").val() == "0") {
        $("#fguser").addClass("has-error");
        return false;
    }
    else {
        $("#option1").show();
        $("#DivAdd").hide();
        $("#option2").hide();
        RemoveError();
        GetData();
    }
});

$(document).on('click', '#option1', function (e) {
    $("#DivAdd").show();
    $("#option2").show();
    $("#DivList").hide();
    $("#option1").hide();
    ClearData();
    RemoveError();
});

function GetData() {

    var e = "{'UserID':'" + $("#ddluser").val() + "'}";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/User/GetUserIPAddress",
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
                    var whitlist = r.result[o].IsWhiteList == "1" ? "true" : "false";
                    $("#compact").append("<tr><td> " + r.result[o].UserName + " </td ><td> " + r.result[o].IPAddress + " </td ><td>" + whitlist + " </td><td align='center'><a href='javascript:void(0);' onclick='DeleteData(" + r.result[o].UIPAID + ")'> <i class='fa fa-trash text-inverse mr-10'></i> </a></td></tr>");
                }

                e.length < 1e3 ? (a = [25, 50, 100, 250, -1], t = [25, 50, 100, 250, "All"], l = 25) : (a = [50, 100, 250, 500, -1], t = [50, 100, 250, 500, "All"], l = 50);
                $("#compact").DataTable({
                    responsive: 1,
                    iDisplayLength: l,
                    aLengthMenu: [a, t],
                    order: [[0, "asc"]],
                    dom: "Blfrtip",
                    buttons: [{
                        extend: "excel",
                        title: 'ip_Config' + formatted_date,
                        exportOptions: {
                            columns: [0, 1]
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
    var e = "{'UIPAID':'" + id + "'}";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/User/DeleteUserIPAddress",
        data: e,
        dataType: "json",
        success: function (e) {
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

function ValidateIPaddress(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return (true)
    }
    return (false)
}