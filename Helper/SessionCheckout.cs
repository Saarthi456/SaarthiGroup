using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Diagnostics;
using System.Web.Mvc;
using System.Web.Routing;

namespace saarthi
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
    public class SessionCheckoutAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            //if (Common.ConvertDBnullToInt64(AppSession.CurrentClientID) <= 0)
            //{
                var ctx = HttpContext.Current;

                if (filterContext.HttpContext.Request.IsAjaxRequest())
                {
                    if (filterContext.HttpContext.Response.StatusCode != 401)
                    {
                        filterContext.HttpContext.Response.StatusCode = 401;
                        filterContext.HttpContext.Response.End();
                    }
                    //filterContext.Result = new RedirectResult("~/Login.aspx");
                }
                else
                {
                    filterContext.HttpContext.Response.Cache.SetExpires(DateTime.UtcNow.AddDays(-1));
                    filterContext.HttpContext.Response.Cache.SetValidUntilExpires(false);
                    filterContext.HttpContext.Response.Cache.SetCacheability(HttpCacheability.NoCache);
                    filterContext.HttpContext.Response.Cache.SetNoStore();
                    filterContext.Result = new RedirectToRouteResult(
                    new RouteValueDictionary
                    {
                            { "controller", "Login" },
                            { "action", "Login" }
                    });
            }
            //}

            base.OnActionExecuting(filterContext);
        }
    }


    //[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    //public class MyAuthorizeAttribute : AuthorizeAttribute
    //{
    //    protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
    //    {
    //        if (filterContext.HttpContext.Request.IsAjaxRequest())
    //        {
    //            filterContext.Result = new JsonResult
    //            {
    //                Data = new
    //                {
    //                    // put whatever data you want which will be sent
    //                    // to the client
    //                    message = "sorry, but you were logged out"
    //                },
    //                JsonRequestBehavior = JsonRequestBehavior.AllowGet
    //            };
    //        }
    //        else
    //        {
    //            base.HandleUnauthorizedRequest(filterContext);
    //        }
    //    }
    //}
}