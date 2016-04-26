Router.configure({
    layoutTemplate:'layout',
    
})
Router.route('/',{
    name:'mytickets',
    template:'mytickets',
    data:function()
    { templateData= { tickets:Tickets.find({customer:Meteor.userId()}),
    departments:Departments.find()
                    };
    return templateData;
    },
    onBeforeAction:function(isStaff){
        if(Meteor.user()){
            if(Meteor.user().profile.usertype == "staff"){
                Router.go('/staff')
            }
            else{
                this.next();
            }
        }
        else{
            this.next();
        }
    
}
});

Router.route('/ticket/:_id',{
    name:'ticket',
    template :'ticket',
    data:function(){
    return Tickets.findOne({_id:this.params._id});
}
});

Router.route('/staff',{
    name:"staffTickets",
    template:"staffTickets",
    data:function(){
        templateData = {
            tickets:Tickets.find()
        }
        return templateData;
    }
});

Router.route('/staff/departments',{
    name:"departments",
    template:"departments",
    data:function(){
        templateData = {
            departments:Departments.find()
        }
        return templateData;
    }
    
});

Router.route('/staff/departments/add',{
             name:"addDepartments",
             template:"addDepartments"
             })