var Image = Backbone.Model.extend({
	defaults: {
	    src: ""
	}
});

var Images = Backbone.Collection.extend({
	model: Image,
	getRandomImage: function(path) {
	    path = path || './img/Ephemera';
        var idx = Math.floor( Math.random() * this.models.length );
        return this.models[ idx ];
        // console.log(this.models [ idx ])
	}
});

var EphermeraView = Backbone.View.extend({
	initialize: function(obj) {
        this.collection = obj.collection;
	    this.path = './img/Ephemera';
	}, 
	render: function() {
	    var img = this.collection.getRandomImage(this.path);
			var curatorialNote = document.createElement('div');
			curatorialNote.className = "curatorialNote	"
			curatorialNote.innerHTML = '<br> <h3>"Ephemera focuses on a single image of curiosity from across the history of NCBS, TIFR and their communities."</h3> <p>See the caption below for more details. Each refresh results in a new image.</p>';

			var ephemeraDiv = document.getElementById('img-container');
			ephemeraDiv.id = "ephemera-container";
			ephemeraDiv.className = "container";
	    	
	    	var captionDiv = document.createElement('div');
	        captionDiv.innerHTML = img.get('caption');
	       	captionDiv.className = 'captionEphImg col-md-12';

	       	ephemeraDiv.appendChild(curatorialNote);
	       	
	    	if (img.get('type') == "image") {
		        var elem = document.createElement("img");
		        elem.src = this.path + "/" + img.get('src');
	    	    elem.style.width = "100%";
	    	    ephemeraDiv.appendChild(elem);
	        	ephemeraDiv.appendChild(captionDiv);

		    }
		    else {
		        var elem = document.createElement("video");
		        elem.src = this.path + "/" + img.get('src');
		        elem.style.width = "100%";
		        elem.controls = "true";
		        elem.play()
		        ephemeraDiv.appendChild(elem);
				ephemeraDiv.appendChild(captionDiv);		        
	    }
	}
});

var images = new Images([
	{type: "image", src: "1960s-70s-Stahl-and-OS-awards-ceremonial.jpg", caption: "In the late 1960s, Frank Stahl (right), a renowned biologist, came for a workshop to TIFR. Here, he participates (in ceremonial attire, a one-time event) in an awards function for those who attended a course in phage genetics."},
	{type: "image", src: "1990-92-Bangalore-Land-File-Log-Book 1.jpg", caption : "File 181 in TIFR is synonymous with all things related to the TIFR Centre. People would check the logbook in and out, and it got especially busy in the years between 1990 and 1992. "},
	{type: "image", src: "2016_TIFR_bird-graffiti_home-featured-cropped.jpg", caption: "Lunch time juxtapositions: Staff and students of NCBS gather for a lunch time cricket match. Adjacent to them (not seen), a student from Axel Brockmann’s group conducts an observational study of a beehive."},
	{type: "image", src: "Instem-construction.jpg", caption: "InStem building in construction. 2016."},
	{type: "image", src: "NCBS-campus-1998-elevation.jpg", caption: "When Raj Rewal designed NCBS, he included chatris on the roofline. These would be places, they felt, where the scientific staff could stand in the shade and discuss their work. As it turns out, many air conditioner modules occupy the space today."},
	{type: "image", src: "TIFR-Penthouse-2.jpg", caption: "In the main academic block at TIFR, near the Director's office, is a room called the Penthouse. It used to be the telephone exchange. Today, it is the records room. Records are preserved, but it takes institutional memory to track them down, including the original DAE sanction order to build NCBS. "},
	{type: "image", src: "TIFR-Post-Lunch-Walk.jpg", caption: "The TIFR Wind Tunnel: Every day after lunch, the windy corridor between the Homi Bhabha Auditorium and the main academic block is the place where people walk back and forth to burn off their lunch, perhaps very different from the architects' vision when they designed the building. "}, 
	{type: "video", src: "8_Ephemera_Braille.mp4", caption: "Ajith Kumar's field notes from 1981, written on Braille paper (sourced from a church in the US, since resources were limited, and it was good non-blotting paper). The notes are for studies on how four species of tree living mammals co-exist and compete for same resources in the Anamalai Hills, Tamil Nadu."}

]);
var randomImageView = new EphermeraView({collection: this.images});
randomImageView.render();