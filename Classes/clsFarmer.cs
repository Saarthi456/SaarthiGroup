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
    public class clsFarmer
    {
        #region Class Var
        SQLHelper ObjSQLHelper;
        SqlCommand cmd;
        DataSet ds;
        #endregion

        #region Selct Record By Id
        public Farmer GetFarmerById(int Id)
        {
            Farmer objFarmer = new Farmer();
            ds = new DataSet();
            cmd = new SqlCommand();
            ObjSQLHelper = new SQLHelper();
            try
            {
                cmd.Parameters.AddWithValue("@Action", "SELECT");
                cmd.Parameters.AddWithValue("@AutoId", Id);
                ds = ObjSQLHelper.SelectProcDataDS("Farmer_SP", cmd);
                objFarmer = SetFarmerInformation(ds);
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
            return objFarmer;
        }

        public Farmer SetFarmerInformation(DataSet ds)
        {
            Farmer objFarmer = new Farmer();
            DataTable dt = new DataTable();
            if (ds != null && ds.Tables.Count > 0)
            {
                if (ds.Tables[0].Rows.Count > 0)
                {
                    dt = ds.Tables[0];

                    if (dt.Columns.Contains("AutoId")) 
                        objFarmer.AutoId = Common.ConvertDBnullToInt64(dt.Rows[0]["AutoId"]);
                    if (dt.Columns.Contains("FirstName")) 
                        objFarmer.FirstName = Common.ConvertDBnullToString(dt.Rows[0]["FirstName"]);
                    if (dt.Columns.Contains("MiddleName")) 
                        objFarmer.MiddleName = Common.ConvertDBnullToString(dt.Rows[0]["MiddleName"]);
                    if (dt.Columns.Contains("LastName")) 
                        objFarmer.LastName = Common.ConvertDBnullToString(dt.Rows[0]["LastName"]);
                    if (dt.Columns.Contains("Address1")) 
                        objFarmer.Address1 = Common.ConvertDBnullToString(dt.Rows[0]["Address1"]);
                    if (dt.Columns.Contains("Address2")) 
                        objFarmer.Address2 = Common.ConvertDBnullToString(dt.Rows[0]["Address2"]);
                    if (dt.Columns.Contains("StateId")) 
                        objFarmer.StateId = Common.ConvertDBNullToInt(dt.Rows[0]["StateId"]);
                    if (dt.Columns.Contains("DistrictId")) 
                        objFarmer.DistrictId = Common.ConvertDBNullToInt(dt.Rows[0]["DistrictId"]);
                    if (dt.Columns.Contains("TalukaId")) 
                        objFarmer.TalukaId = Common.ConvertDBNullToInt(dt.Rows[0]["TalukaId"]);
                    if (dt.Columns.Contains("PinCode")) 
                        objFarmer.PinCode = Common.ConvertDBnullToString(dt.Rows[0]["PinCode"]);
                    if (dt.Columns.Contains("ContactNo")) 
                        objFarmer.ContactNo = Common.ConvertDBnullToString(dt.Rows[0]["ContactNo"]);
                    if (dt.Columns.Contains("MobileNo")) 
                        objFarmer.MobileNo = Common.ConvertDBnullToString(dt.Rows[0]["MobileNo"]);
                    if (dt.Columns.Contains("FarmAddress1")) 
                        objFarmer.FarmAddress1 = Common.ConvertDBnullToString(dt.Rows[0]["FarmAddress1"]);
                    if (dt.Columns.Contains("FarmAddress2")) 
                        objFarmer.FarmAddress2 = Common.ConvertDBnullToString(dt.Rows[0]["FarmAddress2"]);
                    if (dt.Columns.Contains("FarmStateId")) 
                        objFarmer.FarmStateId = Common.ConvertDBNullToInt(dt.Rows[0]["FarmStateId"]);
                    if (dt.Columns.Contains("FarmDistrictId")) 
                        objFarmer.FarmDistrictId = Common.ConvertDBNullToInt(dt.Rows[0]["FarmDistrictId"]);
                    if (dt.Columns.Contains("FarmTalukaId")) 
                        objFarmer.FarmTalukaId = Common.ConvertDBNullToInt(dt.Rows[0]["FarmTalukaId"]);
                    if (dt.Columns.Contains("FarmPinCode")) 
                        objFarmer.FarmPinCode = Common.ConvertDBnullToString(dt.Rows[0]["FarmPinCode"]);
                    if (dt.Columns.Contains("KishanCard")) 
                        objFarmer.KishanCard = Common.ConvertDBnullToString(dt.Rows[0]["KishanCard"]);
                    if (dt.Columns.Contains("FarmEmail")) 
                        objFarmer.FarmEmail = Common.ConvertDBnullToString(dt.Rows[0]["FarmEmail"]);
                    if (dt.Columns.Contains("IsAPMCAssosiated")) 
                        objFarmer.IsAPMCAssosiated = Common.ConvertDBNulltoBoolean(dt.Rows[0]["IsAPMCAssosiated"]);
                    if (dt.Columns.Contains("APMCId")) 
                        objFarmer.APMCId = Common.ConvertDBnullToInt64(dt.Rows[0]["APMCId"]);
                    if (dt.Columns.Contains("RefTypeId")) 
                        objFarmer.RefTypeId = Common.ConvertDBNullToInt(dt.Rows[0]["RefTypeId"]);
                    if (dt.Columns.Contains("RefNameId")) 
                        objFarmer.RefNameId = Common.ConvertDBNullToInt(dt.Rows[0]["RefNameId"]);
                    if (dt.Columns.Contains("DealInFruit")) 
                        objFarmer.DealInFruit = Common.ConvertDBNulltoBoolean(dt.Rows[0]["DealInFruit"]);
                    if (dt.Columns.Contains("DealInVeg")) 
                        objFarmer.DealInVeg = Common.ConvertDBNulltoBoolean(dt.Rows[0]["DealInVeg"]);
                    if (dt.Columns.Contains("DealInOther")) 
                        objFarmer.DealInOther = Common.ConvertDBNulltoBoolean(dt.Rows[0]["DealInOther"]);
                    if (dt.Columns.Contains("DealOther")) 
                        objFarmer.DealOther = Common.ConvertDBnullToString(dt.Rows[0]["DealOther"]);
                    if (dt.Columns.Contains("BankId")) 
                        objFarmer.BankId = Common.ConvertDBNullToInt(dt.Rows[0]["BankId"]);
                    if (dt.Columns.Contains("BranchName")) 
                        objFarmer.BranchName = Common.ConvertDBnullToString(dt.Rows[0]["BranchName"]);
                    if (dt.Columns.Contains("BranchAddress")) 
                        objFarmer.BranchAddress = Common.ConvertDBnullToString(dt.Rows[0]["BranchAddress"]);
                    if (dt.Columns.Contains("AccountNumber")) 
                        objFarmer.AccountNumber = Common.ConvertDBnullToString(dt.Rows[0]["AccountNumber"]);
                    if (dt.Columns.Contains("IFSCCode")) 
                        objFarmer.IFSCCode = Common.ConvertDBnullToString(dt.Rows[0]["IFSCCode"]);
                    if (dt.Columns.Contains("IMAGEAADHAR")) 
                        objFarmer.IMAGEAADHAR = Common.ConvertDBnullToString(dt.Rows[0]["IMAGEAADHAR"]);
                    if (dt.Columns.Contains("IMAGEPAN")) 
                        objFarmer.IMAGEPAN = Common.ConvertDBnullToString(dt.Rows[0]["IMAGEPAN"]);
                    if (dt.Columns.Contains("IMAGEGST")) 
                        objFarmer.IMAGEGST = Common.ConvertDBnullToString(dt.Rows[0]["IMAGEGST"]);
                    if (dt.Columns.Contains("StatusId")) 
                        objFarmer.StatusId = Common.ConvertDBNullToInt(dt.Rows[0]["StatusId"]);
                }
            }

            return objFarmer;
        }
        #endregion

        #region CREATE/UPDATE
        public bool FarmerCRUD(Farmer objFarmer, Enums.Action type)
        {
            bool Return = false;
            ds = new DataSet();
            cmd = new SqlCommand();
            ObjSQLHelper = new SQLHelper();

            try
            {
                switch (type)
                {
                    case Enums.Action.CREATE:
                        cmd.Parameters.AddWithValue("@Action", "CREATE");
                        break;

                    case Enums.Action.UPDATE:
                        cmd.Parameters.AddWithValue("@Action", "UPDATE");
                        break;

                    case Enums.Action.DELETE:
                        cmd.Parameters.AddWithValue("@Action", "DELETE");
                        break;
                }
                cmd.Parameters.AddWithValue("@AutoId", objFarmer.AutoId);
                cmd.Parameters.AddWithValue("@FirstName", objFarmer.FirstName);
                cmd.Parameters.AddWithValue("@MiddleName", objFarmer.MiddleName);
                cmd.Parameters.AddWithValue("@LastName", objFarmer.LastName);
                cmd.Parameters.AddWithValue("@Address1", objFarmer.Address1);
                cmd.Parameters.AddWithValue("@Address2", objFarmer.Address2);
                cmd.Parameters.AddWithValue("@StateId", objFarmer.StateId);
                cmd.Parameters.AddWithValue("@DistrictId", objFarmer.DistrictId);
                cmd.Parameters.AddWithValue("@TalukaId", objFarmer.TalukaId);
                cmd.Parameters.AddWithValue("@PinCode", objFarmer.PinCode);
                cmd.Parameters.AddWithValue("@ContactNo", objFarmer.ContactNo);
                cmd.Parameters.AddWithValue("@MobileNo", objFarmer.MobileNo);
                cmd.Parameters.AddWithValue("@FarmAddress1", objFarmer.FarmAddress1);
                cmd.Parameters.AddWithValue("@FarmAddress2", objFarmer.FarmAddress2);
                cmd.Parameters.AddWithValue("@FarmStateId", objFarmer.FarmStateId);
                cmd.Parameters.AddWithValue("@FarmDistrictId", objFarmer.FarmDistrictId);
                cmd.Parameters.AddWithValue("@FarmTalukaId", objFarmer.FarmTalukaId);
                cmd.Parameters.AddWithValue("@FarmPinCode", objFarmer.FarmPinCode);
                cmd.Parameters.AddWithValue("@KishanCard", objFarmer.KishanCard);
                cmd.Parameters.AddWithValue("@FarmEmail", objFarmer.FarmEmail);
                cmd.Parameters.AddWithValue("@IsAPMCAssosiated", objFarmer.IsAPMCAssosiated);
                cmd.Parameters.AddWithValue("@APMCId", objFarmer.APMCId);
                cmd.Parameters.AddWithValue("@RefTypeId", objFarmer.RefTypeId);
                cmd.Parameters.AddWithValue("@RefNameId", objFarmer.RefNameId);
                cmd.Parameters.AddWithValue("@DealInFruit", objFarmer.DealInFruit);
                cmd.Parameters.AddWithValue("@DealInVeg", objFarmer.DealInVeg);
                cmd.Parameters.AddWithValue("@DealInOther", objFarmer.DealInOther);
                cmd.Parameters.AddWithValue("@DealOther", objFarmer.DealOther);
                cmd.Parameters.AddWithValue("@BankId", objFarmer.BankId);
                cmd.Parameters.AddWithValue("@BranchName", objFarmer.BranchName);
                cmd.Parameters.AddWithValue("@BranchAddress", objFarmer.BranchAddress);
                cmd.Parameters.AddWithValue("@AccountNumber", objFarmer.AccountNumber);
                cmd.Parameters.AddWithValue("@IFSCCode", objFarmer.IFSCCode);
                cmd.Parameters.AddWithValue("@IMAGEAADHAR", objFarmer.IMAGEAADHAR);
                cmd.Parameters.AddWithValue("@IMAGEPAN", objFarmer.IMAGEPAN);
                cmd.Parameters.AddWithValue("@IMAGEGST", objFarmer.IMAGEGST);
                cmd.Parameters.AddWithValue("@StatusId", objFarmer.StatusId);
                cmd.Parameters.AddWithValue("@UserId", objFarmer.UserId);

                string ProcName = "Farmer_SP";
                if (ObjSQLHelper.IUDProcData(ProcName, cmd))
                {
                    ObjSQLHelper.CommitTransaction();
                    Return = true;
                }
                else
                    ObjSQLHelper.RollBackTransaction();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                ObjSQLHelper.RollBackTransaction();
                ObjSQLHelper.ClearObjects();
            }
            finally
            {
                ObjSQLHelper.ClearObjects();
            }
            return Return;
        }
        #endregion
    }
}