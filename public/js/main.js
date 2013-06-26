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
    return html;
}

function formatMonthYear(date) {
    var month = '';
    var year = '';
    var formattedMonthYear = '';
    formattedMonthYear = String(parseInt(date));
    if (formattedMonthYear.length < 4) {
        formattedMonthYear = '0' + formattedMonthYear;
    }
    month = formattedMonthYear.substring(0, 2);
    year = formattedMonthYear.substring(2, 4);
    formattedMonthYear = month + '/' + year;
    return formattedMonthYear;
}  


/*
Notes: 
Create  POST    /api/resumes
Read    GET     /api/resumes/51c208396b1642a626000001
Update  PUT     /api/resumes/51c208396b1642a626000001
Delete  DELETE  /api/resumes/51c208396b1642a626000001

Read all of the resumes (objects) 
        GET     /api/resumes

*/

$(document).ready(function() {
   // $.ajax('api/resumes/'+window.location.hash.substr(1), {
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
            var category = resume.skill[i].category; 
            var skill_title = resume.skill[i].title; 
            var skill_experience = resume.skill[i].experience + ' year(s)';

            var skillsDiv = generateHTML ({
                                            'category' : category,
                                            'skill_title' : skill_title,
                                            'skill_experience' : skill_experience
                                        }, 'div');
                    $('.skill').append(skillsDiv); 
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
            
                start_month_year = formatMonthYear(start_month_year);
                end_month_year = formatMonthYear(end_month_year);

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
                        '<div class="responsibilities"><h5>Responsibilities</h5><ul>' + 
                        responsibilitiesList + 
                        '</ul></div>';
                $('.experience').append(entireExperience);
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
                    
                    start_month_year = formatMonthYear(start_month_year);
                    end_month_year = formatMonthYear(end_month_year);

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
                    var title = resume.accomplishments[i].title; 
                    var month_year = resume.accomplishments[i].month_year; 
                    var description = resume.accomplishments[i].description; 
                    
                    month_year = formatMonthYear(month_year);
                    var accomplishmentDiv = generateHTML ({
                                            'title' : title,
                                            'month_year' : month_year,
                                            'description' : description
                                        }, 'div');
                    $('.accomplishment').append(accomplishmentDiv);
                }  
            }  
           console.log(resume);
        }

    });
///*********BEGIN CREATE FORM FIELDS********/

    $('.skill_block_add').click(function() {
       addABlock('.skill_block');
        return false;
    });

    $('.experience_block_add').click(function() {
        addABlock('.experience_block');
        return false;
    });

    $('.education_block_add').click(function() {
        addABlock('.education_block');
        return false;
    });

        $('.accomplishments_block_add').click(function() {
        addABlock('.accomplishments_block');
        return false;
    });

    function addABlock(className) {
        var html = $(className).first().clone();
        html.css('display', 'none');
        html.find('input').val('');
        $(className).after(html);
        html.slideDown(600);
    }

    $('#userDataForm').submit(function() {
        var userData = {};
        userData.name_first = $('#input_name_first').val(); 
        userData.name_last = $('#input_name_last').val(); 
        userData.name_phone = $('#input_phone').val(); 
        userData.name_email = $('#input_email').val(); 
        userData.name_website = $('#input_website').val(); 

        userData.skill = [];  
        var skill_block = $('.skill_block');
        skill_block.each(function(index, item) {
            userData.skill.push({
                category : $(item).find('input.input_category').val(),
                title : $(item).find('input.input_skill_title').val(),
                experience : $(item).find('input.input_skill_experience').val()
            });
        });

        userData.experience = [];  
        var experience_block = $('.experience_block');
        experience_block.each(function(index, item) {
            userData.experience.push({
                role : $(item).find('input.input_role').val(),
                project : $(item).find('input.input_project').val(),
                start_month_year : $(item).find('input.input_start_month_year').val(),
                end_month_year : $(item).find('input.input_end_month_year').val(),
                organization : $(item).find('input.input_organization').val(),
                location : $(item).find('input.input_location').val()
            });
        });

        userData.education = [];  
        var education_block = $('.education_block');
        education_block.each(function(index, item) {
                userData.education.push({
                school_name : $(item).find('input.input_school_name').val(),
                degree : $(item).find('input.input_degree').val(),
                major : $(item).find('input.input_major').val(),
                start_month_year : $(item).find('input.input_start_month_year').val(),
                end_month_year : $(item).find('input.input_end_month_year').val(),
                minor : $(item).find('input.input_minor').val(),
                gpa : $(item).find('input.input_gpa').val()
            });
        });

        userData.accomplishment = [];  
        var accomplishment_block = $('.accomplishments_block');
        accomplishment_block.each(function(index, item) {
            userData.accomplishment.push({
                title : $(item).find('input.input_accomplishment_title').val(),
                month_year : $(item).find('input.input_accomplishment_month_year').val(),
                description : $(item).find('input.input_accomplishment_description').val()
            });
        });

        console.log(userData.accomplishment);
        return false;                                
    });

});
