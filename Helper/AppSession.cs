using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

public class AppSession
{
    #region Session Variables

    public static string AppCulture
    {
        get
        {
            return Common.ConvertDBnullToString(HttpContext.Current.Session["AppCulture"]);
        }
        set
        {
            HttpContext.Current.Session["AppCulture"] = value;
        }
    }
    public static string UserId
    {
        get
        {
            return Common.ConvertDBnullToString(HttpContext.Current.Session["UserId"]);
        }
        set
        {
            HttpContext.Current.Session["UserId"] = value;
        }
    }
    public static string UserName
    {
        get
        {
            return Common.ConvertDBnullToString(HttpContext.Current.Session["Username"]);
        }
        set
        {
            HttpContext.Current.Session["Username"] = value;
        }
    }
    public static string LanguageId
    {
        get
        {
            return Common.ConvertDBnullToString(HttpContext.Current.Session["LanguageId"]);
        }
        set
        {
            HttpContext.Current.Session["LanguageId"] = value;
        }
    }
    public static string LoginTime
    {
        get
        {
            return Common.ConvertDBnullToString(HttpContext.Current.Session["LoginTime"]);
        }
        set
        {
            HttpContext.Current.Session["LoginTime"] = value;
        }
    }
    public static string IPAddress
    {
        get
        {
            return Common.ConvertDBnullToString(HttpContext.Current.Session["IPAddress"]);
        }
        set
        {
            HttpContext.Current.Session["IPAddress"] = value;
        }
    }
    public static string MobileNo
    {
        get
        {
            return Common.ConvertDBnullToString(HttpContext.Current.Session["MobileNo"]);
        }
        set
        {
            HttpContext.Current.Session["MobileNo"] = value;
        }
    }
    public static int ExtraFilterParaID
    {
        get
        {
            return Common.ConvertDBNullToInt(HttpContext.Current.Session["ExtraFilterParaID"]);
        }
        set
        {
            HttpContext.Current.Session["ExtraFilterParaID"] = value;
        }
    }
    public static string OrganizationId
    {
        get
        {
            return Common.ConvertDBnullToString(HttpContext.Current.Session["OrganizationId"]);
        }
        set
        {
            HttpContext.Current.Session["OrganizationId"] = value;
        }
    }
    public static string OrganizationName
    {
        get
        {
            return Common.ConvertDBnullToString(HttpContext.Current.Session["OrganizationName"]);
        }
        set
        {
            HttpContext.Current.Session["OrganizationName"] = value;
        }
    }
    public static string OrganizationName_S
    {
        get
        {
            return Common.ConvertDBnullToString(HttpContext.Current.Session["OrganizationName_S"]);
        }
        set
        {
            HttpContext.Current.Session["OrganizationName_S"] = value;
        }
    }
    public static string EmployeeID
    {
        get
        {
            return Common.ConvertDBnullToString(HttpContext.Current.Session["EmployeeID"]);
        }
        set
        {
            HttpContext.Current.Session["EmployeeID"] = value;
        }
    }
    public static string EmployeeFullName
    {
        get
        {
            return Common.ConvertDBnullToString(HttpContext.Current.Session["EmployeeFullName"]);
        }
        set
        {
            HttpContext.Current.Session["EmployeeFullName"] = value;
        }
    }
    public static string Designation
    {
        get
        {
            return Common.ConvertDBnullToString(HttpContext.Current.Session["Designation"]);
        }
        set
        {
            HttpContext.Current.Session["Designation"] = value;
        }
    }
    public static string UserGroupID
    {
        get
        {
            return Common.ConvertDBnullToString(HttpContext.Current.Session["UserGroupID"]);
        }
        set
        {
            HttpContext.Current.Session["UserGroupID"] = value;
        }
    }

    public static string ModuleEncryptID
    {
        get
        {
            return Common.ConvertDBnullToString(HttpContext.Current.Session["ModuleEncryptID"]);
        }
        set
        {
            HttpContext.Current.Session["ModuleEncryptID"] = value;
        }
    }
    public static string ModuleID
    {
        get
        {
            return Common.ConvertDBnullToString(HttpContext.Current.Session["ModuleID"]);
        }
        set
        {
            HttpContext.Current.Session["ModuleID"] = value;
        }
    }
    public static string ModuleName
    {
        get
        {
            return Common.ConvertDBnullToString(HttpContext.Current.Session["ModuleName"]);
        }
        set
        {
            HttpContext.Current.Session["ModuleName"] = value;
        }
    }
    public static string ModuleName_S
    {
        get
        {
            return Common.ConvertDBnullToString(HttpContext.Current.Session["ModuleName_S"]);
        }
        set
        {
            HttpContext.Current.Session["ModuleName_S"] = value;
        }
    }
    public static string CurrentYear
    {
        get
        {
            return Common.ConvertDBnullToString(HttpContext.Current.Session["CurrentYear"]);
        }
        set
        {
            HttpContext.Current.Session["CurrentYear"] = value;
        }
    }
    public static string viewRowCount
    {
        get
        {
            return Common.ConvertDBnullToString(HttpContext.Current.Session["viewRowCount"]);
        }
        set
        {
            HttpContext.Current.Session["viewRowCount"] = value;
        }
    }
    public static string ProofDocuments
    {
        get
        {
            string documentuploadpath = ConfigurationManager.AppSettings["ProofUploadFolder"];
            return documentuploadpath;
        }
    }
    public static string UploadedDocumentPath
    {
        get
        {
            return ConfigurationManager.AppSettings["UploadedDocumentPath"];
        }
    }
    public static string ProofDocumentsURL
    {
        get
        {
            return ConfigurationManager.AppSettings["ProofUploadFolder"] + "/";
        }
    }
    public static int MaxImageSize
    {
        get
        {
            if (ConfigurationManager.AppSettings["MaxImageSize"] != null)
            {
                return Convert.ToInt32(ConfigurationManager.AppSettings["MaxImageSize"]);
            }
            else
            {
                return 0;
            }
        }
    }
    public static string ProjectImagePath
    {
        get
        {
            return ConfigurationManager.AppSettings["ProjectImagePath"].ToString();
        }
    }
    
    #endregion
}
