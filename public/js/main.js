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

function formattedMonthYear(date) {
    var month = date.slice(5,7);
    var year = date.slice(2, 4);
    return (month + year);
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
               // ('#schools').visible = false; 
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

                    var schoolsDiv = generateHTML ({
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
                    $('.schools').append(schoolsDiv);
                }  
            } 

/************  END SCHOOLS   ******/
            lengthOfAccomplishmentsArray = resume.accomplishments.length;
            if (lengthOfAccomplishmentsArray < 1) {
                //Figure out real code to make this false.
               // ('#schools').visible = false; 
            } else {
                for (var i = 0; i < lengthOfAccomplishmentsArray; i++) {
                    var title = resume.accomplishments[i].title; 
                    var month_year = resume.accomplishments[i].month_year; 
                    var description = resume.accomplishments[i].description; 
                    
                    month_year = formatMonthYear(month_year);
                    var accomplishmentsDiv = generateHTML ({
                                            'title' : title,
                                            'month_year' : month_year,
                                            'description' : description
                                        }, 'div');
                    $('.accomplishments').append(accomplishmentsDiv);
                }  
            }  
           console.log(resume);
        }

    });
///*********BEGIN CREATE FORM FIELDS********/

    $('.skill_block_add').click(function() {
       addABlock('.skill_block', '.skill_block_add');
        return false;
    });

    $('.experience_block_add').click(function() {
        addABlock('.experience_block', '.experience_block_add');
        return false;
    });
                
     $('.responsibility_block_add').click(function() {
        addABlock('.responsibility_block', '.responsibility_block_add');
        return false;
    });

    $('.schools_block_add').click(function() {
        addABlock('.schools_block', '.schools_block_add');
        return false;
    });

        $('.accomplishments_block_add').click(function() {
        addABlock('.accomplishments_block', '.accomplishments_block_add');
        return false;
    });

    function addABlock(className, blockName) {
        var html = $(className).first().clone();
        html.css('display', 'none');
        html.find('input').val('');
        $(blockName).before(html);
        html.slideDown(600);
    }

    $('#userDataForm').submit(function() {
        var userData = {};
        userData.name_first = $('#input_name_first').val(); 
        userData.name_last = $('#input_name_last').val();
        userData.website = $('#input_website').val();
        userData.linked_in = $('#input_linked_in').val();
        userData.twitter = $('#input_twitter').val();

        street_address = {};
        street_address['city'] = $('#input_city').val();
        street_address['state'] = $('#input_state').val();
        street_address['street'] = $('#input_street').val();
        street_address['zip_code'] = $('#input_zip_code').val();

        userData.contact_info = [];
        userData.contact_info.push({
            phone : $('#input_phone').val(), 
            email : $('#input_email').val(),
            street_address: street_address
        });

        userData.skill = [];  
        var skill_block = $('.skill_block');
        skill_block.each(function(index, item) {
            userData.skill.push({
                category : $(item).find('input.input_category').val(),
                title : $(item).find('input.input_skill_title').val(),
                experience : $(item).find('select.input_skill_experience').val()
            });
        });

        console.log(userData);

        userData.experience = [];  
        var experience_block = $('.experience_block');
        experience_block.each(function(index, item) {
            var expStartMonthYear = $(item).find('input.input_experience_start_month_year').val();
            var expEndMonthYear = $(item).find('input.input_experience_end_month_year').val();

            responsibilities = [];
            var responsibility_block = $('.responsibility_block');
            responsibility_block.each(function(index, item) {
                responsibilities[index] = $(item).find('input.input_responsibility').val();
            });
           
            userData.experience.push({
                role : $(item).find('input.input_role').val(),
                project : $(item).find('input.input_project').val(),
                start_month_year : formattedMonthYear(expStartMonthYear),
                end_month_year : (formattedMonthYear(expEndMonthYear) + '}'),
                organization : $(item).find('input.input_organization').val(),
                location : $(item).find('input.input_location').val(),
                //responsibility : $(item).find('input.input_responsibility').val()
                responsibility : responsibilities
            });
        });

        userData.schools = [];  
        var schools_block = $('.schools_block');
        schools_block.each(function(index, item) {
                var schoolsStartMonthYear =  $(item).find('input.input_schools_start_month_year').val();
                var schoolsEndMonthYear =  $(item).find('input.input_schools_end_month_year').val();
                userData.schools.push({
                name : $(item).find('input.input_school_name').val(),
                degree : $(item).find('input.input_degree').val(),
                major : $(item).find('input.input_major').val(),
                start_month_year : formattedMonthYear(schoolsStartMonthYear),
                end_month_year : (formattedMonthYear(schoolsEndMonthYear) + '}'),
                minor : $(item).find('input.input_minor').val(),
                gpa : $(item).find('input.input_gpa').val()
            });
        });

        userData.accomplishments = [];  
        var accomplishments_block = $('.accomplishments_block');
        accomplishments_block.each(function(index, item) {
            var accomplishmentMonthYear = $(item).find('input.input_accomplishments_month_year').val(); 
            userData.accomplishments.push({
                title : $(item).find('input.input_accomplishments_title').val(),
                month_year : formattedMonthYear(accomplishmentMonthYear),
                description : $(item).find('textarea.input_accomplishments_description').val()
            });
        });

        return false;                                
    });

});
