'use strict';

//Constructor function for the Horns
function Horn(obj){
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword
  this.horns = obj.horns
  this.class = obj.keyword
  allImages.push(this);
}



//Arrays for images
let allImages = [];
let uniqueImages =[];

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
  $hornhere.find('h6').text('This being has ' + this.horns + ' horns!')
  $hornhere.removeClass('hornhere');
  $hornhere.attr('class', this.keyword);
}

//Horn menu prototype for selecting horns
Horn.prototype.menu = function(){
    if( uniqueImages.indexOf(this.keyword) === -1){
        $('#keyword').append('<option class = "test1"></option>');
        let $test1 = $('option[class="test1"]');
        $test1.attr('value', this.keyword);
        $test1.text(this.keyword);
        $test1.removeClass('test1');
        uniqueImages.push(this.keyword);
    }
};

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

$('#keyword').on('change', function() {
  let selection = $(this).val();

  if(selection === "default") {
    $('div').show();
    return;
  } else {
  $('div').hide();
  $(`div[class = "${selection}"]`).show();
  console.log($selection);
  }
});



$(() => readJson());