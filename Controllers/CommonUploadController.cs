using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Data.SqlClient;
using saarthi.Helpers;
using saarthi.Models;
using saarthi.Classes;
using System.Reflection;
using System.IO;

namespace saarthi.Controllers
{
    public class CommonUploadController : Controller
    {
        #region File Upload
        [HttpPost]
        public JsonResult Upload(string userId, string moduleName)
        {
            List<HelperClasses.UploadStatus> uploadStatus = new List<HelperClasses.UploadStatus>();
            if (Request.Files != null && Request.Files.Count != 0)
            {
                for (var i = 0; i < Request.Files.Count; i++)
                {
                    uploadStatus.Add(GetFileUpload(Request.Files[i], userId, moduleName));

                }
            }
            return Json(uploadStatus);
        }

        public HelperClasses.UploadStatus GetFileUpload(HttpPostedFileBase fileUpload, string userId, string moduleName)
        {
            HelperClasses.UploadStatus uploadStatus = new HelperClasses.UploadStatus();
            uploadStatus.FileName = Request.Files[0].FileName;

            if (fileUpload != null)
            {
                if (fileUpload.ContentLength > 0)
                {
                    string fileName = Path.GetFileName(fileUpload.FileName);

                    string proofDocumentsFolder = AppSession.ProofDocuments;
                    string proofDocumentsFolderURL = AppSession.ProofDocumentsURL;

                    if (userId != null)
                    {
                        proofDocumentsFolder = Path.Combine(proofDocumentsFolder + "\\" + "Upload" + "\\" + moduleName + "\\" + userId + "\\");
                        proofDocumentsFolderURL = proofDocumentsFolderURL + "\\" + "Upload" + "\\" + moduleName + "\\" + userId + "\\";
                    }

                    if (!Directory.Exists(proofDocumentsFolder))
                    {
                        Directory.CreateDirectory(proofDocumentsFolder);
                    }

                    GC.Collect();
                    GC.WaitForPendingFinalizers();

                    try
                    {
                        string path = Path.Combine(proofDocumentsFolder + "\\" + fileName.Replace("%", "$"));
                        if (System.IO.File.Exists(path))
                        {
                            string orignalFileName = Path.GetFileNameWithoutExtension(path);
                            string fileExtension = Path.GetExtension(path);
                            string fileDirectory = Path.GetDirectoryName(path);
                            int i = 1;
                            while (true)
                            {
                                string renameFileName = fileDirectory + @"\" + orignalFileName + "(" + i + ")" + fileExtension;
                                if (System.IO.File.Exists(renameFileName))
                                    i++;
                                else
                                {
                                    path = renameFileName;
                                    break;
                                }
                            }

                            fileName = Path.GetFileName(path);
                        }

                        fileName = fileName.Replace("%", "$");

                        if (fileUpload.FileName.Length > 70)
                        {
                            uploadStatus.Status = false;
                            uploadStatus.Message = "BigName";

                        }
                        else
                        {
                            string mimeType = MimeMapping.GetMimeMapping(fileName);
                            fileUpload.SaveAs(path);
                            uploadStatus.Status = true;
                            uploadStatus.Message = "File Uploaded Successfully.";
                            uploadStatus.FileName = fileName;
                            uploadStatus.MimeType = mimeType;

                            uploadStatus.Path = proofDocumentsFolder + uploadStatus.FileName;
                        }

                    }
                    catch (Exception)
                    {
                        uploadStatus.Status = false;
                        uploadStatus.Message = "An error occured while uploading. Please try again later.";
                    }
                }
                else
                {
                    uploadStatus.Status = false;
                    uploadStatus.Message = "No data received";
                }
            }
            else
            {
                uploadStatus.Status = false;
                uploadStatus.Message = "No data received";
            }

            return uploadStatus;
        }

        [HttpGet]
        public ActionResult ViewDownloadFile(string FileName, string FolderName, string moduleName)
        {
            var path = Path.Combine(AppSession.ProofDocumentsURL + "\\" + "Upload" + "\\" + moduleName + "\\" + FolderName, FileName);

            if (System.IO.File.Exists(path))
            {
                var fileData = System.IO.File.ReadAllBytes(path);

                Response.ContentType = "application/octet-stream";
                Response.AddHeader("content-disposition", "attachment;  filename=\"" + FileName + "\"");
                Response.BinaryWrite(fileData);
                Response.End();
            }
            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public JsonResult DeleteFileFromFolder(string fileName, string FolderName, string moduleName)
        {
            DeleteDirectory(Path.Combine(AppSession.ProofDocumentsURL + "\\" + "Upload" + "\\" + moduleName + "\\" + FolderName, fileName));
            //this.ShowMessage(SystemEnums.MessageType.Success, "File has been deleted successfully.");

            if (FolderName.Length == 36)
            {
                string rootPath = AppSession.ProofDocumentsURL + "\\" + "Upload" + "\\" + moduleName + "\\" + FolderName;
                if (Directory.Exists(rootPath))
                {
                    int fCount = Directory.GetFiles(rootPath, "*", SearchOption.AllDirectories).Length;
                    if (Directory.Exists(rootPath) && fCount == 0)
                    {
                        Directory.Delete(rootPath);
                    }
                }
            }
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteSignatureFileFromFolder(string fileName, string FolderName, string OldFileName, string moduleName)
        {
            if (OldFileName != fileName && fileName != null)
            {
                DeleteDirectory(Path.Combine(AppSession.ProofDocumentsURL + "\\" + "Upload" + "\\" + moduleName + "\\" + FolderName, fileName));
                //this.ShowMessage(SystemEnums.MessageType.Success, "File has been deleted successfully.");
            }
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        private void DeleteDirectory(string path)
        {
            if (System.IO.File.Exists(path))
            {
                System.IO.File.Delete(path);
            }
        }

        [AllowAnonymous]
        public JsonResult DeleteFileByID(int UserDocumentID, int shopID, string Documentpath, string moduleName)
        {
            try
            {
                //clsShopRegistration objclsShopRegistration = new clsShopRegistration();
                //int id = objclsShopRegistration.DeleteShopDocument(UserDocumentID);
                //DeleteDirectory(Path.Combine(AppSession.ProofDocumentsURL + "\\" + "Upload" + "\\" + moduleName + "\\" + shopID + "\\" + Documentpath));
                //this.ShowMessage(SystemEnums.MessageType.Success, "File has been deleted successfully.");
            }
            catch
            {
                //this.ShowMessage(SystemEnums.MessageType.Error, "There was an error while File  Business. Please try again later.");
            }

            return Json(true, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}