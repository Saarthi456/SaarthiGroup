using saarthi.Helpers;

using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Management;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.Xml.Linq;
using Microsoft.Owin;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Threading;

public class Common
{
    //public static List<Resource> lstResource { get; set; }

    public static void LoadCulture()
    {
        if (AppSession.AppCulture == "gu-IN")
        {
            Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo("gu-IN");
            Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo("gu-IN");
        }
        else
        {
            Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo("en-US");
            Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo("en-US");
        }
    }

    #region Session

    public static string GetSessionValue(string paramName)
    {
        String tmp = String.Empty;
        try
        {
            if (Convert.ToString(HttpContext.Current.Session[paramName]) != null)
            {
                tmp = HttpContext.Current.Session[paramName].ToString();
            }
        }
        catch
        {
            tmp = String.Empty;
        }
        return tmp;
    }

    public static void SetSessionValue(string paramName, object paramValue)
    {
        HttpContext.Current.Session[paramName] = paramValue;
    }

    #endregion

    #region Cookies

    public static void SetCookie(string key, string value)
    {
        HttpCookie Cookie = new HttpCookie(key, value);
        if (HttpContext.Current.Request.Cookies[key] != null)
        {
            var cookieOld = HttpContext.Current.Request.Cookies[key];
            cookieOld.Expires = DateTime.Now.AddDays(365);
            cookieOld.Value = Cookie.Value;
            HttpContext.Current.Response.Cookies.Add(cookieOld);
        }
        else
        {
            Cookie.Expires = DateTime.Now.AddDays(365);
            HttpContext.Current.Response.Cookies.Add(Cookie);
        }
    }

    public static string GetCookie(string key)
    {
        string value = string.Empty;
        HttpCookie cookie = HttpContext.Current.Request.Cookies[key];

        if (cookie != null)
        {
            value = cookie.Value;
        }
        return value;
    }

    #endregion

    #region LayoutMenu

    public static string IsActive(string control, string action)
    {
        var routeControl = "";
        var routeAction = "";

        var routeValues = HttpContext.Current.Request.RequestContext.RouteData.Values;
        if (routeValues != null)
        {
            if (routeValues.ContainsKey("action"))
            {
                routeAction = routeValues["action"].ToString();
            }
            if (routeValues.ContainsKey("controller"))
            {
                routeControl = routeValues["controller"].ToString();
            }
        }

        // both must match
        var returnActive = control.ToLower() == routeControl.ToLower() && action.ToLower() == routeAction.ToLower();

        return returnActive ? "active" : "";
    }

    #endregion


    #region Log Activity 

    public static void LogActivity(string msg)
    {
        string strDetail = "Date: " + System.DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss");

        if (!Directory.Exists(HttpContext.Current.Server.MapPath("~/Temp/")))
            Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/Temp/"));

        if (!File.Exists(HttpContext.Current.Server.MapPath("~/Temp/LogWeb.txt")))
            File.Create(HttpContext.Current.Server.MapPath("~/Temp/LogWeb.txt")).Close();

        File.AppendAllText(HttpContext.Current.Server.MapPath("~/Temp/LogWeb.txt"), Environment.NewLine + msg + " " + strDetail);
    }

    public static string GetClientIpAddress(HttpRequestMessage request)
    {
        if (request.Properties.ContainsKey("MS_HttpContext"))
        {
            return IPAddress.Parse(((HttpContextBase)request.Properties["MS_HttpContext"]).Request.UserHostAddress).ToString();
        }
        if (request.Properties.ContainsKey("MS_OwinContext"))
        {
            return IPAddress.Parse(((OwinContext)request.Properties["MS_OwinContext"]).Request.RemoteIpAddress).ToString();
        }
        return null;
    }
   #endregion

    #region Convert Function

    public static string GetNewGuid()
    {
        Guid obj = Guid.NewGuid();
        return Convert.ToString(obj);
    }

    public static string ConvertDBnullToString(object obj)
    {
        if (obj == null || obj == DBNull.Value)
        {
            return "";
        }
        else
        {
            return Convert.ToString(obj);
        }
    }

    public static int ConvertDBNullToInt(object obj)
    {
        int val;
        if (obj == null || obj == DBNull.Value)
        {
            return 0;
        }
        else
        {
            try
            {
                if (obj.ToString() == "")
                    return 0;
                else
                    val = int.Parse(Convert.ToString(obj));
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return val;
        }
    }

    public static Int32 ConvertDBnullToInt32(object obj)
    {
        Int32 val;
        if (obj == null || obj == DBNull.Value)
        {
            return 0;
        }
        else
        {
            try
            {
                if (obj.ToString() == "")
                    return 0;
                else
                    val = Convert.ToInt32(obj);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return val;
        }
    }

    public static Int64 ConvertDBnullToInt64(object obj)
    {
        Int64 val;
        if (obj == null || obj == DBNull.Value)
        {
            return 0;
        }
        else
        {
            try
            {
                if (obj.ToString() == "")
                    return 0;
                else
                    val = Convert.ToInt64(obj);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return val;
        }
    }

    public static double ConvertDBnullToDouble(object obj)
    {
        double val;
        if (obj == null || obj == DBNull.Value)
        {
            return 0;
        }
        else
        {
            try
            {
                val = Convert.ToDouble(obj);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return val;
        }
    }

    public static decimal ConvertDBNullToDecimal(object obj)
    {
        decimal val;
        if (obj == null || obj == DBNull.Value)
        {
            return 0;
        }
        else
        {
            try
            {
                val = Convert.ToDecimal(obj);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return val;
        }
    }

    public static Boolean ConvertDBNulltoBoolean(object obj)
    {
        bool val;
        if (obj == null || obj == DBNull.Value)
        {
            return false;
        }
        else
        {
            try
            {
                val = Convert.ToBoolean(obj);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return val;
        }
    }

    public static string ConvertDBnullToDateString(object obj)
    {
        if (obj == null || obj == DBNull.Value)
        {
            return "";
        }
        else
        {
            return Convert.ToString(obj).Substring(0, 10);
        }
    }

    #endregion

    #region Date Conversion Function

    public static string ConvertDateDDMMYYYYtoDBDate(object obj)
    {
        string val;
        if (obj == null || obj == DBNull.Value)
        {
            return "";
        }
        else
        {
            try
            {
                string[] str;
                str = obj.ToString().Split('/');
                val = str[2] + "-" + str[1] + "-" + str[0];
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return val;
        }
    }

    public static string ConvertDateDBDateToDDMMYYYY(object obj)
    {
        string val;
        if (obj == null || obj == DBNull.Value)
        {
            return "";
        }
        else
        {
            try
            {
                string[] str;
                str = obj.ToString().Split('-');
                val = str[2] + "/" + str[1] + "/" + str[0];
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return val;
        }
    }

    public static string ConvertDateDD_MM_YYYYtoDBDate(object obj)
    {
        string val;
        if (obj == null || obj == DBNull.Value)
        {
            return "";
        }
        else
        {
            try
            {
                string[] str;
                str = obj.ToString().Split('.');
                val = str[2] + "-" + str[1] + "-" + str[0];
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return val;
        }
    }

    public static string ConvertDateDBDateToDD_MM_YYYY(object obj)
    {
        string val;
        if (obj == null || obj == DBNull.Value)
        {
            return "";
        }
        else
        {
            try
            {
                string[] str;
                str = obj.ToString().Split('.');
                val = str[2] + "." + str[1] + "." + str[0];
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return val;
        }
    }

    #endregion


    public static int CheckExistance(string Value, string ColumnName, string TableName, string WhereCondition)
    {
        int returnVal = 0;
        SqlCommand cmd = new SqlCommand();
        SQLHelper ObjSQLHelper = new SQLHelper();
        try
        {
            cmd.Parameters.AddWithValue("@Value", Value);
            cmd.Parameters.AddWithValue("@ColumnName", ColumnName);
            cmd.Parameters.AddWithValue("@TableName", TableName);
            cmd.Parameters.AddWithValue("@WhereCondition", WhereCondition);
            returnVal = ObjSQLHelper.ExecuteScalarReturnInteger("CheckExistance", cmd);
            return returnVal;
        }
        catch (Exception)
        {
            return returnVal;
        }
        finally
        {
            ObjSQLHelper.ClearObjects();
        }
    }

    public static bool CheckAccess(Int64 UserId, Int64 ClientId, string Name, string AccessLevel)
    {
        bool HaveAccess = false;
        int Return = 0;
        SqlCommand cmd = new SqlCommand();
        SQLHelper ObjSQLHelper = new SQLHelper(ConfigurationManager.ConnectionStrings["ERPQCAppConnection"].ConnectionString.ToString());

        try
        {
            cmd.Parameters.AddWithValue("@Action", "CheckUserAccess");
            cmd.Parameters.AddWithValue("@ClientID", ClientId);
            cmd.Parameters.AddWithValue("@Name", Name);
            cmd.Parameters.AddWithValue("@UserId", UserId);
            cmd.Parameters.AddWithValue("@AccessLevel", AccessLevel);
            cmd.Parameters.AddWithValue("@OutputId", SqlDbType.BigInt);
            cmd.Parameters["@OutputId"].Size = 8;
            cmd.Parameters["@OutputId"].Direction = ParameterDirection.Output;

            string ProcName = "App_Access_SP";
            Return = Common.ConvertDBNullToInt(ObjSQLHelper.IUDProcDataWithOutputParameter(ProcName, cmd));

            if (Return > 0)
            {
                ObjSQLHelper.CommitTransaction();
                HaveAccess = true;
            }
            else
            {
                ObjSQLHelper.RollBackTransaction();
            }
        }
        catch (Exception ex)
        {
            Common.LogActivity(ex.Message + " CreateDocAttachment " + "Documents");
            ObjSQLHelper.RollBackTransaction();
        }

        finally
        {
            ObjSQLHelper.ClearObjects();
        }

        return HaveAccess;
    }

    public static void UserAuthentication(Int16 ClientID, bool IsLogin)
    {
        SqlCommand cmd = new SqlCommand();
        SQLHelper ObjSQLHelper = new SQLHelper();
        try
        {
            cmd.Parameters.AddWithValue("@Action", "UserAuthentication");
            cmd.Parameters.AddWithValue("@ClientID", ClientID);
            cmd.Parameters.AddWithValue("@IsLogin", IsLogin);
            string ProcName = "ClientSP";
            if (ObjSQLHelper.IUDProcData(ProcName, cmd))
            {
                ObjSQLHelper.CommitTransaction();
            }
            else
            {
                ObjSQLHelper.RollBackTransaction();
            }
        }
        catch (Exception ex)
        {
            Common.LogActivity(ex.Message + " UserAuthentication");
            ObjSQLHelper.RollBackTransaction();
        }
        finally
        {
            ObjSQLHelper.ClearObjects();
        }
    }

    public static DataSet GetLoggedUser()
    {
        DataSet ds = new DataSet();
        SqlCommand cmd = new SqlCommand();
        SQLHelper ObjSQLHelper = new SQLHelper();

        try
        {
            cmd.Parameters.AddWithValue("@Action", "GetLoggedUser");
            ds = ObjSQLHelper.SelectProcDataDS("ClientSP", cmd);
            return ds;
        }
        catch (Exception ex)
        {
            ObjSQLHelper.ClearObjects();
            throw new Exception(ex.Message);
        }
        finally
        {
            ObjSQLHelper.ClearObjects();
        }
    }

    public static string CheckDependancy(string objTable)
    {
        string returnVal = "";
        SqlCommand cmd = new SqlCommand();
        SQLHelper ObjSQLHelper = new SQLHelper();
        try
        {
            cmd.Parameters.AddWithValue("@ObjectTable", objTable);
            returnVal = ObjSQLHelper.ExecuteScalarReturnString("CheckDependancy", cmd);
            return returnVal;
        }
        catch (Exception)
        {
            return returnVal;
        }
        finally
        {
            ObjSQLHelper.ClearObjects();
        }
    }

    public static DataTable CommonList(string ColumnValue, string ColumnText, string TableName, string WhereCondition, string OrderByCondition = "")
    {
        DataSet ds = new DataSet();
        DataTable dt = new DataTable();
        SqlCommand cmd = new SqlCommand();
        SQLHelper ObjSQLHelper = new SQLHelper();
        try
        {
            cmd.Parameters.AddWithValue("@ColumnValue", ColumnValue);
            cmd.Parameters.AddWithValue("@ColumnText", ColumnText);
            cmd.Parameters.AddWithValue("@TableName", TableName);
            cmd.Parameters.AddWithValue("@WhereCondition", WhereCondition);
            if (!string.IsNullOrEmpty(Common.ConvertDBnullToString(OrderByCondition)))
                cmd.Parameters.AddWithValue("@OrderByCondition", OrderByCondition);
            ds = ObjSQLHelper.SelectProcDataDS("GetCommonList", cmd);
            dt = ds.Tables[0];
        }
        catch (Exception)
        {
            ObjSQLHelper.ClearObjects();
        }
        finally
        {
            ObjSQLHelper.ClearObjects();
        }
        return dt;
    }

    public static DataTable CommonList(string SP, Dictionary<string, string> Parameters)
    {
        DataSet ds = new DataSet();
        DataTable dt = new DataTable();
        SqlCommand cmd = new SqlCommand();
        SQLHelper ObjSQLHelper = new SQLHelper();

        foreach (KeyValuePair<string, string> param in Parameters)
        {
            cmd.Parameters.AddWithValue(param.Key, param.Value);
        }

        try
        {
            ds = ObjSQLHelper.SelectProcDataDS(SP, cmd);
            dt = ds.Tables[0];
        }
        catch (Exception)
        {
            ObjSQLHelper.ClearObjects();
        }
        finally
        {
            ObjSQLHelper.ClearObjects();
        }
        return dt;
    }

    public static DataTable FormResourceList(string strModule, string strForm, int LanguageId, bool isCommonLabel)
    {
        DataSet ds = new DataSet();
        DataTable dt = new DataTable();
        SqlCommand cmd = new SqlCommand();
        SQLHelper ObjSQLHelper = new SQLHelper();
        try
        {
            cmd.Parameters.AddWithValue("@Action", "FormResourceList");
            cmd.Parameters.AddWithValue("@Module", strModule);
            cmd.Parameters.AddWithValue("@Form", strForm);
            cmd.Parameters.AddWithValue("@LanguageId", LanguageId);
            cmd.Parameters.AddWithValue("@isCommonLabel", isCommonLabel);
            ds = ObjSQLHelper.SelectProcDataDS("LanguageResourceSP", cmd);
            dt = ds.Tables[0];
        }
        catch (Exception)
        {
            ObjSQLHelper.ClearObjects();
        }
        finally
        {
            ObjSQLHelper.ClearObjects();
        }
        return dt;
    }

    //public static List<Sidebar> GetClientAcceeMenu(int ClientID)
    //{
    //    List<Sidebar> lstSidebar = new List<Sidebar>();
    //    DataSet ds = new DataSet();
    //    SqlCommand cmd = new SqlCommand();
    //    SQLHelper ObjSQLHelper = new SQLHelper();
    //    try
    //    {
    //        cmd.Parameters.AddWithValue("@Action", "ClientAccess");
    //        cmd.Parameters.AddWithValue("@ClientID", ClientID);
    //        ds = ObjSQLHelper.SelectProcDataDS("ClientSP", cmd);

    //        if (ds != null && ds.Tables.Count > 0)
    //        {
    //            if (ds.Tables[0].Rows.Count > 0)
    //            {
    //                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
    //                {
    //                    Sidebar objSidebar = new Sidebar();
    //                    if (ds.Tables[0].Columns.Contains("ModuleName"))
    //                        objSidebar.ModuleName = Common.ConvertDBnullToString(ds.Tables[0].Rows[i]["ModuleName"]);

    //                    lstSidebar.Add(objSidebar);
    //                }
    //            }
    //        }
    //    }
    //    catch (Exception ex)
    //    {
    //        ObjSQLHelper.ClearObjects();
    //    }
    //    finally
    //    {
    //        ObjSQLHelper.ClearObjects();
    //    }
    //    return lstSidebar;

    //}

    public static string GetMacAddress()
    {
        string uuid = string.Empty;

        ManagementClass mc = new ManagementClass("Win32_ComputerSystemProduct");
        ManagementObjectCollection moc = mc.GetInstances();

        foreach (ManagementObject mo in moc)
        {
            uuid = mo.Properties["UUID"].Value.ToString();
            break;
        }

        return uuid;
    }

    public static string GetIpAddress(bool GetLan = false)
    {
        string retResult = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

        if (String.IsNullOrEmpty(retResult))
            retResult = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];

        if (string.IsNullOrEmpty(retResult))
            retResult = HttpContext.Current.Request.UserHostAddress;

        if (string.IsNullOrEmpty(retResult) || retResult.Trim() == "::1")
        {
            GetLan = true;
            retResult = string.Empty;
        }

        if (GetLan && string.IsNullOrEmpty(retResult))
        {
            //This is for Local(LAN) Connected ID Address
            string stringHostName = Dns.GetHostName();
            //Get Ip Host Entry
            IPHostEntry ipHostEntries = Dns.GetHostEntry(stringHostName);
            //Get Ip Address From The Ip Host Entry Address List
            IPAddress[] arrIpAddress = ipHostEntries.AddressList;

            try
            {
                retResult = arrIpAddress[arrIpAddress.Length - 2].ToString();
            }
            catch
            {
                try
                {
                    retResult = arrIpAddress[0].ToString();
                }
                catch
                {
                    try
                    {
                        arrIpAddress = Dns.GetHostAddresses(stringHostName);
                        retResult = arrIpAddress[0].ToString();
                    }
                    catch
                    {
                        retResult = "127.0.0.1";
                    }
                }
            }

        }
        return retResult;
    }

    #region Combo Textbox Value In Master

    public static int SaveComboValue(string SPName, string TableName, string actionName, string fieldName, string comboTextValue)
    {
        int Return = 0;
        SqlCommand cmd = new SqlCommand();
        SQLHelper ObjSQLHelper = new SQLHelper();

        try
        {            
            cmd.Parameters.AddWithValue("@TableName", TableName);
            cmd.Parameters.AddWithValue("@Action", actionName);
            cmd.Parameters.AddWithValue("@ColumnName", fieldName);
            cmd.Parameters.AddWithValue("@ColumnValue", comboTextValue);
            cmd.Parameters.AddWithValue("@OutputId", SqlDbType.BigInt);
            cmd.Parameters["@OutputId"].Size = 8;
            cmd.Parameters["@OutputId"].Direction = ParameterDirection.Output;

            Return = Common.ConvertDBNullToInt(ObjSQLHelper.IUDProcDataWithOutputParameter(SPName, cmd));

            if (Return > 0)
            {
                ObjSQLHelper.CommitTransaction();
            }
            else
            {
                ObjSQLHelper.RollBackTransaction();
            }
        }
        catch (Exception ex)
        {
            Common.LogActivity(ex.Message + " SaveComboValue " + "SaveComboValue");
            ObjSQLHelper.RollBackTransaction();
        }

        finally
        {
            ObjSQLHelper.ClearObjects();
        }

        return Return;
    }

    #endregion

    public static void SMSSEND(string sMobileNo, string sMessageBody)
    {
        // use the API URL here  
        string strUrl = "http://bulksms.itcarezsolutions.com/submitsms.jsp?user=egovns&key=c1b514406dXX&mobile=" + sMobileNo + "&message=" + sMessageBody + "&senderid=egovns&accusage=1";
        // Create a request object  
        WebRequest request = HttpWebRequest.Create(strUrl);
        // Get the response back  
        HttpWebResponse response =

        (HttpWebResponse)request.GetResponse();
        Stream s = (Stream)response.GetResponseStream();
        StreamReader readStream = new StreamReader(s);
        string dataString = readStream.ReadToEnd();
        response.Close();
        s.Close();
        readStream.Close();

    }

}

public static class DataTableExtensions
{
    public static List<dynamic> ToDynamic(this DataTable dt)
    {
        var dynamicDt = new List<dynamic>();
        foreach (DataRow row in dt.Rows)
        {
            dynamic dyn = new ExpandoObject();
            dynamicDt.Add(dyn);
            foreach (DataColumn column in dt.Columns)
            {
                var dic = (IDictionary<string, object>)dyn;
                dic[column.ColumnName] = row[column];
            }
        }
        return dynamicDt;
    }
}