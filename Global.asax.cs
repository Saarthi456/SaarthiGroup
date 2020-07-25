using saarthi.App_Start;
using saarthi.Properties;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Westwind.Globalization;
using Westwind.Utilities;

namespace saarthi
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            var config = DbResourceConfiguration.Current;
            config.ConnectionString = "ERPConnection";
            config.DbResourceDataManagerType = typeof(DbResourceSqlServerDataManager);
            GeneratedResourceSettings.ResourceAccessMode = ResourceAccessMode.DbResourceManager;
        }

        protected void Application_BeginRequest()
        {
           WebUtils.SetUserLocale(allowedLocales: "en,hi,gu");
        }
    }
}
