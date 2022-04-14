

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
let paste = false
let cursor_before_paste = 0
let amount_of_cut = 0

$('#main').keydown(function(e){
	if(e.key == 'Backspace'){
		backspace_key = true
	}
	if(e.key == 'Enter'){
		e.preventDefault()
		let new_cursor = this.selectionStart + column + 1
		this.setSelectionRange(new_cursor, new_cursor)
	}
	if(e.metaKey && e.key=='v'){
		paste = true
		cursor_before_paste = this.selectionStart
		e.preventDefault() /////////////////////////// 削除予定
	}
	if(this.selectionStart != this.selectionEnd){
		if(e.metaKey && e.key=='c'){
			/// 未定
		}else if(e.metaKey && e.key=='x'){
			e.preventDefault() /////////////////////////// 削除しない  直接クリップボードに載せる
			let text = $(this).val()
			let start = this.selectionStart
			let end   = this.selectionEnd
			amount_of_cut = end - start
			navigator.clipboard.writeText(text.slice(start, end))
			text = text.slice(0, start) + text.slice(start, end).replace(/./g, ' ') + text.slice(end)
			$(this).val(text)
		}else if(e.key=='ArrowLeft' || e.key=='ArrowRight' || e.key=='ArrowDown' || e.key=='ArrowUp' ){
			//
		}else{
			e.preventDefault()
		}
	}
})

let old_text = $main.val()

$('#main').on('input', function(e){
	// console.log(e.originalEvent.isComposing)
	let cursor = this.selectionStart
	let text = $(this).val()
	if(backspace_key && old_text[cursor]=='\n'){
		text = text.slice(0,cursor) + '\n' + text.slice(cursor)
	}else if(backspace_key){
		text = text.slice(0,cursor) + ' ' + text.slice(cursor)
	}else if(paste){
		/////////////////////////////////////////////
		// text = 
	}else if(text[cursor]=='\n'){
		text = text.slice(0,cursor-1) + text.slice(cursor)
	}else{
		text = text.slice(0,cursor) + text.slice(cursor+1)
	}
	$(this).val(text)
	this.setSelectionRange(cursor,cursor)
	old_text = text
})

$('#main').keyup(function(e){
	backspace_key = false
	paste = false
})