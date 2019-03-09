class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {

        var tweetType = "miscellaneous";

        if(this.text.startsWith("Just completed")){
            tweetType = "completed_event";
        }
        else if(this.text.startsWith("Just posted")){
            tweetType = "posted_event";
        }
        else if(this.text.includes("#RKLive") && this.text.startsWith("Watch")){
            tweetType = "live_event";
        }
        else if(this.text.startsWith("Achieved")){
            tweetType = "achievement";
        }
        return tweetType;
    }

   

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {

        if (this.text.includes("-")){
            return true;
        }
        return false;

    }

    get writtenText():string {
        
        // if it does not include any written text, return nothing.
        if(!this.written) {
            return "";
        }

        // find the start and end of the written part of the tweet...
        var start = this.text.indexOf("-");
        var end = this.text.indexOf("https://t");

        // add substring from start to end of variable 'str'.
        var str = this.text.substring(start+1, end);

        return str;
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }

        var str = this.text.split(" ", 6);
        var activityType = str[5];

        return activityType;
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }

        var distanceSelection = this.text.split(" ", 5);
        var distanceType = distanceSelection[5];
        var distance = parseFloat(distanceSelection[4]);

        if (distanceType == 'km'){
            return distance;
        }
        // convert miles to km's
        else if (distanceType == 'mi'){
            return distance * 1.609;
        }
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}

   /*

// 2. Identify number of tweets in each category below + percentage
// 3. How many of the completed texts contain written text.

*/


