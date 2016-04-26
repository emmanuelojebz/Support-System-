Template.login.helpers({
    userEmail:function(){
        if(Meteor.user()){
        return Meteor.user().emails[0].address ;
        }else{
            return ""; 
        }
        }
})


Template.login.events({
    'click .register-link':function(event){
        $('.panel-login').hide('fast',function(){
        });
        $('.panel-register').show();
    },
    
    'click .logout-link':function(event){
        event.preventDefault();
        Meteor.logout(function(err){
            if(err){
                FlashMessages.sendError(err.reason);
            }else{
                FlashMessages.sendSuccess("You are now logged out")
                Router.go('/');
            }
        })
    },
    
    'submit .login-form':function(event){
        event.preventDefault();
        var email = trimInput(event.target.email.value);
        var password = trimInput(event.target.password.value);
        
        Meteor.loginWithPassword(email,password, function(err){
            if(err){
                event.target.email.value = email;
                event.target.password.value = password;
                FlashMessages.sendError(err.reason);
            }else{
                FlashMessages.sendSuccess('You are now logged in');
                Router.go('/');
            }
        })
        
        event.target.email.value = "";
        event.target.password.value = "";
    }
})

Template.register.events({
    'click .login-link':function(event){
        $('.panel-register').hide('fast');
        $('.panel-login').fadeIn();
        
    },
    'submit .register-form':function(event){
        var email = trimInput(event.target.email.value);
        var password = trimInput(event.target.password.value);
        var password2 = trimInput(event.target.password2.value);
        
        if((isNotEmpty(email) && isNotEmpty(password)  && isEmail(email)  && areValidPasswords(password,password2))){
            console.log("just checking");
            Accounts.createUser({
            email:email,
            password:password,
            profile:{
                usertype:'staff'
            }
            },
            function(err){
                if(err){
                    console.log(err.reason)
                    FlashMessages.sendError("There was an error with registration"+ err.reason);
                }
                else{
                    console.log("suceeded");
                    FlashMessages.sendSuccess("Account Created ! You are now logged in");
                    Router.go('/');
                }
            }
        );
           }
        /*if(!isNotEmpty(email) && isNotEmpty(password) && isEmail(email) && areValidPasswords(password,password2)){
        
        
        }*/
            
        return false;
    }
});

//Validations
//trim helper
// Validation Rules

// Trim Helper
var trimInput = function(val){
	return val.replace(/^\s*|\s*$/g, "");
}

// Check For Empty Fields
isNotEmpty = function(value) {
    if (value && value !== ''){
        return true;
    }
    FlashMessages.sendError("Please fill in all fields");
    return false;
};

// Validate Email
isEmail = function(value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
        return true;
    }
    FlashMessages.sendError("Please use a valid email address");
    return false;
};

// Check Password Field
isValidPassword = function(password) {
    if (password.length < 6) {
        FlashMessages.sendError("Password must be at least 6 characters");
       // console.log("Password must be at least 6 characters")
        return false;
    }
    return true;
};

// Match Password
areValidPasswords = function(password, confirm) {
    if (!isValidPassword(password)) {
        return false;
    }
    if (password !== confirm) {
        FlashMessages.sendError("Passwords do not match");
        return false;
    }
    return true;
};