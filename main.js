

// $(window).keydown(function(e){
// })

let $main = $('#main')
let column = 100
let row = 40

let default_text = (' '.repeat(column) + '\n').repeat(row).slice(0,-1)
// $('#main').val('aaaaaaaaa\nbbbbbb')
$main.val(default_text)
$main.focus()
$main[0].setSelectionRange(0,0)
$main[0].scrollTop = 0
// window.scrollTop = 0

let backspace_key = false

$('#main').keydown(function(e){
	if(e.key == 'Backspace'){
		backspace_key = true
	}
	if(e.key == 'Enter'){
		e.preventDefault()
	}
})

$('#main').on('input', function(e){
	// console.log(e.originalEvent.isComposing)
	let cursor = this.selectionStart
	let text = $(this).val()
	if(backspace_key){
		text = text.slice(0,cursor) + ' ' + text.slice(cursor)
	}else if(text[cursor]=='\n'){
		text = text.slice(0,cursor-1) + text.slice(cursor)
	}else{
		text = text.slice(0,cursor) + text.slice(cursor+1)
	}
	$(this).val(text)
	this.setSelectionRange(cursor,cursor)
})

$('#main').keyup(function(e){
	backspace_key = false
})