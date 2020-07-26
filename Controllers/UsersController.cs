using saarthi.Classes;
using saarthi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace saarthi.Controllers
{
    public class UsersController : Controller
    {
        [HttpGet]
        public ActionResult Index(string ShownTab = "")
        {
            if (ShownTab == "")
            {
                ShownTab = "APMC";
            }
            ViewBag.ShownTab = ShownTab;
            Common.LoadCulture();
            return View();
        }

        [HttpGet]
        public ActionResult ShowCredentials(bool isShow = false)
        {
            return View();
        }

        [HttpPost]
        public ActionResult APMC_Registration(APMC objAPMC, HttpPostedFileBase IMAGE_LOGO, HttpPostedFileBase IMAGE_CERTI, HttpPostedFileBase IMAGE_LICENSE, HttpPostedFileBase IMAGE_GST)
        {
            bool Result = false;
            Guid objLogo = Guid.NewGuid();
            Guid objCerti = Guid.NewGuid();
            Guid objLicence = Guid.NewGuid();
            Guid objGST = Guid.NewGuid();

            if (IMAGE_LOGO != null)
            {
                objAPMC.IMAGELOGO = Common.ConvertDBnullToString(objLogo);
                objAPMC.IMAGELOGO = objAPMC.IMAGELOGO + Path.GetExtension(IMAGE_LOGO.FileName);
                string path = Path.Combine(Server.MapPath("~/Upload/APMC/"), objAPMC.IMAGELOGO);
                IMAGE_LOGO.SaveAs(path);
            }

            if (IMAGE_CERTI != null)
            {
                objAPMC.IMAGECERTI = Common.ConvertDBnullToString(objCerti);
                objAPMC.IMAGECERTI = objAPMC.IMAGECERTI + Path.GetExtension(IMAGE_CERTI.FileName);
                string path = Path.Combine(Server.MapPath("~/Upload/APMC/"), objAPMC.IMAGECERTI);
                IMAGE_CERTI.SaveAs(path);
            }

            if (IMAGE_LICENSE != null)
            {
                objAPMC.IMAGELICENSE = Common.ConvertDBnullToString(objLicence);
                objAPMC.IMAGELICENSE = objAPMC.IMAGELICENSE + Path.GetExtension(IMAGE_LICENSE.FileName);
                string path = Path.Combine(Server.MapPath("~/Upload/APMC/"), objAPMC.IMAGELICENSE);
                IMAGE_LICENSE.SaveAs(path);
            }

            if (IMAGE_GST != null)
            {
                objAPMC.IMAGEGST = Common.ConvertDBnullToString(objGST);
                objAPMC.IMAGEGST = objAPMC.IMAGEGST + Path.GetExtension(IMAGE_GST.FileName);
                string path = Path.Combine(Server.MapPath("~/Upload/APMC/"), objAPMC.IMAGEGST);
                IMAGE_GST.SaveAs(path);
            }

            clsAPMC objclsAPMC = new clsAPMC();
            if (objclsAPMC.APMCCRUD(objAPMC, Enums.Action.CREATE))
            {
                Result = true;
            }
            return RedirectToAction("ShowCredentials", "Users", new { isShow = Result });
        }

        [HttpPost]
        public ActionResult Vendor_Registration(Vendor objVendor, HttpPostedFileBase IMAGE_AADHAR, HttpPostedFileBase IMAGE_PAN, HttpPostedFileBase IMAGE_GST)
        {
            bool Result = false;
            Guid objAadhar = Guid.NewGuid();
            Guid objPan = Guid.NewGuid();
            Guid objGST = Guid.NewGuid();

            if (IMAGE_AADHAR != null)
            {
                objVendor.IMAGEAADHAR = Common.ConvertDBnullToString(objAadhar);
                objVendor.IMAGEAADHAR = objVendor.IMAGEAADHAR + Path.GetExtension(IMAGE_AADHAR.FileName);
                string path = Path.Combine(Server.MapPath("~/Upload/APMC/"), objVendor.IMAGEAADHAR);
                IMAGE_AADHAR.SaveAs(path);
            }

            if (IMAGE_PAN != null)
            {
                objVendor.IMAGEPAN = Common.ConvertDBnullToString(objPan);
                objVendor.IMAGEPAN = objVendor.IMAGEPAN + Path.GetExtension(IMAGE_PAN.FileName);
                string path = Path.Combine(Server.MapPath("~/Upload/APMC/"), objVendor.IMAGEPAN);
                IMAGE_PAN.SaveAs(path);
            }

            if (IMAGE_GST != null)
            {
                objVendor.IMAGEGST = Common.ConvertDBnullToString(objGST);
                objVendor.IMAGEGST = objVendor.IMAGEGST + Path.GetExtension(IMAGE_GST.FileName);
                string path = Path.Combine(Server.MapPath("~/Upload/APMC/"), objVendor.IMAGEGST);
                IMAGE_GST.SaveAs(path);
            }

            clsVendor objclsVendor = new clsVendor();
            if (objclsVendor.VendorCRUD(objVendor, Enums.Action.CREATE))
            {
                Result = true;
            }
            return RedirectToAction("ShowCredentials", "Users", new { isShow = Result });
        }

        [HttpPost]
        public ActionResult Farmer_Registration(Farmer objFarmer, HttpPostedFileBase IMAGE_AADHAR, HttpPostedFileBase IMAGE_PAN, HttpPostedFileBase IMAGE_GST)
        {
            bool Result = false;
            Guid objAadhar = Guid.NewGuid();
            Guid objPan = Guid.NewGuid();
            Guid objGST = Guid.NewGuid();

            if (IMAGE_AADHAR != null)
            {
                objFarmer.IMAGEAADHAR = Common.ConvertDBnullToString(objAadhar);
                objFarmer.IMAGEAADHAR = objFarmer.IMAGEAADHAR + Path.GetExtension(IMAGE_AADHAR.FileName);
                string path = Path.Combine(Server.MapPath("~/Upload/APMC/"), objFarmer.IMAGEAADHAR);
                IMAGE_AADHAR.SaveAs(path);
            }

            if (IMAGE_PAN != null)
            {
                objFarmer.IMAGEPAN = Common.ConvertDBnullToString(objPan);
                objFarmer.IMAGEPAN = objFarmer.IMAGEPAN + Path.GetExtension(IMAGE_PAN.FileName);
                string path = Path.Combine(Server.MapPath("~/Upload/APMC/"), objFarmer.IMAGEPAN);
                IMAGE_PAN.SaveAs(path);
            }

            if (IMAGE_GST != null)
            {
                objFarmer.IMAGEGST = Common.ConvertDBnullToString(objGST);
                objFarmer.IMAGEGST = objFarmer.IMAGEGST + Path.GetExtension(IMAGE_GST.FileName);
                string path = Path.Combine(Server.MapPath("~/Upload/APMC/"), objFarmer.IMAGEGST);
                IMAGE_GST.SaveAs(path);
            }
            clsFarmer objclsFarmer = new clsFarmer();
            if (objclsFarmer.FarmerCRUD(objFarmer, Enums.Action.CREATE))
            {
                Result = true;
            }
            return RedirectToAction("ShowCredentials", "Users", new { isShow = Result });
        }

    }
}