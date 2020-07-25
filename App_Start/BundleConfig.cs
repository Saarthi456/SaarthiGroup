using System.Web.Optimization;

namespace saarthi
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //bundles.IgnoreList.Clear();

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jQuery-2.1.4.min.js",
                        "~/Scripts/jquery-ui-1.10.1.custom.min.js",
                        "~/assets/js/core/libraries/bootstrap.min.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/ThemeJS").Include(
                        "~/assets/js/plugins/forms/styling/uniform.min.js",
                        "~/assets/js/plugins/forms/styling/switchery.min.js",
                        "~/assets/js/plugins/forms/styling/switch.min.js",
                        "~/assets/js/plugins/forms/selects/bootstrap_multiselect.js",
                        "~/assets/js/plugins/ui/moment/moment.min.js",
                        "~/assets/js/plugins/pickers/daterangepicker.js",
                        "~/assets/js/plugins/notifications/sweet_alert.min.js",
                        "~/assets/js/plugins/notifications/pnotify.min.js",
                        "~/assets/js/plugins/notifications/noty.min.js",
                        "~/assets/js/plugins/forms/selects/select2.min.js",
                        "~/assets/js/core/app.js",
                        "~/assets/js/pages/components_modals.js",
                        "~/assets/js/pages/components_popups.js",
                        "~/assets/js/pages/form_layouts.js",
                        "~/assets/js/pages/form_checkboxes_radios.js",
                        "~/assets/bootstrap-datepicker/bootstrap-datepicker.js"
                       ));

            bundles.Add(new StyleBundle("~/bundles/icon").Include(
                      "~/css/icomoon-style.css",
                      "~/css/font-awesome-style.min.css"));

            bundles.Add(new StyleBundle("~/bundles/css").Include(
                      "~/css/bootstrap.css",
                      "~/css/core.css",
                      "~/css/components.css",
                      "~/css/colors.css",
                      "~/css/style.css",
                      "~/assets/Toastr/toastr.min.css",
                      "~/css/bootstrap-datepicker.css",
                      "~/css/Ionicons/css/ionicons.min.css"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/MasterJSCustom").Include(
                        "~/Scripts/OperationJS/FormOperations.js",
                        "~/Scripts/OperationJS/Common.js",
                        "~/Scripts/Toastr/toastr.min.js",
                        "~/Scripts/OperationJS/shortcut.js",
                        "~/Scripts/OperationJS/jtableOperation.js"));

            //BundleTable.EnableOptimizations = true;
        }
    }
}
