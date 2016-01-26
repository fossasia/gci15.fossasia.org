# Adding Blog Posts

To add blogposts to the site, follow these directions:

1. Copy your blog post and go to a HTML cleaning service like [HTML Cleaner](http://www.html-cleaner.com/) and then paste that result in a formatter that removes line breaks like [Line Break Remover](www.textfixer.com/tools/remove-line-breaks.php).  
2. Go to *blogData.js* and append this text to the array:  ``` '<h3>title</h3><h4>author</h4>Blog Content'```   
3. Add a 240x240 PNG screenshot of the blog post to the *img* folder naming it one more than the previous id (i.e. if the previous file was named 30, name your file 31).  
4. In *loadblog.html*, copy the format below and append it to the `grideee` section:  

```
  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-3">
    <a href="http://codethejason.github.io/blog/gciexperience/" onclick="displayBlog(this, event, [previous id +1])" data-path-hover="m 180,34.57627 -180,0 L 0,0 180,0 z" id="eli">
	    <figure>
		  <img src="img/blogs/[previous id +1].png"/>
		  <svg viewBox="0 0 180 320" preserveAspectRatio="none"><path d="M 180,160 0,218 0,0 180,0 z"/></svg>
		  <figcaption>
		    <h2>title</h2>
		    <p>author</p>
		    <button>View Blog</button>
		  </figcaption>
	    </figure>
	  </a>
  </div>
```