using Login_Demo.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Login_Demo.Controllers
{
    public class LoginController : BaseController
    {
        // GET: Login
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(string username ,string password)
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(username) && !string.IsNullOrWhiteSpace(password))
                {
                    UserLogin ouserLogin = new UserLogin();
                    ouserLogin.UserName = username;
                    ouserLogin.Password = password;
                    ouserLogin.UTID = null;
                    DataSet ds = GeneralFuncation.ReadDataFromJson(APIRequest.GetLogin(JsonConvert.SerializeObject(ouserLogin)));
                    if (ds.Tables["rootNode"].Rows[0]["Status"].ToString() == "OK")
                    {
                        if (ds.Tables["result"] != null)
                        {
                            if (ds.Tables["result"].Rows.Count > 0)
                            {
                                string cookie = string.Empty;
                                cookie += (string)ds.Tables["result"].Rows[0]["UserId"];
                                cookie += "|" + (string)ds.Tables["result"].Rows[0]["UTID"];
                                cookie += "|" + (string)ds.Tables["result"].Rows[0]["UserName"];
                                cookie += "|" + (string)ds.Tables["result"].Rows[0]["FullName"];
                                cookie += "|" + (string)ds.Tables["result"].Rows[0]["ProfilePic"];
                                cookie += "|" + (string)ds.Tables["result"].Rows[0]["Email"];
                                cookie += "|" + (string)ds.Tables["result"].Rows[0]["Password"];
                                cookie += "|" + (string)ds.Tables["result"].Rows[0]["Mobile"];
                                cookie += "|" + (string)ds.Tables["result"].Rows[0]["Dob"];
                                cookie += "|" + (string)ds.Tables["result"].Rows[0]["Nationality"];
                                cookie += "|" + (string)ds.Tables["result"].Rows[0]["IsLive"];
                                cookie += "|" + (string)ds.Tables["result"].Rows[0]["SecretKey"];

                                FormsAuthentication.SetAuthCookie(cookie, true);
                                //if (!string.IsNullOrEmpty(Request.Form["ReturnUrl"]))
                                //    return RedirectToAction(Request.Form["ReturnUrl"].Split('/')[2]);
                                //else
                                return RedirectToAction("Dashboard", "Home");
                            }
                        }
                    }
                    ModelState.AddModelError(string.Empty, (string)ds.Tables["rootNode"].Rows[0]["message"]);
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Invalid User Name or Password");
                }
                return View();
            }
            catch (Exception)
            {
                ModelState.AddModelError(string.Empty, "check api connection");
                return View();
            }
        }
    }
}
