var Mood = require("../models/Mood");
var expect = require("chai").expect;

describe("Mood", function(){
    it("fails to create mood if required fields are absent", function(next){
        var required_fields = {};
        Mood.create(required_fields).then(function(){
        }, function(err){
            expect(err.errors[0].type).to.eq("notNull Violation");
            next();
        });
    });

    it("creates a valid mood if mood_name is provided", function(next){
        var required_fields = {
            mood_name: "excited"
        };
        Mood.create(required_fields).then(function(mood){
            expect(mood.mood_name).to.eq(required_fields.mood_name);
            next();
        });
    });

});


