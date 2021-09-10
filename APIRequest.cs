using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Login_Demo
{
    public static class APIRequest
    {
        static string APIURL = ConfigurationManager.AppSettings["APIURL"];
        static string APINotificationURL = ConfigurationManager.AppSettings["APINotificationURL"];

        public static string GetLogin(string login)
        {
            return APICall.addData(APIURL + "UserLogin", login);
        }
        public static string GetClients(string data)
        {
            return APICall.addData(APIURL + "GetClients", data);
        }
        public static string GetCurrency()
        {
            return APICall.ResponseGet(APIURL + "GetCurrency");
        }
    }
}