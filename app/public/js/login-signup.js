
    $(".errors").css("display", "none");
    $('#no-email').css({ 'display': 'none' });
    $('#no-password').css({ 'display': 'none' });
    let username, password;

    $(document).on('keyup', '#email', function () {
        username = document.getElementById('email').value;
        console.log(username);
        let status1 = 0;
        let email_reg = '^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$';
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username)) {
            status1 = 1;
        }

        if (status1 == 1) {
            $('#user_glyp').css({ 'display': 'block' });
        }
    });

    $(document).on('click', '#login-btn', function () {
        $(".errors").css("display", "none");
        username = document.getElementById('email').value;
        password = document.getElementById('pass').value;
        console.log(username + ' ' + password);
        if (username !== "" && password !== "") {

            $.ajax({
                url: window.location+'login',
                type: "POST",
                data: { username: username, password: password },
                success: function (data) {
                    if (data) {
                        console.log('valid user');
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
                                        <button id="tweet-submit" value='${data.user_id}'>Tweet</button>
                                    </div>
                                </div>
                            </div>
                        </div></div>`;
                        $('.col-md-3').html(htmlleft);
                        $('.col-md-4').html(htmlRight);
                        $('.col-md-5').html(htmlMid);
                    } else {
                        console.log('invalid user');
                        $('.errors').css({ 'display': 'block', 'color': 'red', 'margin-left': '20%' });
                    }
                }

            }).fail(function(jqXHR, textStatus, error){
                console.log('invalid user');
                $('.errors').css({ 'display': 'block', 'color': 'red', 'margin-left': '20%' });
            });
        }
    });

    $(document).on('click', '#btn-signup', function () {
        html = '';
        $('#home').html(`
        <link rel="stylesheet" href="css/signup.css">  
        <div class="card" style="margin-top:15vh;">
        <article class="card-body">
            <a href="" class="float-right btn btn-outline-primary">Log In</a>
            <h4 class="card-title mb-4 mt-1">Sign Up</h4>
            <form>
                <div class="form-group">
                    <label>Your name</label>
                    <input name="" class="form-control" placeholder="Name" type="text" id="user-name">
                    <div class="error" id="name-error">Name Cannot be Null!</div>
                </div> 

                <div class="form-group">
                    <label>Birth Date</label>
                    <input name="" class="form-control" type="date" id="user-dob">
                    <div class="error" id="dob-error">DOB cannot be null!</div>
                </div> 

                <div class="form-group">
                    <label>Your email</label>
                    <input name="" class="form-control" placeholder="Email" id="user-email" type="email">
                    <div class="error" id="email-error">Email cannot be null</div>
                </div> 

                <div class="form-group">
                    <label>Your password</label>
                    <input class="form-control" placeholder="Password" type="password" id="user-password">
                    <div class="error" id="password-error">Password Cannot be Null!</div>
                </div> 

                <div class="form-group">
                    <label>Confrim password</label>
                    <input class="form-control" placeholder="Confirm Password" type="password" id="cnf-password">
                    <div class="error" id="cnf-password-error">Password canno be null!</div>
                </div>

                <div class="form-group">
                    <button type="button" class="btn btn-primary btn-block" id="sign-up"> Sign Up </button>
                </div>
            </form>
        </article>
    </div> 
    <script src='js/signup.js'></script> 
    `);
    });