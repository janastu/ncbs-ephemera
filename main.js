var Image = Backbone.Model.extend({
  defaults: {
    src: ""
  }
});

var Images = Backbone.Collection.extend({
  model: Image,
  getRandomImage: function(path) {
    path = path || './images/';
    var idx = Math.floor( Math.random() * this.models.length );
    return this.models[ idx ];
  }
});

var EphermeraView = Backbone.View.extend({
  initialize: function(obj) {
    this.collection = obj.collection;
    this.path = './images';
  }, 

  render: function() {
    var img = this.collection.getRandomImage(this.path);
    var elem = document.createElement("img");
    elem.src = this.path + "/" + img.get('src');
    elem.style.width = "50%";
    document.getElementById('img-container').appendChild(elem);
  }
});

var ThumbnailView = Backbone.View.extend({
  initialize: function(obj) {
    this.collection = obj.collection;
    this.path = './images';
  },

  render: function() {
    for (var i = 0; i < this.collection.models.length; i ++) {
      var thumbs = document.createElement("img");
      thumbs.src = this.path + '/' + this.collection.models[i].get('src');
      thumbs.className = 'img-thumbnail col-sm-1';
      thumbs.id = "thumb" + i;
      document.getElementById('thumb-container').appendChild(thumbs);
    } 
  }, 
});

var images = new Images([
	{src: "image1.jpg"},
	{src: "image2.jpg"},
	{src: "image3.jpg"},
	{src: "image4.jpg"},
	{src: "image5.jpg"},
	{src: "image6.jpg"}
]);

var randomImageView = new EphermeraView({collection: images});
randomImageView.render();

var thumbView = new ThumbnailView({collection: images});
thumbView.render();
