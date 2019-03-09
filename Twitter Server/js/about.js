function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	$('#numberTweets').text(tweet_array.length);

	var earliest_tweet = new Date(8640000000000000);
	var latest_tweet = new Date(-8640000000000000);

	var completedEventsCount = 0, liveEventsCount = 0, achievementsCount = 0, miscellaneousCount = 0, writtenCount = 0;

	tweet_array.forEach(element => {

		// finds earliest and latest tweet times
		if (element.time < earliest_tweet){
			earliest_tweet = element.time;
		}
		else if (element.time >= latest_tweet){
			latest_tweet = element.time;
		}

		// adds to appropriate count given tweet category.
		if(element.written){
			writtenCount++;
		}
		if (element.source == "completed_event" || element.source == "posted_event"){
			completedEventsCount++;
		}
		else if (element.source == "live_event"){
			liveEventsCount++;
		}
		else if (element.source == "achievement"){
			achievementsCount++;
		}
		else if (element.source == "miscellaneous"){
			miscellaneousCount++;
		}

	});

	// prints date range
	$('#firstDate').text(earliest_tweet.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}));
	$('#lastDate').text(latest_tweet.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }));

	// prints category counts
	$('.completedEvents').text(completedEventsCount);
	$('.liveEvents').text(liveEventsCount);
	$('.achievements').text(achievementsCount);
	$('.miscellaneous').text(miscellaneousCount);
	$('.written').text(writtenCount);

	// calculates category percentages
	var completedEventsPct = (completedEventsCount/tweet_array.length)*100;
	var liveEventsPct = (liveEventsCount/tweet_array.length)*100;
	var achievementsPct = (achievementsCount/tweet_array.length)*100;
	var miscellaneousPct = (miscellaneousCount/tweet_array.length)*100;
	var writtenPct = (writtenCount/completedEventsCount)*100;

	// formats and prints category percentages
	$('.completedEventsPct').text(math.format(completedEventsPct, {notation: 'fixed', precision: 2}) + "%");
	$('.liveEventsPct').text(math.format(liveEventsPct, {notation: 'fixed', precision: 2}) + "%");
	$('.achievementsPct').text(math.format(achievementsPct, {notation: 'fixed', precision: 2}) + "%");
	$('.miscellaneousPct').text(math.format(miscellaneousPct, {notation: 'fixed', precision: 2}) + "%");
	$('.writtenPct').text(math.format(writtenPct, {notation: 'fixed', precision: 2}) + "%");

}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});