
using COMP743_WebDevelopment.Infrastructure;
using COMP743_WebDevelopment.Models;
using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace COMP743_WebDevelopment.Controllers
{
    public class HomeController : Controller
    {
        DataContext context;

        public HomeController()
        {
            this.context = new DataContext(Connections.connection);
        }

        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult GetProducts()
        {
            Product[] products = context.GetTable<Product>().ToArray();
            return PartialView(products);
        }

        public PartialViewResult ChangeProductPrice(int id, decimal newPrice)
        {
            IList<Product> products = context.GetTable<Product>().ToArray();
            Product product = products.Where(p => p.Id == id).Single();
            product.Price = newPrice;
            context.SubmitChanges();
            return PartialView("GetProducts", products);
        }
    }
}