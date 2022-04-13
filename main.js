

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
let cut = false
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
			cut = true
			amount_of_cut = Math.abs(this.selectionEnd - this.selectionStart)
			e.preventDefault() /////////////////////////// 削除しない  直接クリップボードに載せる
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
	}else if(cut){
		// text = text.slice(0,cursor) + ' '.repeat(amount_of_cut) + text.slice(cursor)  // 行を跨ぐ場合の修正が必要
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
	cut = false
})