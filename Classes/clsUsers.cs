using saarthi.Helpers;
using saarthi.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;


namespace saarthi.Classes
{
    public class clsUsers
    {
        #region Class Var
        SQLHelper ObjSQLHelper;
        SqlCommand cmd;
        DataSet ds;
        #endregion

        public Login GetCredentialsById(int EntityId,string EntityType)
        {
            Login objLogin = new Login();
            ds = new DataSet();
            cmd = new SqlCommand();
            ObjSQLHelper = new SQLHelper();
            try
            {
                cmd.Parameters.AddWithValue("@Action", "GET_CREDENTIALS_BY_ID");
                cmd.Parameters.AddWithValue("@EntityId", EntityId);
                cmd.Parameters.AddWithValue("@EntityType", EntityType);
                ds = ObjSQLHelper.SelectProcDataDS("Users_SP", cmd);

                if (ds != null && ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0) {
                        if (ds.Tables[0].Columns.Contains("Username"))
                            objLogin.Username = Common.ConvertDBnullToString(ds.Tables[0].Rows[0]["Username"]);
                        if (ds.Tables[0].Columns.Contains("Password"))
                            objLogin.Password = Common.ConvertDBnullToString(ds.Tables[0].Rows[0]["Password"]);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                ObjSQLHelper.ClearObjects();
            }
            finally
            {
                ObjSQLHelper.ClearObjects();
            }
            return objLogin;
        }
    }
}