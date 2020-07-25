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

    public class clsAPMC
    {
        #region Class Var
        SQLHelper ObjSQLHelper;
        SqlCommand cmd;
        DataSet ds;
        #endregion

        #region Selct Record By Id
        public APMC GetAPMCById(int Id)
        {
            APMC objAPMC = new APMC();
            ds = new DataSet();
            cmd = new SqlCommand();
            ObjSQLHelper = new SQLHelper();
            try
            {
                cmd.Parameters.AddWithValue("@Action", "SELECT");
                cmd.Parameters.AddWithValue("@AutoId", Id);
                ds = ObjSQLHelper.SelectProcDataDS("APMC_SP", cmd);
                objAPMC = SetAPMCInformation(ds);
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
            return objAPMC;
        }

        public APMC SetAPMCInformation(DataSet ds)
        {
            APMC objAPMC = new APMC();
            DataTable dt = new DataTable();
            if (ds != null && ds.Tables.Count > 0)
            {
                if (ds.Tables[0].Rows.Count > 0)
                {
                    dt = ds.Tables[0];

                    if (dt.Columns.Contains("AutoId"))
                        objAPMC.AutoId = Common.ConvertDBnullToInt64(dt.Rows[0]["AutoId"]);
                    if (dt.Columns.Contains("Name"))
                        objAPMC.Name = Common.ConvertDBnullToString(dt.Rows[0]["Name"]);
                    if (dt.Columns.Contains("Address1")) 
                        objAPMC.Address1 = Common.ConvertDBnullToString(dt.Rows[0]["Address1"]);
                    if (dt.Columns.Contains("Address2")) 
                        objAPMC.Address2 = Common.ConvertDBnullToString(dt.Rows[0]["Address2"]);
                    if (dt.Columns.Contains("StateId")) 
                        objAPMC.StateId = Common.ConvertDBNullToInt(dt.Rows[0]["StateId"]);
                    if (dt.Columns.Contains("DistrictId")) 
                        objAPMC.DistrictId = Common.ConvertDBNullToInt(dt.Rows[0]["DistrictId"]);
                    if (dt.Columns.Contains("TalukaId")) 
                        objAPMC.TalukaId = Common.ConvertDBNullToInt(dt.Rows[0]["TalukaId"]);
                    if (dt.Columns.Contains("PinCode")) 
                        objAPMC.PinCode = Common.ConvertDBnullToString(dt.Rows[0]["PinCode"]);
                    if (dt.Columns.Contains("ContactNo")) 
                        objAPMC.ContactNo = Common.ConvertDBnullToString(dt.Rows[0]["ContactNo"]);
                    if (dt.Columns.Contains("MobileNo")) 
                        objAPMC.MobileNo = Common.ConvertDBnullToString(dt.Rows[0]["MobileNo"]);
                    if (dt.Columns.Contains("EmailId")) 
                        objAPMC.EmailId = Common.ConvertDBnullToString(dt.Rows[0]["EmailId"]);
                    if (dt.Columns.Contains("ChairmanFirstname")) 
                        objAPMC.ChairmanFirstname = Common.ConvertDBnullToString(dt.Rows[0]["ChairmanFirstname"]);
                    if (dt.Columns.Contains("ChairmanMiddlename")) 
                        objAPMC.ChairmanMiddlename = Common.ConvertDBnullToString(dt.Rows[0]["ChairmanMiddlename"]);
                    if (dt.Columns.Contains("ChairmanLastname")) 
                        objAPMC.ChairmanLastname = Common.ConvertDBnullToString(dt.Rows[0]["ChairmanLastname"]);
                    if (dt.Columns.Contains("ChairmanAddress1")) 
                        objAPMC.ChairmanAddress1 = Common.ConvertDBnullToString(dt.Rows[0]["ChairmanAddress1"]);
                    if (dt.Columns.Contains("ChairmanAddress2")) 
                        objAPMC.ChairmanAddress2 = Common.ConvertDBnullToString(dt.Rows[0]["ChairmanAddress2"]);
                    if (dt.Columns.Contains("ChairmanStateId")) 
                        objAPMC.ChairmanStateId = Common.ConvertDBNullToInt(dt.Rows[0]["ChairmanStateId"]);
                    if (dt.Columns.Contains("ChairmanDistrictId")) 
                        objAPMC.ChairmanDistrictId = Common.ConvertDBNullToInt(dt.Rows[0]["ChairmanDistrictId"]);
                    if (dt.Columns.Contains("ChairmanTalukaId")) 
                        objAPMC.ChairmanTalukaId = Common.ConvertDBNullToInt(dt.Rows[0]["ChairmanTalukaId"]);
                    if (dt.Columns.Contains("ChairmanPinCode")) 
                        objAPMC.ChairmanPinCode = Common.ConvertDBnullToString(dt.Rows[0]["ChairmanPinCode"]);
                    if (dt.Columns.Contains("ChairmanContactNo")) 
                        objAPMC.ChairmanContactNo = Common.ConvertDBnullToString(dt.Rows[0]["ChairmanContactNo"]);
                    if (dt.Columns.Contains("ChairmanMobileNo")) 
                        objAPMC.ChairmanMobileNo = Common.ConvertDBnullToString(dt.Rows[0]["ChairmanMobileNo"]);
                    if (dt.Columns.Contains("ChairmanEmailId")) 
                        objAPMC.ChairmanEmailId = Common.ConvertDBnullToString(dt.Rows[0]["ChairmanEmailId"]);
                    if (dt.Columns.Contains("SecretaryFirstname")) 
                        objAPMC.SecretaryFirstname = Common.ConvertDBnullToString(dt.Rows[0]["SecretaryFirstname"]);
                    if (dt.Columns.Contains("SecretaryMiddlename")) 
                        objAPMC.SecretaryMiddlename = Common.ConvertDBnullToString(dt.Rows[0]["SecretaryMiddlename"]);
                    if (dt.Columns.Contains("SecretaryLastname")) 
                        objAPMC.SecretaryLastname = Common.ConvertDBnullToString(dt.Rows[0]["SecretaryLastname"]);
                    if (dt.Columns.Contains("SecretaryAddress1")) 
                        objAPMC.SecretaryAddress1 = Common.ConvertDBnullToString(dt.Rows[0]["SecretaryAddress1"]);
                    if (dt.Columns.Contains("SecretaryAddress2")) 
                        objAPMC.SecretaryAddress2 = Common.ConvertDBnullToString(dt.Rows[0]["SecretaryAddress2"]);
                    if (dt.Columns.Contains("SecretaryStateId")) 
                        objAPMC.SecretaryStateId = Common.ConvertDBNullToInt(dt.Rows[0]["SecretaryStateId"]);
                    if (dt.Columns.Contains("SecretaryDistrictId")) 
                        objAPMC.SecretaryDistrictId = Common.ConvertDBNullToInt(dt.Rows[0]["SecretaryDistrictId"]);
                    if (dt.Columns.Contains("SecretaryTalukaId")) 
                        objAPMC.SecretaryTalukaId = Common.ConvertDBNullToInt(dt.Rows[0]["SecretaryTalukaId"]);
                    if (dt.Columns.Contains("SecretaryPinCode")) 
                        objAPMC.SecretaryPinCode = Common.ConvertDBnullToString(dt.Rows[0]["SecretaryPinCode"]);
                    if (dt.Columns.Contains("SecretaryContactNo")) 
                        objAPMC.SecretaryContactNo = Common.ConvertDBnullToString(dt.Rows[0]["SecretaryContactNo"]);
                    if (dt.Columns.Contains("SecretaryMobileNo")) 
                        objAPMC.SecretaryMobileNo = Common.ConvertDBnullToString(dt.Rows[0]["SecretaryMobileNo"]);
                    if (dt.Columns.Contains("SecretaryEmailId")) 
                        objAPMC.SecretaryEmailId = Common.ConvertDBnullToString(dt.Rows[0]["SecretaryEmailId"]);
                    if (dt.Columns.Contains("TotalShop")) 
                        objAPMC.TotalShop = Common.ConvertDBNullToInt(dt.Rows[0]["TotalShop"]);
                    if (dt.Columns.Contains("RegisterVendor")) 
                        objAPMC.RegisterVendor = Common.ConvertDBNullToInt(dt.Rows[0]["RegisterVendor"]);
                    if (dt.Columns.Contains("DealInFruit")) 
                        objAPMC.DealInFruit = Common.ConvertDBNulltoBoolean(dt.Rows[0]["DealInFruit"]);
                    if (dt.Columns.Contains("DealInVeg")) 
                        objAPMC.DealInVeg = Common.ConvertDBNulltoBoolean(dt.Rows[0]["DealInVeg"]);
                    if (dt.Columns.Contains("DealInOther")) 
                        objAPMC.DealInOther = Common.ConvertDBNulltoBoolean(dt.Rows[0]["DealInOther"]);
                    if (dt.Columns.Contains("DealOther")) 
                        objAPMC.DealOther = Common.ConvertDBnullToString(dt.Rows[0]["DealOther"]);
                    if (dt.Columns.Contains("BankId")) 
                        objAPMC.BankId = Common.ConvertDBNullToInt(dt.Rows[0]["BankId"]);
                    if (dt.Columns.Contains("BranchName")) 
                        objAPMC.BranchName = Common.ConvertDBnullToString(dt.Rows[0]["BranchName"]);
                    if (dt.Columns.Contains("BranchAddress")) 
                        objAPMC.BranchAddress = Common.ConvertDBnullToString(dt.Rows[0]["BranchAddress"]);
                    if (dt.Columns.Contains("AccountNumber")) 
                        objAPMC.AccountNumber = Common.ConvertDBnullToString(dt.Rows[0]["AccountNumber"]);
                    if (dt.Columns.Contains("IFSCCode")) 
                        objAPMC.IFSCCode = Common.ConvertDBnullToString(dt.Rows[0]["IFSCCode"]);
                    if (dt.Columns.Contains("IMAGELOGO")) 
                        objAPMC.IMAGELOGO = Common.ConvertDBnullToString(dt.Rows[0]["IMAGELOGO"]);
                    if (dt.Columns.Contains("IMAGECERTI")) 
                        objAPMC.IMAGECERTI = Common.ConvertDBnullToString(dt.Rows[0]["IMAGECERTI"]);
                    if (dt.Columns.Contains("IMAGELICENSE")) 
                        objAPMC.IMAGELICENSE = Common.ConvertDBnullToString(dt.Rows[0]["IMAGELICENSE"]);
                    if (dt.Columns.Contains("IMAGEGST")) 
                        objAPMC.IMAGEGST = Common.ConvertDBnullToString(dt.Rows[0]["IMAGEGST"]);
                    if (dt.Columns.Contains("StatusId")) 
                        objAPMC.StatusId = Common.ConvertDBNullToInt(dt.Rows[0]["StatusId"]);
                }
            }

            return objAPMC;
        }
        #endregion

        #region CREATE/UPDATE
        public bool APMCCRUD(APMC objAPMC, Enums.Action type)
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
                cmd.Parameters.AddWithValue("@AutoId", objAPMC.AutoId);
                cmd.Parameters.AddWithValue("@Name", objAPMC.Name);
                cmd.Parameters.AddWithValue("@Address1", objAPMC.Address1);
                cmd.Parameters.AddWithValue("@Address2", objAPMC.Address2);
                cmd.Parameters.AddWithValue("@StateId", objAPMC.StateId);
                cmd.Parameters.AddWithValue("@DistrictId", objAPMC.DistrictId);
                cmd.Parameters.AddWithValue("@TalukaId", objAPMC.TalukaId);
                cmd.Parameters.AddWithValue("@PinCode", objAPMC.PinCode);
                cmd.Parameters.AddWithValue("@ContactNo", objAPMC.ContactNo);
                cmd.Parameters.AddWithValue("@MobileNo", objAPMC.MobileNo);
                cmd.Parameters.AddWithValue("@EmailId", objAPMC.EmailId);
                cmd.Parameters.AddWithValue("@ChairmanFirstname", objAPMC.ChairmanFirstname);
                cmd.Parameters.AddWithValue("@ChairmanMiddlename", objAPMC.ChairmanMiddlename);
                cmd.Parameters.AddWithValue("@ChairmanLastname", objAPMC.ChairmanLastname);
                cmd.Parameters.AddWithValue("@ChairmanAddress1", objAPMC.ChairmanAddress1);
                cmd.Parameters.AddWithValue("@ChairmanAddress2", objAPMC.ChairmanAddress2);
                cmd.Parameters.AddWithValue("@ChairmanStateId", objAPMC.ChairmanStateId);
                cmd.Parameters.AddWithValue("@ChairmanDistrictId", objAPMC.ChairmanDistrictId);
                cmd.Parameters.AddWithValue("@ChairmanTalukaId", objAPMC.ChairmanTalukaId);
                cmd.Parameters.AddWithValue("@ChairmanPinCode", objAPMC.ChairmanPinCode);
                cmd.Parameters.AddWithValue("@ChairmanContactNo", objAPMC.ChairmanContactNo);
                cmd.Parameters.AddWithValue("@ChairmanMobileNo", objAPMC.ChairmanMobileNo);
                cmd.Parameters.AddWithValue("@ChairmanEmailId", objAPMC.ChairmanEmailId);
                cmd.Parameters.AddWithValue("@SecretaryFirstname", objAPMC.SecretaryFirstname);
                cmd.Parameters.AddWithValue("@SecretaryMiddlename", objAPMC.SecretaryMiddlename);
                cmd.Parameters.AddWithValue("@SecretaryLastname", objAPMC.SecretaryLastname);
                cmd.Parameters.AddWithValue("@SecretaryAddress1", objAPMC.SecretaryAddress1);
                cmd.Parameters.AddWithValue("@SecretaryAddress2", objAPMC.SecretaryAddress2);
                cmd.Parameters.AddWithValue("@SecretaryStateId", objAPMC.SecretaryStateId);
                cmd.Parameters.AddWithValue("@SecretaryDistrictId", objAPMC.SecretaryDistrictId);
                cmd.Parameters.AddWithValue("@SecretaryTalukaId", objAPMC.SecretaryTalukaId);
                cmd.Parameters.AddWithValue("@SecretaryPinCode", objAPMC.SecretaryPinCode);
                cmd.Parameters.AddWithValue("@SecretaryContactNo", objAPMC.SecretaryContactNo);
                cmd.Parameters.AddWithValue("@SecretaryMobileNo", objAPMC.SecretaryMobileNo);
                cmd.Parameters.AddWithValue("@SecretaryEmailId", objAPMC.SecretaryEmailId);
                cmd.Parameters.AddWithValue("@TotalShop", objAPMC.TotalShop);
                cmd.Parameters.AddWithValue("@RegisterVendor", objAPMC.RegisterVendor);
                cmd.Parameters.AddWithValue("@DealInFruit", objAPMC.DealInFruit);
                cmd.Parameters.AddWithValue("@DealInVeg", objAPMC.DealInVeg);
                cmd.Parameters.AddWithValue("@DealInOther", objAPMC.DealInOther);
                cmd.Parameters.AddWithValue("@DealOther", objAPMC.DealOther);
                cmd.Parameters.AddWithValue("@BankId", objAPMC.BankId);
                cmd.Parameters.AddWithValue("@BranchName", objAPMC.BranchName);
                cmd.Parameters.AddWithValue("@BranchAddress", objAPMC.BranchAddress);
                cmd.Parameters.AddWithValue("@AccountNumber", objAPMC.AccountNumber);
                cmd.Parameters.AddWithValue("@IFSCCode", objAPMC.IFSCCode);
                cmd.Parameters.AddWithValue("@IMAGELOGO", objAPMC.IMAGELOGO);
                cmd.Parameters.AddWithValue("@IMAGECERTI", objAPMC.IMAGECERTI);
                cmd.Parameters.AddWithValue("@IMAGELICENSE", objAPMC.IMAGELICENSE);
                cmd.Parameters.AddWithValue("@IMAGEGST", objAPMC.IMAGEGST);
                cmd.Parameters.AddWithValue("@StatusId", objAPMC.StatusId);
                cmd.Parameters.AddWithValue("@UserId", objAPMC.UserId);

                string ProcName = "APMC_SP";
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