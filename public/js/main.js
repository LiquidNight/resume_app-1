function generateHTML(data, type) {
    var html = '';
    if (type === 'div') {
        for (i in data) {
            html += '<div class="'+i+'">'+data[i]+'</div>';
        }
    } else if (type === 'li') {
        for (i in data) {
            html += '<li class="'+i+'">'+data[i]+'</li>';
        }
    }
   // console.log(html);
    return html;
}

$(document).ready(function() {
    $.ajax('api/resumes/51c208396b1642a626000001', {
        complete : function(response){
        var resume = response.responseJSON;
        $('#name_first').html(resume.name_first);
        $('#name_last').html(resume.name_last);
        
        $('#phone').html(resume.contact_info.phone);
        $('#email').html(resume.contact_info.email);
        
        $('#website').html(resume.website);

        $('#street').html(resume.contact_info.street_address.street);
        $('#city').html(resume.contact_info.street_address.city);
        $('#zip_code').html(resume.contact_info.street_address.zip_code);
    
/**************  BEGIN SKILLS     ********/       
        lengthOfSkillArray = resume.skill.length;
        for (var i = 0; i < lengthOfSkillArray; i++) {
            var currentCategory = '#category' + (i + 1);
            $(currentCategory + ' h4').html(resume.skill[i].category); 
            $(currentCategory + ' .title').html(resume.skill[i].title); 
            $(currentCategory + ' .title_experience').html(resume.skill[i].experience); 
        }  
/**************  END SKILLS     ********/ 

/**************  BEGIN EXPERIENCE *******/ 
        var lengthOfExperienceArray = resume.experience.length;
        if (lengthOfExperienceArray < 1) {
            console.log('This person has no work experience');
            //Code to set visible css property == false;
           // ('.experience').visible = false; 
        } else {
            for (var i = 0; i < lengthOfExperienceArray; i++) {
                var role = resume.experience[i].role;
                var project = resume.experience[i].project; 
                var start_month_year = resume.experience[i].start_month_year; 
                var end_month_year = resume.experience[i].end_month_year; 
                var organization = resume.experience[i].organization; 
                var location = resume.experience[i].location; 
            
                lengthOfResponsibilitiesArray = resume.experience[i].responsibilities.length;
                var responsibilitiesObject = {};
                for (var h = 0; h < lengthOfResponsibilitiesArray; h++) {
                     responsibilitiesObject['responsibility' + 
                                            (h)] = resume.experience[i].responsibilities[h];
                }

                var experienceDiv = generateHTML ({
                                            'role' : role,
                                            'project' : project,
                                            'start_month_year' : start_month_year,
                                            'end_month_year' : end_month_year,
                                            'organization' : organization,
                                            'location' : location
                                        }, 'div');

                 
               var responsibilitiesList = generateHTML (responsibilitiesObject, 'li');
               var entireExperience = experienceDiv +
                    '<div class="responsibilities, clearfix"><h5>Responsibilities</h5><ul>' + 
                    responsibilitiesList + '</ul></div>';
                
                $('.experience').append(entireExperience);

//Explore: can I do it this way using the commented out html and id's?   
                // $('.experienceList').append(experienceDiv);
               // $('.responsibilitiesList').append(responsibilitiesList);
            }
        }
/************  END EXPERIENCE  *******/ 

/************  BEGIN SCHOOLS   ******/
            lengthOfSchoolsArray = resume.schools.length;
            if (lengthOfSchoolsArray < 1) {
                //Figure out real code to make this false.
               // ('#education').visible = false; 
            } else {
                for (var i = 0; i < lengthOfSchoolsArray; i++) {
                    var degree = resume.schools[i].degree; 
                    var major = resume.schools[i].major; 
                    var start_month_year = resume.schools[i].start_month_year; 
                    var end_month_year = resume.schools[i].end_month_year; 
                    var minor = resume.schools[i].minor; 
                    var school_name = resume.schools[i].name; 
                    var gpa = resume.schools[i].gpa;
                
                    var educationDiv = generateHTML ({
                                            'degree' : degree,
                                            'major' : major,
                                            'start_month_year' : start_month_year,
                                            'end_month_year' : end_month_year,
                                            'minor_label' : 'Minor',
                                            'minor' : minor,
                                            'school_name' : school_name,
                                            'gpa_label' : 'GPA',
                                            'gpa' : gpa
                                        }, 'div');
                    console.log(educationDiv);
                    $('.education').append(educationDiv);

                }  
            }  
/************  END SCHOOLS   ******/
            lengthOfAccomplishmentsArray = resume.accomplishments.length;
            if (lengthOfAccomplishmentsArray < 1) {
                //Figure out real code to make this false.
               // ('#education').visible = false; 
            } else {
                for (var i = 0; i < lengthOfAccomplishmentsArray; i++) {

                    var currentAccomplishment = '#accomplishment' + (i + 1);
                    $(currentAccomplishment + ' .title').html(resume.accomplishments[i].title); 
                    $(currentAccomplishment + ' .month_year').html(resume.accomplishments[i].month_year); 
                    $(currentAccomplishment + ' .description').html(resume.accomplishments[i].description); 
                }  
            }  

            
            
           console.log(resume);
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


