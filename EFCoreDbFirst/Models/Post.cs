using System;
using System.Collections.Generic;

namespace EFCoreDbFirst.Models;

public partial class Post
{
    public int PostId { get; set; }

    public string Title { get; set; } = null!;

    public string? Content { get; set; }

    public int? BlogId { get; set; }

    public virtual Blog? Blog { get; set; }
}
