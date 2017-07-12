$(document).ready(function () { //carregar funcao depois do carregamento da pag

    $('#step1').on('click', function (e) {

        e.preventDefault(e); //evitar que a pagina se recarregue

        var name = $('#name').val();
        var age = $('#age').val();
        var current_weight = $('#current_weight').val();
        var usual_weight = $('#usual_weight').val();
        var height = $('#height').val();
        var imc = current_weight * Math.pow(10, 4) / (height * height);

        $('#imc').val(imc);

        if (age < 60) {
            var quest_jovem1 = $('#quest_jovem1');
            $('#quest_jovem1').show();

            var questionario = $('#questionario').html(quest_jovem1);


        } else {
            var quest_idoso = $('#quest_idoso');
            $('#quest_idoso').show();
            var questionario = $('#questionario').html(quest_idoso);


        }
    });

    $('#step_young1').on('click', function (e) {

        e.preventDefault(e);

        if($("#current_w_box").is(':checked')) {
         $("#current_w").disable();} 
        //else
        // $("#txtAge").enable();  // unchecked

        var current_weight = $('#current_weight_opc').val();
        var usual_weight = $('#usual_weight_opc').val();
        var height = $('#height_opc').val();
        var imc = current_weight * Math.pow(10, 4) / (height * height);

               

        var sickness = parseInt($("input[name=Sickness]:checked").val());

        var unintentional_WL = parseInt($("input[name=Unintentional_WL]:checked").val());

        var ingestion_re = parseInt($("input[name=Ingestion_reduction]:checked").val());



        if (sickness == 1 || unintentional_WL == 1 || ingestion_re == 1) {
            
            var quest_jovem2 = $('#quest_jovem2');
            $('#quest_jovem2').show();

            var quest_jovem1 = $('#quest_jovem1').html(quest_jovem2);
            var current_weight = $('#current_weight').val();
            var usual_weight = $('#usual_weight').val();
            var height = $('#height').val();
            var imc = current_weight * Math.pow(10, 4) / (height * height);
            var weight_loss = parseInt(100 * (1 - (current_weight / usual_weight)));

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

        var pp_j = parseInt($("input[name=PP_j]:checked").val());
        var ia = parseInt($("input[name=IA]:checked").val());
        var eg = parseInt($("input[name=EG]:checked").val());
        var gd = parseInt($("input[name=GD]:checked").val());

        var escore = pp_j + ia + eg + gd;
        var result = 0;
        var risco =
            'O paciente está nutricionalmente no limite do risco. Será realizada a avaliação nutricional ASG em até 24h.';
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

    $('#step_elder').on('click', function (e) {
        e.preventDefault(e);

        var pa = parseInt($("input[name=PA]:checked").val());
        var pp = parseInt($("input[name=PP]:checked").val());
        var mob = parseInt($("input[name=Mob]:checked").val());
        var stress = parseInt($("input[name=Stress]:checked").val());
        var cp = parseInt($('input[name=CP]:checked').val());
        
       
        var weight_elder = parseInt($('#current_w').val());
        var height_elder = parseInt($('#height_opc').val());

        console.log(weight_elder + height_elder);

        var imc = 0

        if (weight_elder==0 || height_elder == 0) {
            imc = 0
        }

        else {
            var imc = weight_elder * Math.pow(10,4)/(height_elder*height_elder) ;
        console.log(imc);
        }


        var imc_rank = 0;

        switch (true) {
            case (imc < 19):
                imc_rank = 0;
                break;

            case (imc >= 19 && imc < 21):
                imc_rank = 1;
                break;

            case (imc >= 21 && imc < 23):
                imc_rank = 2;
                break;

            case (imc >= 23):
                imc_rank = 3;
                break;

            default:
                imc_rank = 0;

        }
        console.log(imc_rank+cp);

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
        $('#result_form').html('Resultado:' + result);



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
//peso e altura opcionais 

//arrumar bugs
//deixar todas as respostas obrigatórias!!!



//adicionar IMC nas contas e a questao de qndo n for possivel conseguir > tem q botar o peso e a altura como opcional > como resolver isso?!?! no formulario p jovens




// <div id='Circ_panturilha'>
//     Circunfência da panturrilha (em cm)
//     <br>
//     <input type='radio' name='CP' value=0> Menor que 31
// //     <input type='radio' name='CP' value=3> Maior ou igual a 31
// if(height==0 || current_weight==0) {
//        			var circ_panturrilha = $('#Circ_panturilha');
//        			$('#Circ_panturilha').show();