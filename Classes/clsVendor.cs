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
    public class clsVendor
    {
        #region Class Var
        SQLHelper ObjSQLHelper;
        SqlCommand cmd;
        DataSet ds;
        #endregion

        #region Selct Record By Id
        public Vendor GetVendorById(int Id)
        {
            Vendor objVendor = new Vendor();
            ds = new DataSet();
            cmd = new SqlCommand();
            ObjSQLHelper = new SQLHelper();
            try
            {
                cmd.Parameters.AddWithValue("@Action", "SELECT");
                cmd.Parameters.AddWithValue("@AutoId", Id);
                ds = ObjSQLHelper.SelectProcDataDS("Vendor_SP", cmd);
                objVendor = SetVendorInformation(ds);
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
            return objVendor;
        }

        public Vendor SetVendorInformation(DataSet ds)
        {
            Vendor objVendor = new Vendor();
            DataTable dt = new DataTable();
            if (ds != null && ds.Tables.Count > 0)
            {
                if (ds.Tables[0].Rows.Count > 0)
                {
                    dt = ds.Tables[0];

                    if (dt.Columns.Contains("AutoId")) 
                        objVendor.AutoId = Common.ConvertDBnullToInt64(dt.Rows[0]["AutoId"]);
                    if (dt.Columns.Contains("FirstName")) 
                        objVendor.FirstName = Common.ConvertDBnullToString(dt.Rows[0]["FirstName"]);
                    if (dt.Columns.Contains("MiddleName")) 
                        objVendor.MiddleName = Common.ConvertDBnullToString(dt.Rows[0]["MiddleName"]);
                    if (dt.Columns.Contains("LastName")) 
                        objVendor.LastName = Common.ConvertDBnullToString(dt.Rows[0]["LastName"]);
                    if (dt.Columns.Contains("Address1")) 
                        objVendor.Address1 = Common.ConvertDBnullToString(dt.Rows[0]["Address1"]);
                    if (dt.Columns.Contains("Address2")) 
                        objVendor.Address2 = Common.ConvertDBnullToString(dt.Rows[0]["Address2"]);
                    if (dt.Columns.Contains("StateId")) 
                        objVendor.StateId = Common.ConvertDBNullToInt(dt.Rows[0]["StateId"]);
                    if (dt.Columns.Contains("DistrictId")) 
                        objVendor.DistrictId = Common.ConvertDBNullToInt(dt.Rows[0]["DistrictId"]);
                    if (dt.Columns.Contains("TalukaId")) 
                        objVendor.TalukaId = Common.ConvertDBNullToInt(dt.Rows[0]["TalukaId"]);
                    if (dt.Columns.Contains("PinCode")) 
                        objVendor.PinCode = Common.ConvertDBnullToString(dt.Rows[0]["PinCode"]);
                    if (dt.Columns.Contains("ContactNo")) 
                        objVendor.ContactNo = Common.ConvertDBnullToString(dt.Rows[0]["ContactNo"]);
                    if (dt.Columns.Contains("MobileNo")) 
                        objVendor.MobileNo = Common.ConvertDBnullToString(dt.Rows[0]["MobileNo"]);
                    if (dt.Columns.Contains("ResidanceAddress1")) 
                        objVendor.ResidanceAddress1 = Common.ConvertDBnullToString(dt.Rows[0]["ResidanceAddress1"]);
                    if (dt.Columns.Contains("ResidanceAddress2")) 
                        objVendor.ResidanceAddress2 = Common.ConvertDBnullToString(dt.Rows[0]["ResidanceAddress2"]);
                    if (dt.Columns.Contains("ResidanceStateId")) 
                        objVendor.ResidanceStateId = Common.ConvertDBNullToInt(dt.Rows[0]["ResidanceStateId"]);
                    if (dt.Columns.Contains("ResidanceDistrictId")) 
                        objVendor.ResidanceDistrictId = Common.ConvertDBNullToInt(dt.Rows[0]["ResidanceDistrictId"]);
                    if (dt.Columns.Contains("ResidanceTalukaId")) 
                        objVendor.ResidanceTalukaId = Common.ConvertDBNullToInt(dt.Rows[0]["ResidanceTalukaId"]);
                    if (dt.Columns.Contains("ResidancePinCode")) 
                        objVendor.ResidancePinCode = Common.ConvertDBnullToString(dt.Rows[0]["ResidancePinCode"]);
                    if (dt.Columns.Contains("ResidanceContactNo")) 
                        objVendor.ResidanceContactNo = Common.ConvertDBnullToString(dt.Rows[0]["ResidanceContactNo"]);
                    if (dt.Columns.Contains("ResidanceMobileNo")) 
                        objVendor.ResidanceMobileNo = Common.ConvertDBnullToString(dt.Rows[0]["ResidanceMobileNo"]);
                    if (dt.Columns.Contains("IsAPMCAssosiated")) 
                        objVendor.IsAPMCAssosiated = Common.ConvertDBNulltoBoolean(dt.Rows[0]["IsAPMCAssosiated"]);
                    if (dt.Columns.Contains("APMCId")) 
                        objVendor.APMCId = Common.ConvertDBnullToInt64(dt.Rows[0]["APMCId"]);
                    if (dt.Columns.Contains("RefTypeId")) 
                        objVendor.RefTypeId = Common.ConvertDBNullToInt(dt.Rows[0]["RefTypeId"]);
                    if (dt.Columns.Contains("RefNameId")) 
                        objVendor.RefNameId = Common.ConvertDBNullToInt(dt.Rows[0]["RefNameId"]);
                    if (dt.Columns.Contains("DealInFruit")) 
                        objVendor.DealInFruit = Common.ConvertDBNulltoBoolean(dt.Rows[0]["DealInFruit"]);
                    if (dt.Columns.Contains("DealInVeg")) 
                        objVendor.DealInVeg = Common.ConvertDBNulltoBoolean(dt.Rows[0]["DealInVeg"]);
                    if (dt.Columns.Contains("DealInOther")) 
                        objVendor.DealInOther = Common.ConvertDBNulltoBoolean(dt.Rows[0]["DealInOther"]);
                    if (dt.Columns.Contains("DealOther")) 
                        objVendor.DealOther = Common.ConvertDBnullToString(dt.Rows[0]["DealOther"]);
                    if (dt.Columns.Contains("BankId")) 
                        objVendor.BankId = Common.ConvertDBNullToInt(dt.Rows[0]["BankId"]);
                    if (dt.Columns.Contains("BranchName")) 
                        objVendor.BranchName = Common.ConvertDBnullToString(dt.Rows[0]["BranchName"]);
                    if (dt.Columns.Contains("BranchAddress")) 
                        objVendor.BranchAddress = Common.ConvertDBnullToString(dt.Rows[0]["BranchAddress"]);
                    if (dt.Columns.Contains("AccountNumber")) 
                        objVendor.AccountNumber = Common.ConvertDBnullToString(dt.Rows[0]["AccountNumber"]);
                    if (dt.Columns.Contains("IFSCCode")) 
                        objVendor.IFSCCode = Common.ConvertDBnullToString(dt.Rows[0]["IFSCCode"]);
                    if (dt.Columns.Contains("IMAGEAADHAR")) 
                        objVendor.IMAGEAADHAR = Common.ConvertDBnullToString(dt.Rows[0]["IMAGEAADHAR"]);
                    if (dt.Columns.Contains("IMAGEPAN")) 
                        objVendor.IMAGEPAN = Common.ConvertDBnullToString(dt.Rows[0]["IMAGEPAN"]);
                    if (dt.Columns.Contains("IMAGEGST")) 
                        objVendor.IMAGEGST = Common.ConvertDBnullToString(dt.Rows[0]["IMAGEGST"]);
                    if (dt.Columns.Contains("StatusId")) 
                        objVendor.StatusId = Common.ConvertDBNullToInt(dt.Rows[0]["StatusId"]);
                }
            }

            return objVendor;
        }
        #endregion

        #region CREATE/UPDATE
        public bool VendorCRUD(Vendor objVendor, Enums.Action type)
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
                cmd.Parameters.AddWithValue("@AutoId", objVendor.AutoId);
                cmd.Parameters.AddWithValue("@FirstName", objVendor.FirstName);
                cmd.Parameters.AddWithValue("@MiddleName", objVendor.MiddleName);
                cmd.Parameters.AddWithValue("@LastName", objVendor.LastName);
                cmd.Parameters.AddWithValue("@Address1", objVendor.Address1);
                cmd.Parameters.AddWithValue("@Address2", objVendor.Address2);
                cmd.Parameters.AddWithValue("@StateId", objVendor.StateId);
                cmd.Parameters.AddWithValue("@DistrictId", objVendor.DistrictId);
                cmd.Parameters.AddWithValue("@TalukaId", objVendor.TalukaId);
                cmd.Parameters.AddWithValue("@PinCode", objVendor.PinCode);
                cmd.Parameters.AddWithValue("@ContactNo", objVendor.ContactNo);
                cmd.Parameters.AddWithValue("@MobileNo", objVendor.MobileNo);
                cmd.Parameters.AddWithValue("@ResidanceAddress1", objVendor.ResidanceAddress1);
                cmd.Parameters.AddWithValue("@ResidanceAddress2", objVendor.ResidanceAddress2);
                cmd.Parameters.AddWithValue("@ResidanceStateId", objVendor.ResidanceStateId);
                cmd.Parameters.AddWithValue("@ResidanceDistrictId", objVendor.ResidanceDistrictId);
                cmd.Parameters.AddWithValue("@ResidanceTalukaId", objVendor.ResidanceTalukaId);
                cmd.Parameters.AddWithValue("@ResidancePinCode", objVendor.ResidancePinCode);
                cmd.Parameters.AddWithValue("@ResidanceContactNo", objVendor.ResidanceContactNo);
                cmd.Parameters.AddWithValue("@ResidanceMobileNo", objVendor.ResidanceMobileNo);
                cmd.Parameters.AddWithValue("@IsAPMCAssosiated", objVendor.IsAPMCAssosiated);
                cmd.Parameters.AddWithValue("@APMCId", objVendor.APMCId);
                cmd.Parameters.AddWithValue("@RefTypeId", objVendor.RefTypeId);
                cmd.Parameters.AddWithValue("@RefNameId", objVendor.RefNameId);
                cmd.Parameters.AddWithValue("@DealInFruit", objVendor.DealInFruit);
                cmd.Parameters.AddWithValue("@DealInVeg", objVendor.DealInVeg);
                cmd.Parameters.AddWithValue("@DealInOther", objVendor.DealInOther);
                cmd.Parameters.AddWithValue("@DealOther", objVendor.DealOther);
                cmd.Parameters.AddWithValue("@BankId", objVendor.BankId);
                cmd.Parameters.AddWithValue("@BranchName", objVendor.BranchName);
                cmd.Parameters.AddWithValue("@BranchAddress", objVendor.BranchAddress);
                cmd.Parameters.AddWithValue("@AccountNumber", objVendor.AccountNumber);
                cmd.Parameters.AddWithValue("@IFSCCode", objVendor.IFSCCode);
                cmd.Parameters.AddWithValue("@IMAGEAADHAR", objVendor.IMAGEAADHAR);
                cmd.Parameters.AddWithValue("@IMAGEPAN", objVendor.IMAGEPAN);
                cmd.Parameters.AddWithValue("@IMAGEGST", objVendor.IMAGEGST);
                cmd.Parameters.AddWithValue("@StatusId", objVendor.StatusId);
                cmd.Parameters.AddWithValue("@UserId", objVendor.UserId);

                string ProcName = "Vendor_SP";
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