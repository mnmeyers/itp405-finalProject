var Playlist = require("../models/Playlist");
var expect = require("chai").expect;

describe("Playlist", function(){
  it("validates presence of playlist_name", function(next){
    Playlist.create().then(function(){
    }, function(err){
      expect(err.errors[0].type).to.eq("notNull Violation");
      next();
    });
  });

  it("creates a valid playlist name if playlist_name is provided", function(next){
    var required_fields = {
      playlist_name: "exercise playlist"
    };
    Playlist.create(required_fields).then(function(playlist){
      expect(playlist.playlist_name).to.eq(required_fields.playlist_name);
      next();
    });
  });
});
