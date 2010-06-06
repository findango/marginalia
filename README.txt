Marginalia
----------

Improved highlighting for the Kindle website in the form of a Google Chrome 
extension and a Greasemonkey script.

These scripts will enhance the display of highlights and notes on the
http://kindle.amazon.com/ site.

Installation Notes

- Clicking on the marginalia.user.js file directly from github.com DOES NOT WORK. It tries to save the whole HTML page. Right-clicking... Save As also does not work.
- Get the marginalia.user.js file onto your harddrive by cloning the repository.
- Firefox notes:
  - Right-click on the marginalia.user.js file on your harddrive and "Open with..." Firefox.
  - This ensures the headers are loaded properly. If you use "New User Script" in Greasemonkey and cut'n'paste the script in, it will not parse the headers. Headers are only parsed at load time, later changes will not be re-read unless you delete and re-install the script.
