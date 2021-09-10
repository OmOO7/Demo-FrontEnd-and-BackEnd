using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;

namespace Login_Demo
{
    internal static class APICall
    {
        private const string AUTHORIZATION = "Basic " + "Kn/ZaTdViUmfsCGS4XxzHA==";
        public static string ResponseGet(string url)
        {
            string Res = string.Empty;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.KeepAlive = true;
            request.Method = "GET";
            request.ContentType = "application/json";
            request.Accept = "application/json";
            request.Timeout = 40000;
            request.Headers.Add("Authorization", AUTHORIZATION);
            Stream strm;
            try
            {
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream dataStream = response.GetResponseStream();
                StreamReader reader = new StreamReader(dataStream);
                Res = reader.ReadToEnd();

            }

            catch (WebException webException)
            {
                HttpWebResponse response = (HttpWebResponse)webException.Response;
                if (response != null)
                {
                    strm = response.GetResponseStream();
                    Exception e = new Exception(webException.Message);
                    Res = response.StatusCode.ToString();
                }
                else
                {
                    Res = "Check API Connection";
                }
            }
            return Res;
        }
        public static string addData(string url, string Query)
        {

            string Res = string.Empty;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.KeepAlive = true;
            request.Method = "POST";
            request.Accept = "application/json";
            request.Timeout = 40000;
            request.Headers.Add("Authorization", AUTHORIZATION);
            request.ContentType = "application/json";
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] byte1 = encoding.GetBytes(Query);
            request.ContentLength = byte1.Length;
            Stream reqStream = request.GetRequestStream();
            reqStream.Write(byte1, 0, byte1.Length);
            reqStream.Close();

            Stream strm;
            try
            {
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream dataStream = response.GetResponseStream();
                StreamReader reader = new StreamReader(dataStream);
                Res = reader.ReadToEnd();
            }
            catch (WebException webException)
            {
                HttpWebResponse response = (HttpWebResponse)webException.Response;
                if (response != null)
                {
                    strm = response.GetResponseStream();
                    StreamReader reader = new StreamReader(strm);
                    Res = reader.ReadToEnd();
                    Exception e = new Exception(webException.Message);
                }
                else
                {
                    Res = "Check API Connection";
                }
            }
            return Res;
        }
    }
}