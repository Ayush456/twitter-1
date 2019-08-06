
$('.error').css({display:'none'});
$(document).on('click','#sign-up',function(){
    let username = $('#user-name').val();
    let dob = $('#user-dob').val();
    let user_email = $('#user-email').val();
    let user_password = $('#user-password').val();
    let user_cnf_password = $('#cnf-password').val();
    
    let c = 0,status1=0;
    if(username == ''){
        $('#name-error').css({display:'block'});
        c = c+1;
    }
    if(!Date.parse(dob)){
        $('#dob-error').css({display:'block'});
        c = c+1;
    }
    if(user_email == ''){
        $('#email-error').css({display:'block'});
        c = c+1;
    }else{
        
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user_email)) {
            status1 = 1;
        }

        if (status1 == 1) {
            $('#email-error').css({ 'display': 'block' });
            $('#email-error').text('Entered Email is not of type Email!');
        }
    }
    if(user_password == ''){
        $('#password_error').css({display:'block'});
        c = c+1;
    }
    if(user_cnf_password == ''){
        $('#cnf-password-error').css({display:'block'});
        c = c+1;
    }



    if(user_password !== user_cnf_password){
        $('#cnf-password-error').text('password and cnf password didn\'t match');
        $('#cnf-password-error').css({display:'block'});
    }

    if( c === 0 && status1 !== 0){
        $.ajax({
            async: true,  
            url: window.location + './../signup',
            type: "POST",
            data: { username:username, dob:dob, user_email:user_email, user_password:user_password,user_cnf_password:user_cnf_password },
            success: function (user) {   
                    htmlleft = `
                    <div class="logo-pack">
                    <img id="logo" src="https://img.icons8.com/color/48/000000/twitter.png"> 
                   
                </div>
            <div class="vertical-nav-left">
               <ul>
                   <li><button class="active"> <i class="glyphicon glyphicon-home"></i> Home</button> </li>
                   <li><button> <i class="glyphicon glyphicon-road"></i> Explore</button></li>
                   <li><button><i class="glyphicon glyphicon-bell"></i>Notification</button></li>
                   <li><button> <i class="glyphicon glyphicon-envelope"></i> Message</button></li>
                   <li><button> <i class="glyphicon glyphicon-bookmark"></i> Bookmark</button></li>
                   <li><button> <i class="glyphicon glyphicon-list-alt"></i> Your Tweets </button></li>
                   <li><button> <i class="glyphicon glyphicon-user"></i> Profile</button></li>
                   <li><button> <i class="glyphicon glyphicon-th-large"></i>More</button></li>
                   <button class="btn-tweet">Tweet</button>
               </ul> 
            </div>`;
                    htmlRight = `<div class="nav-right">
                    <div class="search-bar">
                        <input type="text" placeholder=" &nbsp; &nbsp;Search Twitter.."  >
                    </div>
                
                    <div class="trendsforyou">
                        <p class="trendstTitle">Trends for you</p>
                    </div>
                    <div class="whotofollow">
                        <p class="whoTitle">Who to follow</p>
                    </div>
                    <div class="base-right-bottom-text">
                        <p>Terms &nbsp; Privacy Policy &nbsp; Cookies </p>
                        <p>more &nbsp; &copy; 2019 Twitter</p>
                    </div>
                </div>`;

                    htmlMid = `<div id="home" style=""border-right: 1px solid #BFC9CA;
                    border-left: 1px solid #BFC9CA;> <h4 class="hometext">Home</h4>
                    <div class="user-tweet">
                        <h5 style="  opacity: 0.7; padding-left: 14px;">Enter your tweet message below</h5>
                        <div class="tw-body">
                            <i style="float: left;width:10%;font-size:30px; padding-left: 14px;" class="glyphicon glyphicon-envelope"></i>
                            <input id="text_tweets" type="text" style="float:right;width:90%;height:70px;border:none" placeholder="Whats Happening?">
                            <div class="tweet-bottom">
                                <div class="tw-bottom-left">
                                    <button><i class="glyphicon glyphicon-picture"></i></button>
                                    <button><span>&#128512;</span></button>
                                </div>
                                <div class="tw-bottom-right">
                                    <button id="tweet-submit">Tweet</button>
                                </div>
                            </div>
                        </div>
                    </div></div>`;
                    $('.col-md-3').html(htmlleft);
                    $('.col-md-4').html(htmlRight);
                    $('.col-md-5').html(htmlMid);
            }
        }).fail(function(jqXHR, textStatus, error){
            console.log('some error happened!');
        });
    }

});