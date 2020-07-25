using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Data.SqlClient;
using saarthi.Helpers;
using saarthi.Models;
using saarthi.Classes;
using System.Reflection;

namespace saarthi.Controllers
{
    public class CommonController : Controller
    {
        [AcceptVerbs(HttpVerbs.Post)]
        public JsonResult CheckExistance(string Value, string ColumnName, string TableName, string WhereCondition)
        {
            int ReturnVal = 0;
            try
            {
                ReturnVal = Common.CheckExistance(Value, ColumnName, TableName, WhereCondition);
                return Json(ReturnVal);
            }
            catch
            {
                return Json(ReturnVal);
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public JsonResult GetCommonList(string ColumnValue, string ColumnText, string TableName, string WhereCondition = "", string OrderByCondition = "")
        {
            DataTable dt = new DataTable();
            List<dynamic> dynamicDt = new List<dynamic>();
            string strWhere = string.Empty;

            if (!string.IsNullOrEmpty(WhereCondition))
                strWhere = WhereCondition;

            dt = Common.CommonList(ColumnValue, ColumnText, TableName, WhereCondition, OrderByCondition);

            if (dt != null && dt.Rows.Count > 0)
            {
                return Json(new { Result = 1, Records = JsonConvert.SerializeObject(dt) });
            }
            else
            {
                return Json(new { Result = 0, Records = "No Records" });
            }
        }

        //[AcceptVerbs(HttpVerbs.Post)]
        public JsonResult GetCommonListFromSP(string SP = "", string Parameters = "", string SQL = "", string TableName = "", string DataValue = "", string DisplayValue = "", string WhereClause = "", string OrderBy = "")
        {
            DataTable dt = new DataTable();
            List<dynamic> dynamicDt = new List<dynamic>();
            string strWhere = string.Empty;

            string[] lstParameters = Parameters.Split(',');
            Dictionary<string, string> lstParametersWithValue = new Dictionary<string, string>();


            if (Common.ConvertDBnullToString(SP) != "" && Common.ConvertDBnullToString(Parameters) != "")
            {
                foreach (string Parameter in lstParameters)
                {
                    string[] temp = Parameter.Split('=');
                    lstParametersWithValue.Add(temp[0], temp[1]);
                }
                dt = Common.CommonList(SP, lstParametersWithValue);
            }
            else if (Common.ConvertDBnullToString(TableName) != "")
            {
                SP = "DropDownSP";
                lstParametersWithValue.Add("@Action", "DropDownByTable");
                lstParametersWithValue.Add("@TableName", TableName);
                lstParametersWithValue.Add("@DataValue", DataValue);
                lstParametersWithValue.Add("@DisplayValue", DisplayValue);
                lstParametersWithValue.Add("@WhereClause", WhereClause);
                lstParametersWithValue.Add("@OrderBy", OrderBy);
                dt = Common.CommonList(SP, lstParametersWithValue);
            }
            else
            {
                SP = "DropDownSP";
                lstParametersWithValue.Add("@Action", "DropDownBySQL");
                lstParametersWithValue.Add("@SQL", SQL);
                dt = Common.CommonList(SP, lstParametersWithValue);
                if (dt != null && dt.Rows.Count > 0)
                {
                    dt.Columns[0].ColumnName = "id";
                    dt.Columns[1].ColumnName = "text";
                    dt.AcceptChanges();
                }
            }

            if (dt != null && dt.Rows.Count > 0)
                return Json(new { Result = 1, Records = JsonConvert.SerializeObject(dt) });
            else
                return Json(new { Result = 0, Records = "No Records" });
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public JsonResult GetMultiDropdownGroupList(string SP, string Parameters)
        {
            DataTable dt = new DataTable();
            List<dynamic> dynamicDt = new List<dynamic>();
            string strWhere = string.Empty;

            string[] lstParameters = Parameters.Split('ᴌ');
            Dictionary<string, string> lstParametersWithValue = new Dictionary<string, string>();
            foreach (string Parameter in lstParameters)
            {
                string[] temp = Parameter.Split('=');
                lstParametersWithValue.Add(temp[0], temp[1]);
            }

            dt = Common.CommonList(SP, lstParametersWithValue);

            if (dt != null && dt.Rows.Count > 0)
            {
                List<MultiDropdown> objMultiDropdown = new List<MultiDropdown>();


                DataTable dtMain = new DataTable();
                DataTable dtChild = new DataTable();

                DataRow[] MainRows = dt.Select("Level=0");
                if (MainRows.Length > 0)
                {
                    dtMain = MainRows.CopyToDataTable();

                    for (int i = 0; i < dtMain.Rows.Count; i++)
                    {
                        MultiDropdown objParent = new MultiDropdown();
                        List<MultiDropdownBase> objParentList = new List<MultiDropdownBase>();

                        objParent.id = Common.ConvertDBnullToString(dtMain.Rows[i]["id"]);
                        objParent.text = Common.ConvertDBnullToString(dtMain.Rows[i]["text"]);

                        DataRow[] SupportRows = dt.Select("ParentName ='" + objParent.id + "'");
                        if (SupportRows.Length > 0)
                        {
                            dtChild = SupportRows.CopyToDataTable();

                            for (int j = 0; j < dtChild.Rows.Count; j++)
                            {
                                MultiDropdownBase objBase = new MultiDropdownBase();
                                objBase.id = Common.ConvertDBnullToString(dtChild.Rows[j]["id"]);
                                objBase.text = Common.ConvertDBnullToString(dtChild.Rows[j]["text"]);
                                objParentList.Add(objBase);
                            }

                            objParent.children = objParentList;

                            objMultiDropdown.Add(objParent);
                        }
                    }
                }

                return Json(new { Result = 1, Records = objMultiDropdown });
            }

            else
                return Json(new { Result = 0, Records = "No Records" });
        }

        // [AcceptVerbs(HttpVerbs.Post)]
        public JsonResult SaveComboValue(string SPName, string tableName, string actionName, string fieldName, string comboTextValue)
        {
            int ReturnId = 0;
            try
            {
                ReturnId = Common.SaveComboValue(SPName, tableName, actionName, fieldName, comboTextValue);
                if (ReturnId > 0)
                    return Json(new { STATUS = "SUCCESS", Result = ReturnId });
                else
                    return Json(new { STATUS = "FAIL", Result = ReturnId });
            }
            catch
            {
                return Json(new { STATUS = "FAIL", Result = ReturnId });
            }
        }
    }
}