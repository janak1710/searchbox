(function($) {
$.searchbox = {}
  
  $.extend(true, $.searchbox, {
    settings: {
      url: 'http://api.wordnik.com:80/v4/words.json/search/?caseSensitive=true&minCorpusCount=5&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=1&maxLength=-1&skip=0&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
      param: 'query',
      dom_id: '#results',
      delay: 5000
    },
    process: function(terms) {
      var path = $.searchbox.settings.url.split('?'),
        base = path[0], params = '?' + path[1]
      var list = "";
     $($.searchbox.settings.dom_id).empty();
      $.get([base, terms, params].join(''), function(data) {
      	$(data.searchResults).each(function(idx, obj){
      		$($.searchbox.settings.dom_id).append($('<li>').append(obj.word));
      	});
      })
    },
    resetTimer: function(timer) {
      if (timer) clearTimeout(timer)
    }
})

    $.fn.searchbox = function(config) {
    var settings = $.extend(true, $.searchbox.settings, config || {})
    
    return this.each(function() {
      var $input = $(this)
      
      $input
      .focus()
      .keyup(function() {
        if ($input.val() != this.previousValue) {
          $.searchbox.resetTimer(this.timer)

          this.timer = setTimeout(function() {  
            $.searchbox.process($input.val())
          }, $.searchbox.settings.delay)
        
          this.previousValue = $input.val()
        }
      })
    })


}})(jQuery);