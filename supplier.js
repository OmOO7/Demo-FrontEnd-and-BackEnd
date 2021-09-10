
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

$(document).on('click', '#btnCancel', function (e) {
    RemoveError();
    ClearData();
});

function ClearData() {
    $("#ddluser").val("0");
    $("#ddlproduct").val("0");
}

function RemoveError() {
    $("#fguser").removeClass("has-error");
    $("#fgproduct").removeClass("has-error");
}

function Onfocus(id) {
    $("#" + id).removeClass("has-error");
}

function FillData() {

    $("#dvsubmit").hide();
    $("#chkAll").prop("checked", false),
        $(".chk").prop("checked", false)
    if ($('#ddlproduct').val() == "" || $('#ddlproduct').val() == "0") {
        $("#List").DataTable().clear().draw();
        return;
    }
    var e = new FormData;
    e.append("ProductID", $('#ddlproduct').val()),
        e.append("UserID", $('#ddluser').val()),

        $.ajax({
            type: "POST",
            url: "/User/GetSupplierByProduct",
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
                        var allocate = "";
                        if (s.result[i].IsSelected == 1)
                            allocate = "<input id=" + s.result[i].SupID + " class='chk' type='checkbox' checked>";
                        else
                            allocate = "<input id=" + s.result[i].SupID + " class='chk' type='checkbox'>";

                        $('#List').append("<tr>" + "<td class='text-center'>" + allocate + "</td>" + "<td>" + s.result[i].SupplierName + " </td>" + "<td class='text-center'>" + s.result[i].UserName + "</td>" + "</tr>");
                    }
                    t = [50, 100, 250, 500, -1], a = [50, 100, 250, 500, "All"], 50;
                    chkStatus();
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

function chkStatus() {
    if (($(".chk").length == $(".chk:checked").length) && $(".chk").length > 0) {
        $("#chkAll").prop("checked", true);
    }
    else {
        $("#chkAll").prop("checked", false);
    }
}

$("#chkAll").click(function () {
    $("#chkAll").is(":checked") ? (jQuery(".chk").prop("checked", !0), $("#chkAll").prop("checked", !0)) : (jQuery(".chk").prop("checked", !1), $("#chkAll").prop("checked", !1))
});

$(document).on('click', '#btnSubmit', function (e) {
    if (IsValidSave()) {
        var a = new Array;
        $('.chk').each(function (index, value) {
            suppID = new Object;
            if ($(this).prop('checked')) {
                suppID.SupID = $(this).attr('id');
                a.push(suppID)
            }
        });

        var t = new FormData;
        t.append("UserID", $('#ddluser').val()),
            t.append("ProductID", $('#ddlproduct').val()),
            t.append("xml", JSON.stringify(a))

        $.ajax({
            type: "POST",
            url: "/User/InsUpdPlayerSeriesPoints",
            data: t,
            contentType: !1,
            processData: !1,
            dataType: "json",
            success: function (e) {
                if (null != e && void 0 !== e) {
                    var t = JSON.parse(e);
                    Message("success", t.message, "success");
                } else Message("error", "Error in add data", "error")
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
        $('.chk').each(function (index, value) {
            if ($(this).prop('checked')) {
                status = true;
            }
        });
        if (status == false) {
            Message("error", "please select any supplier", "error")
        }
    }
    return status;
}


