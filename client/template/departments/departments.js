Template.addDepartments.events({
    'submit .add-department':function(event){
        event.preventDefault();
        var name = event.target.name.value;
        var head = event.target.head.value;
        
        Departments.insert({
            name:name,
            head:head,
            createdAt: new Date()
        });
        
        FlashMessages.sendSuccess('Department Added');
        Router.go('/staff/departments');
    }
})

Template.departments.events({
    'click .delete-department':function(event){
        event.previousDefault();
        if(confirm("Are you sure ?")){
            Departments.remove({_id:this._id});
            FlashMessages.sendSuccess('Department Deleted');
        }
    }
})