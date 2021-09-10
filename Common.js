function Message(e, t) {
    swal(e, t)
}

function Message(e) {
    swal(e)
}

function Message(e, t, n) {
    swal(e, t, n)
}

function NumberOnly(e) {
    var t = e.which ? e.which : e.keyCode;
    return !(t > 31 && (t < 48 || t > 57))
}

function DecimalNumberOnly(e) {
    var t = e.which ? e.which : e.keyCode;
    return !(t > 31 && (t < 48 || t > 57) && 46 != t)
}

function NotAllowAll(e) {
    var t = e.which ? e.which : e.keyCode;
    return !(t > 0 || t < 127 || 0 == t || 127 == t)
}

function NumberOnlyPlus(e) {
    var t = e.which ? e.which : e.keyCode;
    return !(t > 31 && (t < 48 || t > 57) && 43 != t)
}

function LatitudeLongitude(e) {
    var t = e.which ? e.which : e.keyCode;
    return !(t > 31 && (t < 48 || t > 57) && 46 != t && 45 != t)
}

function AlphaNumericOnly(e) {
    var t = e.which ? e.which : e.keyCode;
    return !(t > 31 && (t < 48 || t > 57) && (t < 65 || t > 90) && (t < 97 || t > 122) && 32 != t)
}

function AlphaOnly(e) {
    return null != e.key.match(/^[a-zA-Z ]*$/)
}

function AlphaSpacesOnly(e) {
    return null != e.key.match(/^[a-zA-Z\s]+$/)
}

function AvoidSpace(e) {
    if (32 == (e ? e.which : window.event.keyCode)) return !1
}

function WebSite(e) {
    var t = e.which ? e.which : e.keyCode;
    return !(t > 31 && (t < 48 || t > 57) && (t < 65 || t > 90) && (t < 97 || t > 122) && 46 != t)
}

function DecimalNumberOnly(e) {
    var t = e.which ? e.which : e.keyCode;
    return !(t > 31 && (t < 48 || t > 57) && 46 != t)
}

function checkemail(e) {
    var t = e;
    return "" == t ? (alert("Please enter an Email Id"), !1) : !!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(t) || (alert("Please input a valid email address!"), !1)
}

function email(e) {
    if ("" == e) return !1;
    return 1 == /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(e)
}

function checkemailNoMsg(e, t, n) {
    "" == e && $("#" + t).html(n).addClass("text-danger");
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(e) || $("#" + t).html(n).addClass("text-danger")
}

function checkMobileNoMsg(e) {
    if ("" == e) return !1;
    return 1 == /^[0-9-+]+$/.test(e)
}

function ClearSpan(e) {
    "" != e && $("#" + e).html("")
}

function FocusTextBox(e) {
    return 0 == e.value && (e.value = ""), !0
}

function BlurTextBox(e) {
    return "" == e.value && (e.value = 0), !0
}

function MaxAdult(e) {
    var t = e.which ? e.which : e.keyCode;
    return t > 48 && t < 53
}

function MaxChild(e) {
    var t = e.which ? e.which : e.keyCode;
    return t > 47 && t < 52
}

function NotAllowNumber1(e) {
    var t = (e = e || e).charCode ? e.charCode : e.keyCode ? e.keyCode : e.which ? e.which : 0;
    return (t < 65 || t > 90) && 32 != t && 8 != t && 9 != t && 190 != t && (t < 97 || t > 122) ? (window.status = "This field accepts Letters only.", !1) : (window.status = "", !0)
}

function ispercentage(e, t, n, i) {
    var o, a, l, c = !1;
    if (window.evt ? (o = t.keyCode, c = window.evt.ctrlKey) : t.which && (o = t.which, c = t.ctrlKey), isNaN(o)) return !0;
    if (a = String.fromCharCode(o), 8 == o || c) return !0;
    ctemp = e.value;
    var r = ctemp.indexOf("."),
        u = ctemp.length;
    if (ctemp = ctemp.substring(r, u), r < 0 && u > 1 && "." != a && "0" != a) return e.focus(), !1;
    if (ctemp.length > 2) return e.focus(), !1;
    if ("0" == a && u >= 2 && "." != a && "10" != ctemp) return e.focus(), !1;
    l = /\d/;
    var d = !!i && ("-" == a && -1 == e.value.indexOf("-")),
        h = !!n && ("." == a && -1 == e.value.indexOf("."));
    return d || h || l.test(a)
}

function echeck(e) {
    var t = e.indexOf("@"),
        n = e.length,
        i = (e.indexOf("."), e.split("."));
    return !(null == i[1] || i[1].length < 2) && (!(null == i[1] || i.length > 9) && (-1 != e.indexOf("@") && (-1 != e.indexOf("@") && 0 != e.indexOf("@") && e.indexOf("@") != n && (-1 != e.indexOf(".") && 0 != e.indexOf(".") && e.indexOf(".") != --n && (-1 == e.indexOf("@", t + 1) && ("." != e.substring(t - 1, t) && "." != e.substring(t + 1, t + 2) && (-1 != e.indexOf(".", t + 2) && (-1 == e.indexOf(" ") && !!isProperMailId(e)))))))))
}

function isProperMailId(e) {
    if (!e) return !1;
    for (var t = 0; t < e.length; t++)
        if (-1 != "=+*|,\":<>[]{}~`';()&$#%!^\\/?-".indexOf(e.charAt(t))) return !1;
    return !0
}

function multiEmailcheck(e) {
    for (var t = document.getElementById(e).value.split(","), n = 0; n < t.length; n++)
        if (!echeck(t[n])) return alert("One or more email addresses entered is invalid. Kindly check & re-submit Again"), !1
}

function BindDropdownOnchangeSelect(e, t, n, i, o) {
    $.getJSON(e + "?htlID=" + t, function (e) {
        var t = '<option value="0">' + i + "</option>";
        $.each(e, function (e, n) {
            t += "<option value='" + n.Value + "'>" + n.Text + "</option>"
        }), $("#" + n).html(t), 0 == o ? $("#" + n)[0].focus() : $("#" + n).val(o).attr("selected", "selected")
    })
}

function BindDropdownOnchangeSelectEdit(e, t, n, i, o, a) {
    $.getJSON(e + "?htlID=" + t, function (e) {
        var t = '<option value="0">' + i + "</option>";
        $.each(e, function (e, n) {
            t += "<option value='" + n.Value + "'>" + n.Text + "</option>"
        }), $("#" + n).html(t), 0 == o ? $("#" + n)[0].focus() : $("#" + n).val(o).attr("selected", "selected"), $("#ddlTeam").val(a.BSFLTeam_Id)
    })
}

function BindDropdownOnchangeSelectMultiSelect(e, t, n) {
    $.getJSON(e + "?htlID=" + t, function (e) {
        $("#" + n).empty(), $.each(e, function (e, t) {
            $("#" + n).append('<option value="' + t.Value + '">' + t.Text + "</option>")
        }), $("#ddlTeam").multiselect("reload")
    })
}

function BindDropdownOnchangeSelectMultiSelectEDT(e, t, n) {
    $.getJSON(e + "?htlID=" + t.SeriesID, function (e) {
        $("#" + n).empty(), $.each(e, function (e, t) {
            $("#" + n).append('<option value="' + t.Value + '">' + t.Text + "</option>")
        });
        var i = t.TagTeam.split(",");
        for (var o in i) $("#ddlTeam option[value='" + i[o] + "']").prop("selected", !0);
        $("#ddlTeam").multiselect("reload"), BindDropdownOnchangEdt("GetPlayers", i, "ddlPlayer", "Select Player", "0", t.TagPlayer)
    })
}

function BindDropdownOnchangEdt(e, t, n, i, o, a) {
    $.getJSON(e + "?htlID=" + t, function (e) {
        $("#" + n).empty(), $.each(e, function (e, t) {
            $("#" + n).append('<option value="' + t.Value + '">' + t.Text + "</option>")
        });
        var t = a.split(",");
        for (var i in t) $("#ddlPlayer option[value='" + t[i] + "']").prop("selected", !0);
        $("#ddlPlayer").multiselect("reload")
    })
}

function BindDropdownOnchangeSelectTeam(e, t, n, i, o, a, l, c) {
    $.getJSON(e + "?htlID=" + t, function (e) {
        var t = '<option value="0">' + i + "</option>";
        $.each(e, function (e, n) {
            t += "<option value='" + n.Value + "'>" + n.Text + "</option>"
        }), $("#" + n).html(t), 0 == o ? $("#" + n)[0].focus() : $("#" + n).val(o).attr("selected", "selected");
        var r = '<option value="0">' + l + "</option>";
        $.each(e, function (e, t) {
            r += "<option value='" + t.Value + "'>" + t.Text + "</option>"
        }), $("#" + a).html(r), 0 == c ? $("#" + a)[0].focus() : $("#" + a).val(c).attr("selected", "selected")
    })
}

function BindDropdownOnchang(e, t, n, i, o) {
    var a = $("#" + t).val();
    $.getJSON(e + "?htlID=" + a, function (e) {
        $("#" + n).empty(), $.each(e, function (e, t) {
            $("#" + n).append('<option value="' + t.Value + '">' + t.Text + "</option>")
        }), $("#" + n).multiselect("reload")
    })
}

function BindDropdownOnchangeSelectTeamEdit(e, t, n, i, o, a, l, c, r) {
    $.getJSON(e + "?htlID=" + t, function (e) {
        var t = '<option value="0">' + i + "</option>";
        $.each(e, function (e, n) {
            t += "<option value='" + n.Value + "'>" + n.Text + "</option>"
        }), $("#" + n).html(t), 0 == o ? $("#" + n)[0].focus() : $("#" + n).val(o).attr("selected", "selected"), $("#ddlTeamOne").val(r.MschTeam1);
        var u = '<option value="0">' + l + "</option>";
        $.each(e, function (e, t) {
            u += "<option value='" + t.Value + "'>" + t.Text + "</option>"
        }), $("#" + a).html(u), 0 == c ? $("#" + a)[0].focus() : $("#" + a).val(c).attr("selected", "selected"), $("#ddlTeamTwo").val(r.MschTeam2)
    })
}




