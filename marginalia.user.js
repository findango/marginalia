// ==UserScript==
// @name		   KindleNotes
// @namespace	   http://github.com/findango/marginalia
// @description    Improve the kindle notes and highlights page.
// @include		   http://kindle.amazon.com/your_highlights
// @include		   http://kindle.amazon.com/work/*
// @resource	   kindlestyle http://github.com/findango/marginalia/raw/master/kindlestyle.css
// ==/UserScript==


hideDefaultIcons = true // hide the default quote icon for entries you haven't annotated
spacerImage = "http://github.com/spetschu/marginalia/raw/master/images/spacer.jpg"

// Ideally, images should be 22x18 pixels although larger ones will be squashed down to that size.
tags = {
	'q'  : "http://github.com/spetschu/marginalia/raw/master/images/q.png",
	'qq' : "http://github.com/spetschu/marginalia/raw/master/images/qq.png",
	'b'  : "http://github.com/spetschu/marginalia/raw/master/images/b.png",
	'bb' : "http://github.com/spetschu/marginalia/raw/master/images/bb.png",
	'qb' : "http://github.com/spetschu/marginalia/raw/master/images/qb.png",
	'bq' : "http://github.com/spetschu/marginalia/raw/master/images/bq.png",
	'd'  : "http://github.com/spetschu/marginalia/raw/master/images/d.png",
	'ch' : "http://github.com/spetschu/marginalia/raw/master/images/ch.png",
	's'  : "http://github.com/spetschu/marginalia/raw/master/images/ch.png"
}

//--------- do not edit below unless you know what you're doing ------

addGlobalStyle(GM_getResourceText("kindlestyle"))
handleNotesAndHighlights() 

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function handleNotesAndHighlights() {
	var allDivs = xpath("//div[@class='highlightRow personalHighlight'] | //div[@class='highlightRow yourHighlight']", document);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		var thisDiv = allDivs.snapshotItem(i)
		var noteSpan = xpath( ".//span[@class='noteContent']", thisDiv).snapshotItem(0)
		var noteText = noteSpan.innerHTML
		console.log('Found note: ' + noteText)
		var annotation = parseAnnotation(noteText)
		var img = xpath( ".//img[@class='quote removableQuote']", thisDiv).snapshotItem(0)
		if (annotation) {
			noteSpan.innerHTML = annotation['note']
		}
		if(img) {
			img.width = 22
			img.height = 18
			if (annotation) {
				img.src = annotation['tag']
			} else if (hideDefaultIcons) {
				img.src = spacerImage
			}
		}
	}
}

function parseAnnotation(noteText) {
	var result = noteText.match(/^\.(\w+)(\s+|$)(.*)/)
	if (result) {
		if (tags[result[1]]) {
			console.log('Matched tag! ' + result)
			return { 'tag' : tags[result[1]], 'note' : result[3] }
		} else {
			console.log('Unknown tag: ' + result[1])
		}
	}
}

function xpath(path, context) {
	if (context == null) { context = document }
	return document.evaluate(path, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}


