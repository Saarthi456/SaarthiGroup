﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace saarthi.Models
{
    public class CommonBase
    {
        public string strAction { get; set; }
        public long AutoId { get; set; }
        public string Ids { get; set; }
        public string UserId { get; set; }
        public string Action { get; set; }
    }

    public class MultiDropdownBase
    {
        public string id { get; set; }
        public string text { get; set; }
    }

    public class MultiDropdown
    {
        public string id { get; set; }
        public string text { get; set; }
        public List<MultiDropdownBase> children { get; set; }
    }

    public class txtAutoComplete
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
}