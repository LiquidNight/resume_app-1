


function generateHTML(data) {
    var html = '';
    for (i in data) {
        html += '<div class="'+i+'">'+data[i]+'</div>';
    }
    return html;
    //console.log(html);
}






$(document).ready(function() {
    $.ajax('api/resumes/51c208396b1642a626000001', {
        complete : function(response){
            $('#name_first').html(response.responseJSON.name_first);
            $('#name_last').html(response.responseJSON.name_last);
            
            $('#phone').html(response.responseJSON.contact_info.phone);
            $('#email').html(response.responseJSON.contact_info.email);
            
            $('#website').html(response.responseJSON.website);

            $('#street').html(response.responseJSON.contact_info.street_address.street);
            $('#city').html(response.responseJSON.contact_info.street_address.city);
            $('#zip_code').html(response.responseJSON.contact_info.street_address.zip_code);
            
            


            //
           // $('.classname').append('<p>InsertDataHere</p>');
            
            lengthOfSkillArray = response.responseJSON.skill.length;
            
            for (i = 0; i < lengthOfSkillArray; i++) {
                var currentCategory = '#category' + (i + 1);
                $(currentCategory + ' h4').html(response.responseJSON.skill[i].category); 
                $(currentCategory + ' .title').html(response.responseJSON.skill[i].title); 
                $(currentCategory + ' .title_experience').html(response.responseJSON.skill[i].experience); 
            }  

          /*  lengthOfExperienceArray = response.responseJSON.experience.length;
            if (lengthOfExperienceArray < 1) {
                //Figure out real code to make this false.
               // ('#work_experience').visible = false; 
            } else {
                for (i = 0; i < lengthOfExperienceArray; i++) {
                    var currentExperience = '#experience' + (i + 1);
                    $(currentExperience + ' .role').html(response.responseJSON.experience[i].role); 
                    $(currentExperience + ' .project').html(response.responseJSON.experience[i].project); 
                    $(currentExperience + ' .start_month_year').html(response.responseJSON.experience[i].start_month_year); 
                    $(currentExperience + ' .end_month_year').html(response.responseJSON.experience[i].end_month_year); 
                    $(currentExperience + ' .organization').html(response.responseJSON.experience[i].organization); 
                    $(currentExperience + ' .location').html(response.responseJSON.experience[i].location); 
                    
                    lengthOfResponsibilitiesArray = response.responseJSON.experience[i].responsibilities.length;
                    
                    for (h = 0; h < lengthOfResponsibilitiesArray; h++) {
                          $(currentExperience + ' .r' + (h + 1)).html(response.responseJSON.experience[i].responsibilities[h]); 
                    }


                }  
            } 

            */

            var justForKicks = generateHTML ({
                                            role : 'My Role',
                                            project : 'My Project',
                                            start_month_year : 'My SMY',
                                            end_month_year : 'My EMY',
                                            organization : 'My Organization',
                                            location : 'My Location'
                                        });



            console.log(justForKicks);
            $('.work_category').append(justForKicks);
        



            /**************end experience *******/ 

            lengthOfSchoolsArray = response.responseJSON.schools.length;
            if (lengthOfSchoolsArray < 1) {
                //Figure out real code to make this false.
               // ('#education').visible = false; 
            } else {
                for (i = 0; i < lengthOfSchoolsArray; i++) {
                    var currentSchool = '#school' + (i + 1);
                    $(currentSchool + ' .degree').html(response.responseJSON.schools[i].degree); 
                    $(currentSchool + ' .major').html(response.responseJSON.schools[i].major); 
                    $(currentSchool + ' .start_month_year').html(response.responseJSON.schools[i].start_month_year); 
                    $(currentSchool + ' .end_month_year').html(response.responseJSON.schools[i].end_month_year); 
                    $(currentSchool + ' .minor').html(response.responseJSON.schools[i].minor); 
                    $(currentSchool + ' .schools_name').html(response.responseJSON.schools[i].name); 
                }  
            }  

            lengthOfAccomplishmentsArray = response.responseJSON.accomplishments.length;
            if (lengthOfAccomplishmentsArray < 1) {
                //Figure out real code to make this false.
               // ('#education').visible = false; 
            } else {
                for (i = 0; i < lengthOfAccomplishmentsArray; i++) {

                    var currentAccomplishment = '#accomplishment' + (i + 1);
                    //console.log(currentAccomplishment);
                    $(currentAccomplishment + ' .title').html(response.responseJSON.accomplishments[i].title); 
                    $(currentAccomplishment + ' .month_year').html(response.responseJSON.accomplishments[i].month_year); 
                    $(currentAccomplishment + ' .description').html(response.responseJSON.accomplishments[i].description); 
                }  
            }  

            
            
          //  console.log(response.responseJSON);
        }
    });


//BEGIN MY FUN CODE
    $('body').keyup(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            largeValues();
        } 
    });
});


function largeValues() {
    var first_name = 'Manu';
    var last_name = 'Gin&oacute;bili';

    var element;
    element = $('#first_name');
    element.html(first_name);
    element = $('#last_name');
    element.html(last_name);
}


