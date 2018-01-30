# Customize Navbar

You can customize your navbar using this navbar angular directive.

There are four option to customize the navbar.

<h3> 1.Navbar styling </h3>
<h3> 2.Add another menu on navbar </h3>
<h3> 3.Search form </h3>
<h3> 4.Affixed </h3>

<h2> <i> 1.Navbar styling </i> </h2>

You can change the color of the navbar by using toggle button. A boolean value (true/false) on which Bootstrap style to use for the navbar, either normal or inverse.

<h2> <i> 2.Add another menu on navbar </i> </h2>

You can the add the navbar manu on the fly using add another menu on navbar option.

<h2> <i> 3.Search form </i> </h2>

If you want to show or hide the search form in the navbar. Search hidden and search visible  toggle button will do this functionality.
 <ol>
  <li><b>show:</b> A boolean value (true/false) on whether to show the default search form in the navbar. Currently always right aligned.</li>
  <li><b>terms:</b> The search object is two way bound, this is the ngModel for the search form and can be used directly in the parent   controller.</li>
 </ol>

<h2> <i> 4.Affixed </i> </h2>

Either you can customize the navbar in the top or bottom of the page by using affixed option.
<ul><li>A string describing the placement of a fixed navbar, values are either top, bottom. Any string other than "top" or "bottom" will result in the navbar not being affixed at all. Affixing the navbar requires additional CSS, please include the body.navbar-affixed-top & body.navbar-affixed-bottom CSS classes.</li></ul>
