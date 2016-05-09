$.ajaxSetup({cache: true});

$.notifyDefaults({ 
    offset: { 
        x: 0, 
        y: 0   
    },
    placement: {
        from: 'top',
        align: 'right'
    },
    spacing: 5, 
    template: 
        '<div data-notify="container" class="col-xs-10 col-sm-8 col-md-6 alert alert-{0}" role="alert">' + 
            '<span data-notify="message">{2}</span>' + 
        '</div>' 
}); 