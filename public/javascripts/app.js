
$(document).ready(function (jqueryStatic) {
    // $('button#generate-persons-btn').on('click', function(event){
    //     console.log(event);
    // })
    let socket = io();
    socket.on('connect', function () {

    })
    let generatePersonsFormData = {};
    $('form#generate-persons-form .form-control').on('change', function (event) {
        if (!isNaN(event.target.value)) {
            generatePersonsFormData[event.target.getAttribute('name')] = Number.parseInt(event.target.value);
        }


        //validate values here
    });



    $('form#generate-persons-form').on('submit', function (event) {
        event.preventDefault();
        console.log(generatePersonsFormData);

        $.ajax('/rest/natural-persons',
            {
                method: 'POST',
                data: generatePersonsFormData,
                dataType: 'json',
                beforeSend: function () {
                    $('#natural-persons-generation-progress-bar')
                        .addClass('notransition');

                    $('#natural-persons-generation-progress-bar').css({ 'width': '0%' });

                    socket.on('progressUpdateMsg', function (message) {
                        message = JSON.parse(message);
                        $('#natural-persons-generation-progress-bar').css({
                            'width': message.progress + '%'
                        });
                    })

                },
                error: function () {
                    console.log('there was an error');
                },
            })
            .done(function (data) {
                console.log('done', data);
            })
            .fail(function () {
                console.log('ajax call failed');
            })
    });

    // Code to handle person search form
    let personSearchFormData = {};
    $('form#person-search-form .form-control').on('change', function (event) {
        personSearchFormData[event.target.getAttribute('name')] = event.target.value;
    });

    $('form#person-search-form').on('submit', function (event) {
        event.preventDefault();

        $.ajax('rest/natural-persons/search/id', {
            method: 'GET',
            data: personSearchFormData,
            dataType: 'json',
            beforeSend: function () {

            },
        }).done(function (data) {
            console.log(data);
        })
        .fail(function (err) {

        })
    });

    //code to handle search by non id params
    let nonIdParams = {};
    $('form#nonId-params-form .form-control').on('change', function(event){
        nonIdParams[event.target.getAttribute('name')] = event.target.value;
    });

    $('form#nonId-params-form').on('submit', function(event){
        event.preventDefault();
        $.ajax('rest/natural-persons/search',{
            method: 'GET',
            data: nonIdParams,
            dataType: 'json',
            beforeSend: () => {

            }
        })
        .done((results) =>{
            console.log(results);
        })
        .fail((err) => {
            console.log(err);
        })
    })

   var table = $('#natural-persons-table').DataTable({
        'ajax': '/rest/natural-persons/',
        'ordering': false,
        'serverSide': true,
        "processing": true,
        "columns": [
            { "data": "surname", "searchable": true },
            { "data": "firstName" },
            { "data": "secondName" },
            { "data": "thirdName" },
            { "data": "nationalId" },
            { "data": "passportNumber"},
            { "data": "serviceId"},
            { "data": "alienId"},
            { "data": "districtId"},
            { "data": "divisionId"}
        ]
    });

    $('#search-surname').on('change', function(event){
    
        table
        .column(0)
        .search(this.value)
        .draw();
    
      });
      
      $('#search-firstName').on('change', function(event){
    
        table
        .column(1)
        .search(this.value)
        .draw();
    
      });

      $('#search-secondName').on('change', function(event){
    
        table
        .column(2)
        .search(this.value)
        .draw();
    
      });

      $('#search-thirdName').on('change', function(event){
    
        table
        .column(3)
        .search(this.value)
        .draw();
    
      });

      $('#search-nationalId').on('change', function(event){
    
        table
        .column(4)
        .search(this.value)
        .draw();
    
      });

});