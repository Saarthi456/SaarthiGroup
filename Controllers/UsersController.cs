using saarthi.Classes;
using saarthi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace saarthi.Controllers
{
    public class UsersController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult ShowCredentials(bool isShow = false)
        {
            return View();
        }

        [HttpPost]
        public ActionResult APMC_Registration(APMC objAPMC) {
            bool Result = false;
            clsAPMC objclsAPMC = new clsAPMC();
            if (objclsAPMC.APMCCRUD(objAPMC, Enums.Action.CREATE))
            {
                Result = true;
            }
            return RedirectToAction("ShowCredentials", "Users", new { isShow = Result });
        }

        [HttpPost]
        public ActionResult Vendor_Registration(Vendor objVendor)
        {
            bool Result = false;
            clsVendor objclsVendor = new clsVendor();
            if (objclsVendor.VendorCRUD(objVendor, Enums.Action.CREATE))
            {
                Result = true;
            }
            return RedirectToAction("ShowCredentials", "Users", new { isShow = Result });
        }

        [HttpPost]
        public ActionResult Farmer_Registration(Farmer objFarmer)
        {
            bool Result = false;
            clsFarmer objclsFarmer = new clsFarmer();
            if (objclsFarmer.FarmerCRUD(objFarmer, Enums.Action.CREATE))
            {
                Result = true;
            }
            return RedirectToAction("ShowCredentials", "Users", new { isShow = Result });
        }
    }
}