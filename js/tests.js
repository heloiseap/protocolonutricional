$(document).ready(function () { 

    let patientData = {
        name: 'Tiago Dakuzaku',
        age: '31',
        current_weight: '70',
        usual_weight: '65',
        height: '170',
        date: '1985-08-17'
    }

    

    function fillPatientData() {
        $('#name').val(patientData.name);
        $('#age').val(patientData.age);
        $('#current_weight').val(patientData.current_weight);
        $('#usual_weight').val(patientData.usual_weight);
        $('#height').val(patientData.height);
        $('#date').val(patientData.date);
    }

    $('input[type=date]').each(function(i,el){
        $(el).val('1980-01-01');
    });

    $('input[type=radio]').each(function(i,el){
        if ($(el).val() == 0) {
            $(el).attr('checked', 'checked');
        }
    });



});