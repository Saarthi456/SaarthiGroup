using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace saarthi.Models
{
    public class APMC: CommonBase
    {
        public string Name { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public int StateId { get; set; }
        public int DistrictId { get; set; }
        public int TalukaId { get; set; }
        public string PinCode { get; set; }
        public string ContactNo { get; set; }
        public string MobileNo { get; set; }
        public string EmailId { get; set; }
        public string ChairmanFirstname { get; set; }
        public string ChairmanMiddlename { get; set; }
        public string ChairmanLastname { get; set; }
        public string ChairmanAddress1 { get; set; }
        public string ChairmanAddress2 { get; set; }
        public int ChairmanStateId { get; set; }
        public int ChairmanDistrictId { get; set; }
        public int ChairmanTalukaId { get; set; }
        public string ChairmanPinCode { get; set; }
        public string ChairmanContactNo { get; set; }
        public string ChairmanMobileNo { get; set; }
        public string ChairmanEmailId { get; set; }
        public string SecretaryFirstname { get; set; }
        public string SecretaryMiddlename { get; set; }
        public string SecretaryLastname { get; set; }
        public string SecretaryAddress1 { get; set; }
        public string SecretaryAddress2 { get; set; }
        public int SecretaryStateId { get; set; }
        public int SecretaryDistrictId { get; set; }
        public int SecretaryTalukaId { get; set; }
        public string SecretaryPinCode { get; set; }
        public string SecretaryContactNo { get; set; }
        public string SecretaryMobileNo { get; set; }
        public string SecretaryEmailId { get; set; }
        public int TotalShop { get; set; }
        public int RegisterVendor { get; set; }
        public bool DealInFruit { get; set; }
        public bool DealInVeg { get; set; }
        public bool DealInOther { get; set; }
        public string DealOther { get; set; }
        public int BankId { get; set; }
        public string BranchName { get; set; }
        public string BranchAddress { get; set; }
        public string AccountNumber { get; set; }
        public string IFSCCode { get; set; }
        public string IMAGELOGO { get; set; }
        public string IMAGECERTI { get; set; }
        public string IMAGELICENSE { get; set; }
        public string IMAGEGST { get; set; }
        public int StatusId { get; set; }
    }
}