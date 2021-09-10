using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml;

namespace Login_Demo
{
    public static class GeneralFuncation
    {
        public static string Bas64String(HttpPostedFileBase file)
        {
            Stream fs = file.InputStream;
            BinaryReader br = new BinaryReader(fs);
            Byte[] bytes = br.ReadBytes((Int32)fs.Length);
            return Convert.ToBase64String(bytes, 0, bytes.Length);
        }
        public static string EncodeTo64(string toEncode)
        {
            byte[] toEncodeAsBytes = ASCIIEncoding.ASCII.GetBytes(toEncode);
            return System.Convert.ToBase64String(toEncodeAsBytes);
        }
        public static string DecodeFrom64(string encodedData)
        {
            byte[] encodedDataAsBytes = System.Convert.FromBase64String(encodedData);
            return ASCIIEncoding.ASCII.GetString(encodedDataAsBytes);

        }
        public static DataSet ReadDataFromJson(string jsonString)
        {
            DataSet result = new DataSet();
            if (jsonString.Contains("Unauthorized") || jsonString.Contains("Check API Connection"))
            {
                return result;
            }
            else
            {
                var xd = new XmlDocument();
                jsonString = replace(jsonString);
                jsonString = "{ \"rootNode\": {" + jsonString.Trim().TrimStart('{').TrimEnd('}') + @"} }";
                xd = JsonConvert.DeserializeXmlNode(jsonString);
                xd.InnerXml = xd.InnerXml.Replace("<comments />", "");
                result = new DataSet();
                result.ReadXml(new XmlNodeReader(xd));
            }
            return result;
        }
        private static string replace(string jsonString)
        {
            jsonString = jsonString.Replace("Booking Note:", "Booking Note");
            jsonString = jsonString.Replace("Note:", "Note");
            jsonString = jsonString.Replace("Notes:", "Notes");
            jsonString = jsonString.Replace("Note: ", "Note");
            jsonString = jsonString.Replace("Notes: ", "Notes");
            jsonString = jsonString.Replace("nationality_restriction:", "nationality_restriction");
            jsonString = jsonString.Replace("name_change_policy:", "name_change_policy");
            return jsonString;
        }
        public static string AddOrdinal(int num)
        {
            if (num <= 0) return num.ToString();

            switch (num % 100)
            {
                case 11:
                case 12:
                case 13:
                    return num + "th";
            }

            switch (num % 10)
            {
                case 1:
                    return num + "st";
                case 2:
                    return num + "nd";
                case 3:
                    return num + "rd";
                default:
                    return num + "th";
            }

        }
    }
}