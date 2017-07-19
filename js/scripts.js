$(document).ready(function () { //carregar funcao depois do carregamento da pag

    $('#step1').on('click', function (e) {

        e.preventDefault(e); //evitar que a pagina se recarregue

        var name = $('#name').val();
        var age = $('#age').val();
        

        if (age < 60) {
            var quest_jovem1 = $('#quest_jovem1');
            $('#quest_jovem1').show();

            var questionario = $('#questionario').html(quest_jovem1);


        } else {
            var quest_idoso1 = $('#quest_idoso1');
            $('#quest_idoso1').show();
            var questionario = $('#questionario').html(quest_idoso1);


        }
    });

    $('#step_young1').on('click', function (e) {

        e.preventDefault(e);

        var current_weight = $('#current_weight').val();
        var usual_weight = $('#usual_weight').val();
        var height = $('#height').val();
        // var imc = current_weight * Math.pow(10, 4) / (height * height);
        // var weight_loss = parseInt(100*(1 - (current_weight / usual_weight)));
                     

        var sickness = parseInt($("input[name=Sickness]:checked").val());

        var unintentional_WL = parseInt($("input[name=Unintentional_WL]:checked").val());

        var ingestion_re = parseInt($("input[name=Ingestion_reduction]:checked").val());



        if (sickness == 1 || unintentional_WL == 1 || ingestion_re == 1) {
            
            var quest_jovem2 = $('#quest_jovem2');
            $('#quest_jovem2').show();

            var quest_jovem1 = $('#quest_jovem1').html(quest_jovem2);
            var imc = parseInt(current_weight * Math.pow(10, 4) / (height * height));

            $('#imc').val(imc);
            var weight_loss = parseInt(100*(1 - (current_weight / usual_weight)));
            $('#perda_peso').val(weight_loss);


            if (imc <= 18.5) {
                var estado_geral = $('#Estado_geral');
                $('#Estado_geral').show();

            }
            if (weight_loss >= 5) {
                var pp_significativa = $('#PP_significativa');
                $('#PP_significativa').show();
            }


        } else {
            
            result = 'Estado nutricional normal. Paciente será reavaliado em 7 dias.';
            $('#result_form').show();
            $('#result_form').html('Resultado:' + result);

        }

    });

    $('#step_young2').on('click', function (e) {
        e.preventDefault(e);

        var imc = parseInt($('#imc').val());
        var weight_loss = parseInt($('#perda_peso').val());


        var pp_j = parseInt($("input[name=PP_j]:checked").val());
        var eg = parseInt($("input[name=EG]:checked").val());
        var ia = parseInt($("input[name=IA]:checked").val());
        var gd = parseInt($("input[name=GD]:checked").val());

        if (weight_loss >=5){
             var pp_j = 0;
        };
        
        if (imc <=18.5){
            var eg = 0;
        };          
               
        var escore = pp_j + ia + eg + gd;

        console.log(escore);
     
        

        var result = '?';
        var risco = 'O paciente está nutricionalmente no limite do risco. Será realizada a avaliação nutricional ASG em até 24h.';
        var nutrido = 'O paciente não está em risco nutricional. Será reavaliado novamente no dia __/__/__.'


        switch (true) {
            case (escore >= 3):
                result = risco;
                break;

            case (escore < 3):
                result = nutrido;
                break;

            default:
                'erro';

        }

        console.log(result);
        $('#result_form').show();
        $('#result_form').html('Resultado: ' + result);


    });

     $('#step_elder1').on('click', function (e) {
        e.preventDefault(e);

        var weight_elder = parseInt($('#current_w').val());
        var height_elder = parseInt($('#height_opc').val());

        var imc_idoso = weight_elder * Math.pow(10,4)/(height_elder*height_elder);

        if (weight_elder==0 || height_elder == 0) {
            imc_idoso = 0;
           
        }

        if (imc_idoso==0) {
            $('#circ_panturrilha').show();
            var cp = parseInt($("input[name=CP]:checked").val());

        }

        else {
            var cp=0;
        }

        $('#imc_idoso').val(imc_idoso);
        
        $('#quest_idoso2').show();
        
     });

    $('#step_elder2').on('click', function (e) {
        e.preventDefault(e);

        var pa = parseInt($("input[name=PA]:checked").val());
        var pp = parseInt($("input[name=PP]:checked").val());
        var mob = parseInt($("input[name=Mob]:checked").val());
        var stress = parseInt($("input[name=Stress]:checked").val());
        var cp = 0;
        

        var imc_idoso = parseInt($('#imc_idoso').val());

        console.log(imc_idoso);      
        
        var imc_rank = 0;

        switch (true) {
            case (imc_idoso < 19):
                imc_rank = 0;
                break;

            case (imc_idoso >= 19 && imc < 21):
                imc_rank = 1;
                break;

            case (imc_idoso >= 21 && imc < 23):
                imc_rank = 2;
                break;

            case (imc_idoso >= 23):
                imc_rank = 3;
                break;

            default:
                imc_rank = 'erro';

        }
        console.log(imc_rank);

        var escore_idoso = pa + pp + mob + stress + imc_rank + cp;
        var result = 0;

        var normal = 'Estado nutricional normal. Paciente será reavaliado em 7 dias.';
        var risco = 'Risco de desnutrição. Será realizada avaliação nutricional completa em até 24h.'
        var desnutrido = 'Desnutrido. Será realizada avaliação nutricional completa em até 24h.'


        switch (true) {
            case (escore_idoso > 11 && escore_idoso < 15):
                result = normal;
                break;

            case (escore_idoso > 7 && escore_idoso < 12):
                result = risco;
                break;

            case (escore_idoso >= 0 && escore_idoso < 8):
                result = desnutrido;
                break;

            default:
                result = 'erro';
        }


        console.log(result);

        $('#result_form').show();
        $('#result_form').html('Resultado: ' + result);



    });

});

$('#current_w_box').on('click',function(e){
    var checked = $(this).is(':checked');

    if (checked==true){
        $('#current_w').attr('disabled',true);
        $('#current_w').attr('value',0)
    }

    else {
       $('#current_w').attr('disabled',false); 
    }
    
});

$('#height_opc_box').on('click',function(e){
    var checked = $(this).is(':checked');

    if (checked==true){
        $('#height_opc').attr('disabled',true);
        $('#height_opc').attr('value',0);
        
        
    }

    else {
       $('#height_opc').attr('disabled',false); 
    }
    
});



//seria legal abrir alguma mostrando explicando cada gravidade da doença


