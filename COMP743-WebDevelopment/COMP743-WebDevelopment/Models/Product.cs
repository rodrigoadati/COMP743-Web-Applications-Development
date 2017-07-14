using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Data.Linq.Mapping;
using System.Web;

namespace COMP743_WebDevelopment.Models
{
    [Table(Name="Product")]
    public class Product
    {
        [Column(IsPrimaryKey=true)]
        public int Id { get; set; }
        [Column]
        public string Name { get; set; }
        [Column]
        public string Description { get; set; }
        [Column]
        public decimal Price { get; set; }
        [Column]
        public int UnitsInStock { get; set; }
    }
}