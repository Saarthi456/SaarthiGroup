using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace saarthi.Models
{
    public class Vendor : CommonBase
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public int StateId { get; set; }
        public int DistrictId { get; set; }
        public int TalukaId { get; set; }
        public string PinCode { get; set; }
        public string ContactNo { get; set; }
        public string MobileNo { get; set; }
        public string ResidanceAddress1 { get; set; }
        public string ResidanceAddress2 { get; set; }
        public int ResidanceStateId { get; set; }
        public int ResidanceDistrictId { get; set; }
        public int ResidanceTalukaId { get; set; }
        public string ResidancePinCode { get; set; }
        public string ResidanceContactNo { get; set; }
        public string ResidanceMobileNo { get; set; }
        public bool IsAPMCAssosiated { get; set; }
        public long APMCId { get; set; }
        public int RefTypeId { get; set; }
        public int RefNameId { get; set; }
        public bool DealInFruit { get; set; }
        public bool DealInVeg { get; set; }
        public bool DealInOther { get; set; }
        public string DealOther { get; set; }
        public int BankId { get; set; }
        public string BranchName { get; set; }
        public string BranchAddress { get; set; }
        public string AccountNumber { get; set; }
        public string IFSCCode { get; set; }
        public string IMAGEAADHAR { get; set; }
        public string IMAGEPAN { get; set; }
        public string IMAGEGST { get; set; }
        public int StatusId { get; set; }
    }
}