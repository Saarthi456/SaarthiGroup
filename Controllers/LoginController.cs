using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Web.Security;
using System.Net;
using System.IO;
using System.Threading;
using saarthi.Models;

namespace saarthi.Controllers
{
    public class LoginController : Controller
    {
        [HttpGet]
        public ActionResult Login()
        {
            Common.LoadCulture();
            return View();
        }

        [HttpPost]
        public JsonResult ChangeLanguage(string cul="") {
            string result = "OK";
            AppSession.AppCulture = cul;
            return Json(result);
        }

        [HttpPost]
        public JsonResult Login(Login objLogin)
        {
            string result = "CANCEL";
            return Json(result);
        }
        public ActionResult Logout()
        {
            Response.AddHeader("Cache-Control", "no-cache, no-store,must-revalidate");
            Response.AddHeader("Pragma", "no-cache");
            Response.AddHeader("Expires", "0");

            Session.Abandon();
            Session.Clear();
            Session.RemoveAll();

            return RedirectToAction("Login", "Login");
        }

    }
}