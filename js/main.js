// Liste for form submit 

document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Save Bookmark
function saveBookmark(e) {
	// Get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	if(!validateForm(siteName, siteUrl)) {
		return false;
	}
	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	/*
	// Local Storage Test
	localStorage.setItem('test', 'Hello World');
	localStorage.getItem('test');
	localStorage.removeItem('test');
	*/

	// Test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null) {
		// Init array
		var bookmarks = [];
		// Add to array
		bookmarks.push(bookmark);
		// Set to LocalStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		// Get bookmarks from LocalStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// Add bookmar to array

		bookmarks.push(bookmark)
		// Rest back to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	}

	// Clear form 
	document.getElementById('myForm').reset();
	//Re-fetch bookmarks 
	fetchBookmarks();
	// Prevent form from submittin
	e.preventDefault();
	
}
// Delete bookmar 
function deleteBookmark(url) {
	// Get bookmar from localstorage 
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	for(var i = 0; i< bookmarks.length; i++) {
		if(bookmarks[i].url == url) {
			// Remove from array
			bookmarks.splice(i, 1);
		}
	}
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	// Rifetch bookmarks 

	fetchBookmarks();
}
// Fetch bookmarks 

function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	var bookmarkResults = document.getElementById('bookmarksResults');

	// Build our output
	bookmarksResults.innerHTML = '';

	for(var i = 0; i < bookmarks.length; i++) {
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += 	'<div class="well">'+
										'<h3>'+name+
										' <a class="btn btn-default" target="_blank" href="'+ url +'">Visit</a> ' +
										' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '
										'</h3>'+
										'</div>'
	}
}

// Valition Form
function validateForm(siteName, siteUrl){
	if(!siteName || !siteUrl) {
		alert('Please fill in the form');
		return false;
	}
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)) {
		alert('Plese us a valid URL');
		return false;
	}

	return true;
}