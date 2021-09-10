using Login_Demo.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Login_Demo.Controllers
{
    public class BaseController : Controller
    {
        public int UserID
        {
            get
            {
                int userid = default(int);
                if (Request.IsAuthenticated)
                {
                    userid = int.Parse(User.Identity.Name.Split('|')[0]);
                }
                return userid;
            }


        }

        public SelectListItem CreateList(string Text)
        {
            SelectListItem li = new SelectListItem();
            li.Text = Text;
            li.Value = "";
            return li;
        }

        protected dynamic GetClients()
        {
            User u = new User();
            u.UserID = UserID;
            DataSet ds = GeneralFuncation.ReadDataFromJson(APIRequest.GetClients(JsonConvert.SerializeObject(u)));
            DataView dataview = new DataView(ds.Tables["result"]);
            List<SelectListItem> List = new List<SelectListItem>();
            var li = CreateList("Select");
            List.Add(li);
            if (dataview != null)
            {
                foreach (DataRowView rowView in dataview)
                {
                    li = new SelectListItem();
                    li.Text = Convert.ToString(rowView["UserName"]) + " - " + Convert.ToString(rowView["CurrencyCode"]);
                    li.Value = Convert.ToString(rowView["UserID"]);
                    List.Add(li);
                }
            }
            return List;
        }

        

        protected dynamic GetCurrency()
        {
            DataSet ds = new DataSet();
            ds = GeneralFuncation.ReadDataFromJson(APIRequest.GetCurrency());
            DataView dataview = new DataView(ds.Tables["result"]);
            List<SelectListItem> List = new List<SelectListItem>();
            var li = CreateList("Select");
            List.Add(li);
            if (dataview != null)
            {
                foreach (DataRowView rowView in dataview)
                {
                    li = new SelectListItem();
                    li.Text = Convert.ToString(rowView["CurrencyName"]);
                    li.Value = Convert.ToString(rowView["CurrencyCode"]);
                    List.Add(li);
                }
            }
            return List;
        }

    }   
}