'use strict';

//Constructor function for the Horns
function Horn(obj){
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.description = obj.discription;
  this.keyword = obj.keyword
  this.horns = obj.hornes

  allImages.push(this);
}

function readJson () {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(hornObj => {
        new Horn(hornObj);
      });
    })
    .then(function() {
      allImages.forEach( horn =>{
        horn.render();
        horn.menu();
      });
    });
}

//Arrays for images
const allImages = [];
const uniqueImages =[];

//Creating render prototype
Horn.prototype.render = function() {
  $('main').append('<div class="hornhere"></div>');

  let $hornhere = $('div[class="hornhere"]');
  let hornTemplate = $('#template').html();

  
  $hornhere.html(hornTemplate);

  // push in the content from constructed objects
  $hornhere.find('h2').text(this.title);
  $hornhere.find('p').text(this.description);
  $hornhere.find('img').attr('src', this.image_url);
  $hornhere.find('h6').text(this.horns)
  $hornhere.removeClass('hornhere');
  $hornhere.attr('class', this.keyword);
}

// Horn menu prototype for selecting horns
Horn.prototype.menu = function(){
    if( uniqueImages.indexOf(this.keyword) === -1){
        $('select').append('<option class = "option"></option>');
        let $option = $('option[class="option"]');
        $option.attr('value', this.keyword);
        $option.text(this.keyword);
        $option.removeClass('option');
        uniqueImages.push(this.keyword);
    }
};

$('select').on('change', function() {
  let $selection = $(this).val();
  if($selection === 'default') {
    $('div').show();
    return;
  }
  $('div').hide();
  $(`div[class = "${$selection}"]`).show();
});


readJson();