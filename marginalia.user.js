// ==UserScript==
// @name           KindleNotes
// @namespace      http://github.com/findango/marginalia
// @description    Improve the kindle notes and highlights page.
// @include        http://kindle.amazon.com/your_highlights
// @include        http://kindle.amazon.com/work/*
// ==/UserScript==


exclamation = "http://t0.gstatic.com/images?q=tbn:FRf08rT-Dl5aRM:http://www.camsoft.co.kr/CrystalMaker/shared_resources/exclamation_icon.jpg"
question = "http://t0.gstatic.com/images?q=tbn:-4NE6tle87-UiM:http://upload.wikimedia.org/wikipedia/commons/3/33/White_square_with_question_mark.png"
star = "http://t3.gstatic.com/images?q=tbn:8naXDQOs4h6FyM:http://www.kshousingcorp.org:8081/images/Star%2520Pictures/large_gold_star.png"

tags = {
	'q'  : question,
	'qq' : question,
	'b'  : exclamation,
	'bb' : exclamation,
	'qb' : question,
	'bq' : exclamation,
	's'  : star
}

//--------- do not edit below unless you know what you're doing ------

addGlobalStyle('span.noteContent { color: red ! important; }')
handleNotes()

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function handleNotes() {
	var allDivs = xpath("//div[@class='highlightRow personalHighlight']", document)
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		var thisDiv = allDivs.snapshotItem(i)
		var span = xpath( ".//span[@class='noteContent']", thisDiv).snapshotItem(0)
		var note = span.innerHTML
		console.log('Found note: ' + note)
		//thisDiv.childElements[0].src = exclam 
		var img = xpath( ".//img[@class='quote removableQuote']", thisDiv).snapshotItem(0)
		var tag = parseAnnotation(note)
		if (tag) { 
			img.width = 22
			img.height = 18 
			img.src = tag 
		}
	}
}

function parseAnnotation(note) {
	var result = note.match(/^\.(\w+)(\s+|$)/)
	if (result) {
		if (tags[result[1]]) {
			console.log("Matched tag! " + result)
			return tags[result[1]]
		} else {
			console.log('Unknown tag: ' + result[1]) 
		}
	}
}

function xpath(path, context) {
	if (context == null) { context = document }
	return document.evaluate(path, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
