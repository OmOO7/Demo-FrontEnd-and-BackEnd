
$("#ddlproduct").change(function () {
    if (($("#ddluser").val() == "" || $("#ddluser").val() == "0")) {
        $("#fguser").addClass("has-error");
    }
    else {
        FillData();
    }
});

function IsValid() {
    var status = true;
    if (($("#ddluser").val() == "" || $("#ddluser").val() == "0") && ($("#ddlproduct").val() == "" || $("#ddlproduct").val() == "0")) {
        $("#fguser").addClass("has-error");
        $("#fgproduct").addClass("has-error");
        status = false;
    }
    else if ($("#ddluser").val() == "" || $("#ddluser").val() == "0") {
        $("#fguser").addClass("has-error");
        status = false;
    }
    else if ($("#ddlproduct").val() == "" || $("#ddlproduct").val() == "0") {
        $("#fgproduct").addClass("has-error");
        status = false;
    }
    return status;
}

function FillData() {
    $("#dvsubmit").hide();
    if ($('#ddlproduct').val() == "" || $('#ddlproduct').val() == "0") {
        $("#List").DataTable().clear().draw();
        return;
    }
    var e = new FormData;
    e.append("ProductID", $('#ddlproduct').val()),
        e.append("UserID", $('#ddluser').val()),
        $.ajax({
            type: "POST",
            url: "/User/GetSupplierByProductForMarkup",
            data: e,
            contentType: !1,
            processData: !1,
            dataType: "json",
            success: function (e) {
                if (null != e && void 0 !== e) {
                    $("#dvsubmit").show();
                    var t, a, s = JSON.parse(e);
                    $("#List").dataTable().fnDestroy(), $("#List tbody tr").remove();
                    for (var i = 0; i < s.result.length; i++) {
                        var txtval = "";
                        txtval = "<input type=\"text\" value=\"" + s.result[i].Percentage + "\"  id=\"" + s.result[i].SupID + "\" maxlength=\"5\"  onkeypress=\"return DecimalNumberOnly(event)\" class=\"form-control txt-markup\" placeholder=\"Enter Percentage\" />";
                        $('#List').append("<tr>" + "<td>" + s.result[i].UserName + " </td>" + "<td>" + s.result[i].SupplierName + " </td>" + "<td>" + txtval + " </td>" + "</tr>");
                    }
                    t = [50, 100, 250, 500, -1], a = [50, 100, 250, 500, "All"], 50;
                    $("#List").DataTable({
                        paging: !0,
                        iDisplayLength: 50,
                        aLengthMenu: [t, a],
                        order: [[1, "asc"]],
                        autoWidth: !1,
                        aoColumnDefs: [{
                            bSortable: !1, aTargets: [0]
                        }]
                    })
                } else Message("error", "List Not Found", "error")
            },
            error: function (e) {
                window.location = DefaultURL;
            }
        })
}

$(document).on('click', '#btnCancel', function (e) {
    RemoveError();
    ClearData();
});

function ClearData() {
    $("#ddluser").val("");
    $("#ddlproduct").val("");
}

function RemoveError() {
    $("#fguser").removeClass("has-error");
    $("#fgproduct").removeClass("has-error");
}

function Onfocus(id) {
    $("#" + id).removeClass("has-error");
}

$(document).on('click', '#btnSubmit', function (e) {
    if (IsValidSave()) {

        var a = new Array;

        $('.txt-markup').each(function (index, value) {
            var markup = $("#" + $(this).attr('id')).val();
            supMarkup = new Object;
            supMarkup.SupID = $(this).attr('id');
            supMarkup.Percentage = markup;
            a.push(supMarkup)
        });

        var t = new FormData;

        t.append("UserID", $('#ddluser').val()),
            t.append("ProductID", $('#ddlproduct').val()),
            t.append("xml", JSON.stringify(a))

        $.ajax({
            type: "POST",
            url: "/User/InsUpdDltMarkup",
            data: t,
            contentType: !1,
            processData: !1,
            dataType: "json",
            success: function (e) {
                if (null != e && void 0 !== e) {
                    var t = JSON.parse(e);
                    Message("success", t.message, "success");
                    $("#List").dataTable().fnDestroy(), $("#List tbody tr").remove();
                    $("#dvsubmit").hide();
                    ClearData();
                    RemoveError();
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

function IsValidSave() {
    var status = false;
    if (IsValid()) {
        $('.txt-markup').each(function (index, value) {
            var markup = $("#" + $(this).attr('id')).val();
            if (markup != "0" && markup != "" && markup != null && markup != "null") {
                status = true;
            }
        });
        if (status == false) {
            Message("error", "Please enter markup", "error")
        }
    }
    return status;
}