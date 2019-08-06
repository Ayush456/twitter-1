
$(document).on('click','#tweet-submit',function(){
    let tweet_text = $('#text_tweets').val().concat('  ');
    tweet_text = tweet_text.concat('  ');
    indices = [],hashtags=[];
    for(let i = 0;i < tweet_text.length-1 ; i++){
        if(tweet_text[i] === '#'){
            indices.push(i);
        }
    }
    for(let i=0;i<indices.length ;i++){
        let startIndex = indices[i];
        let endIndex = tweet_text.indexOf(' ',startIndex+1);
        let HashTag = tweet_text.substring(startIndex+1,endIndex);
        hashtags.push(HashTag);
    }
    console.log(hashtags);
    user_id = document.getElementById('tweet-submit').value ;
    console.log(user_id);
    
    $.ajax({
        url: window.location+'tweet',
        type: "POST",
        data: { userId: user_id,textMsg: tweet_text, hashTags: hashtags },
        success: function(dataAfterTweetPost){

        },

    }).fail(function(e){

    });
    
   
});