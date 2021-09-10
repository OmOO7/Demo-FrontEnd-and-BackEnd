var btnSubmit = "#btnSubmit",
    btnCancel = "#btnCancel"
userName = "#txtUserName",
    fullName = "#txtFullName",
    profile = "#flProfileImage",
    email = "#txtEmailId",
    password = "#txtPassword",
    mobile = "#txtMobile",
    dob = "#txtDOB",
    nationality = "#ddlNationality",
    city = "#ddlCity",
    //ipAddress = "#txtIpAddress",
    isLive = "#chkIsLive",
    userId = "#HfAgentId";




$('#btnSubmit').click(function () {

    debugger
    if (!isValidData()) {
        return;
    }
    AddData();



})
jQuery(document).ready(function () { }), $("#option1").click(function () {
    $("#DivAdd").show(), $("#DivList").hide(), $("#option1").hide(), $("#option2").show(), $(SpanTitle).html("add Agent")
}), $("#option2").click(function () {
    $("#DivAdd").hide(), $("#DivList").show(), $("#option1").show(), $("#option2").hide(), GetData(), $(SpanTitle).html("Agent List")
    })


function AddData() {


    var e = new FormData;

   

    var files = $("#flProfileImage").get(0).files;
    e.append("Logo", $('#HfAgent').val()),

    e.append("UserId", $(userId).val()),
        e.append("UserName", $(userName).val().trim()),
        e.append("FullName", $(fullName).val().trim()),
        e.append("ProfilePic", files[0]),
        e.append("Email", $(email).val().trim()),
        e.append("Password", $(password).val().trim()),
        e.append("Mobile", $(mobile).val().trim()),
        e.append("Dob", $(dob).val().trim()),
        e.append("CityID", $(city).val()),
        e.append("Nationality", $(nationality).val()),
        e.append("IsLive", $('#chkIsLive').prop("checked")==true ? 1 : 0);
        //e.append("IsLive", $('input[type=checkbox] .checkbox').attr('checked') ? 1 : 0);
    
        //e.append("IpAddress", $(ipAddress).val().trim());
     
        $.ajax({
            type: "POST",
            url: "/User/AddAgent",
            data: e,
            contentType: !1,
            processData: !1,
            dataType: "json",
            success: function (e) {
                if (null != e && void 0 !== e) {
                    var t = JSON.parse(e);
                    if (t.status == "OK") {
                        "OK" == t.status && Reset(), Message("success", t.message, "success")
                    }
                    else {
                        Message("error", t.message, "error")
                    }
                    
                } else Message("error", t.message, "error")
            },
            error: function (e) {
                //window.location = DefaultURL;
            }
        })
}

function RemoveHasError() {

    //Remove has error class start
    $('#fgPassword').removeClass("has-error"), $('#fgEmailId').removeClass("has-error"),
        $('#fgFullName').removeClass("has-error"), $('#fgUserName').removeClass("has-error"),
        $('#fgUserType').removeClass("has-error"), $('#fgMobile').removeClass("has-error"),
        $('#fgDOB').removeClass("has-error"), $('#fgNationality').removeClass("has-error")
    $('#fgCity').removeClass("has-error");// $('#fgIpAddress').removeClass("has-error");
    //Remove has error class end
}

function isValidData() {

    RemoveHasError();
    var result = true;
    var user_type = $('#ddlUserType').val(),
        user_name = $('#txtUserName').val(),
        full_name = $('#txtFullName').val(),
        email = $('#txtEmailId').val(),
        password = $('#txtPassword').val(),
        mobile = $('#txtMobile').val(),
        dob = $('#txtDOB').val(),
        city = $('#ddlCity').val(),
        nationality = $('#ddlNationality').val(),
        //  ipaddress = $('#txtIpAddress').val(),
        emailExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([com\co\.\in])+$/,
        mobileExp = /[0-9]{10}/;
       // ipExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    //if (!user_type) {
    //    $('#fgUserType').addClass("has-error"), result = false
    //}

    
    if (user_name.trim() == "") {

        $('#fgUserName').addClass("has-error"), result = false;

    }


    if (full_name.trim() == "") {
        $('#fgFullName').addClass("has-error"), result = false;

    }


    if (email.trim() == "") {

        $('#fgEmailId').addClass("has-error"), result = false;

    }
    else if (!email.match(emailExp)) {
        $('#fgEmailId').addClass("has-error"), result = false;

    }

    if (password.trim() == "") {
        $('#fgPassword').addClass("has-error"), result = false;

    }
    if (mobile.trim() == "") {
        $('#fgMobile').addClass("has-error"), result = false;

    }
    else if (!mobile.match(mobileExp)) {
        $('#fgMobile').addClass("has-error"), result = false;

    }

    if (dob == "") {
        $('#fgDOB').addClass("has-error"), result = false;

    }
    if (!city) {
        $('#fgCity').addClass("has-error"), result = false

    }
    if (!nationality) {
        $('#fgNationality').addClass("has-error"), result = false

    }
    //if (ipaddress == "") {
    //    $('#fgIpAddress').addClass("has-error"), result = false

    //}
    //else if (!ipaddress.match(ipExp)) {
    //    $('#fgIpAddress').addClass("has-error"), result = false;

    //}
   
  

    return result;
}
function Reset() {
    $('#ddlUserType').val(""),
        $('#txtUserName').val(""),
        $('#txtFullName').val(""),
        $('#txtEmailId').val(""),
        $('#txtPassword').val(""),
        $('#txtMobile').val(""),
        $('#txtDOB').val(""),
        $('#ddlCity').val(""),
        $('#ddlNationality').val("");
        //$('#txtIpAddress').val("");
}
$('#btnCancel').click(function () {
    RemoveHasError();
    Reset();
})

function getNationality() {



    $('#ddlCity').html('')
    $('#ddlCity').append($("<option></option>").attr("value", '').text('Select'))
    $('#ddlNationality').html('')
    $('#ddlNationality').append($("<option></option>").attr("value", '').text('Select'))





    $.ajax({
        type: "POST",
        url: "/Master/GetNationality",
        data: '',
        contentType: !1,
        processData: !1,
        dataType: "json",
        success: function (e) {
            if (null != e && void 0 !== e) {
                var r = JSON.parse(e);
                if ("OK" == r.status) {
                    for (var i = 0; i < r.result.Table1.length; i++) {
                        $('#ddlNationality').append($("<option></option>").attr("value", r.result.Table1[i].CountryCode).text(r.result.Table1[i].CountryName));
                    }
                }

            } else Message(a.messageStatus, a.message, a.messageStatus)
        },
        error: function (e) {
            window.location = DefaultURL;
        }
    })
}


$('#ddlNationality').change(function () {

    $('#ddlCity').html('')
    $('#ddlCity').append($("<option></option>").attr("value", '').text('Select'))

    if ($('#ddlNationality').val() == "") {
        return;
    }

    var a = new FormData();
    a.append("CountryCode", $('#ddlNationality').val())

    $.ajax({
        type: "POST",
        url: "/Master/GetCityByCountryCode",
        data: a,
        contentType: !1,
        processData: !1,
        dataType: "json",
        success: function (e) {
            if (null != e && void 0 !== e) {
                var r = JSON.parse(e);
                if ("OK" == r.status) {

                    for (var i = 0; i < r.result.length; i++) {
                        $('#ddlCity').append($("<option></option>").attr("value", r.result[i].CityID).text(r.result[i].CityName));
                    }
                }
            } else Message(a.messageStatus, a.message, a.messageStatus)
        },
        error: function (e) {
            window.location = DefaultURL;
        }
    })
})




$(document).ready(function () {
    getNationality()
});




function GetData() {
    Reset(), $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "/Master/GetAgentList",
        dataType: "json",
        success: function (e) {
            if (null != e && void 0 !== e) {
                var t, a, s, r = JSON.parse(e);
                let current_datetime = new Date()
                let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()
                $("#compact").dataTable().fnDestroy(), $("#compact tbody tr").remove(), $("#DivList").show();
                for (var n = 0; n < r.result.length; n++) $("#compact").append("<tr><td>" + r.result[n].UserName + " </td><td>" + r.result[n].FullName + " </td><td>" + r.result[n].Email + " </td><td>" + r.result[n].Mobile + " </td><td>" + r.result[n].Dob + " </td><td>" + r.result[n].Nationality + " </td><td>" + r.result[n].CityName + "  </td></tr>");
                e.length < 1e3 ? (t = [25, 50, 100, 250, -1], a = [25, 50, 100, 250, "All"], s = 25) : (t = [50, 100, 250, 500, -1], a = [50, 100, 250, 500, "All"], s = 50);
                $("#compact").DataTable({
                    responsive: !0,
                    processing: !0,
                    iDisplayLength: s,
                    aLengthMenu: [t, a],
                    order: [
                        [1, "asc"]
                    ],
                    aoColumnDefs: [{
                        bSortable: !1,
                        aTargets: [0, 2]
                    }],
                    dom: "Blfrtip",
                    buttons: [{
                        extend: "excel",
                        title: 'Agent_' + formatted_date,
                        exportOptions: {
                            columns: [1, 2, 3, 4, 5, 6, 7, 8]
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
