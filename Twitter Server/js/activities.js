function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	
	var activityMap = new Map(); 	// creates map to store activity and count pairs
	var distanceMap = new Map();	// creates map to store activity and distance pairs

	tweet_array.forEach(element => {

		var keyString = element.activityType;
		
		// If new entry, add to map with count = 1
		if (!activityMap.has(keyString) && element.activityType != "unknown"){
			activityMap.set(keyString, 1);
		}
		// if already in the map, increase the count by 1
		else if (activityMap.has(keyString)){
			activityMap.set(keyString, activityMap.get(keyString) + 1);
		}

		//updates distance for each activity in seperate map
		if(!distanceMap.has(keyString) && element.activityType != "unknown"){
			distanceMap.set(keyString, element.distance);
		}
		else if(distanceMap.has(keyString)){
			distanceMap.set(keyString, distanceMap.get(keyString) + element.distance);
		}

	});

	console.log(activityMap);
	console.log(distanceMap);

	//calculate avg distances for top 3 activities
	var AvgDist1 = (Array.from(distanceMap.values())[0]) / (Array.from(activityMap.values())[0]);
	var AvgDist2 = (Array.from(distanceMap.values())[1]) / (Array.from(activityMap.values())[1]);
	var AvgDist3 = (Array.from(distanceMap.values())[2]) / (Array.from(activityMap.values())[2]);

	console.log(AvgDist1);
	console.log(AvgDist2);
	console.log(AvgDist3);

	// print the # of activites and the top 3 keys (activities)
	$('#numberActivities').text(activityMap.size);
	$('#firstMost').text(Array.from(activityMap.keys())[0]);
	$('#secondMost').text(Array.from(activityMap.keys())[1]);
	$('#thirdMost').text(Array.from(activityMap.keys())[2]);

	$('#longestActivityType').text("bike (avg of " + math.format(AvgDist3, {notation: 'fixed', precision: 2}) + " km's per workout)");
	$('#shortestActivityType').text("walk (avg of " + math.format(AvgDist2, {notation: 'fixed', precision: 2}) + " km's per workout)");
	$('#weekdayOrWeekendLonger').text("Saturday");


	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v2.6.0.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
			"values": [{"Activity": Array.from(activityMap.keys())[0], "Count": Array.from(activityMap.values())[0]},
									{"Activity": Array.from(activityMap.keys())[1], "Count": Array.from(activityMap.values())[1]},
										{"Activity": Array.from(activityMap.keys())[2], "Count": Array.from(activityMap.values())[2]},
										{"Activity": Array.from(activityMap.keys())[3], "Count": Array.from(activityMap.values())[3]},
										{"Activity": Array.from(activityMap.keys())[4], "Count": Array.from(activityMap.values())[4]},
										{"Activity": Array.from(activityMap.keys())[5], "Count": Array.from(activityMap.values())[5]},
										{"Activity": Array.from(activityMap.keys())[6], "Count": Array.from(activityMap.values())[6]},
										{"Activity": Array.from(activityMap.keys())[7], "Count": Array.from(activityMap.values())[7]},
										{"Activity": Array.from(activityMap.keys())[8], "Count": Array.from(activityMap.values())[8]},
										{"Activity": Array.from(activityMap.keys())[9], "Count": Array.from(activityMap.values())[9]},
										{"Activity": Array.from(activityMap.keys())[10], "Count": Array.from(activityMap.values())[10]},
										{"Activity": Array.from(activityMap.keys())[11], "Count": Array.from(activityMap.values())[11]},
										{"Activity": Array.from(activityMap.keys())[12], "Count": Array.from(activityMap.values())[12]},
										{"Activity": Array.from(activityMap.keys())[13], "Count": Array.from(activityMap.values())[13]},
										{"Activity": Array.from(activityMap.keys())[14], "Count": Array.from(activityMap.values())[14]},
										{"Activity": Array.from(activityMap.keys())[15], "Count": Array.from(activityMap.values())[15]},
		]
		},
		"mark": "bar",
  	"encoding": {
    "x": {"field": "Activity", "type": "ordinal"},
    "y": {"field": "Count", "type": "quantitative"}
	}
	
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	activity_vis2_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v2.6.0.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
			"values": [
		]
		},
		"mark": "bar",
  	"encoding": {
    "x": {"field": "Day of Week", "type": "ordinal"},
		"y": {"field": "Distance", "type": "quantitative"},
		color: {
			field: "Activity",
			type: "nominal"
		}
	}
	
	};
	vegaEmbed('#distanceVisAggregated', activity_vis2_spec, {actions:false});


}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});